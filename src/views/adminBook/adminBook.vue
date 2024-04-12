<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
    </div>
    <div class="row">
        <div class="col-12 mt-2"><router-link :to="{name: 'adminborrow'}">
            <span class="mt-2 badge badge-primary">
                <i class="fa-solid fa-book"></i> Quản lý mượn sách
            </span>
        </router-link></div>
    </div>
    <div class="row">
        <div class="mt-3 col-8">
            <h4>
                Tất cả sách 
            </h4>
            <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
            <p v-else>Chưa có quyển sách nào!</p>
            <div class="mt-3 row justify-content-end align-items-center">
                <button class="btn btn-outline-primary mr-4" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-outline-success mr-4" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button
                    class="btn btn-outline-danger mr-3"
                    @click="removeAllBooks"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-4">
            <div v-if="activeBook">
                <div class="d-flex justify-content-between">
                    <h4>
                        Chi tiết 
                    </h4>
                    <router-link 
                        :to="{
                            name: 'book.edit',
                            params: {id: activeBook._id},
                        }"
                    >
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </span>
                    </router-link>
                </div>
                <BookCard :book="activeBook" />
            </div>
        </div>
    </div>
</template>
<script>
import BookCard from "../../components/BookCard.vue";
import InputSearch from "../../components/InputSearch.vue";
import BookList from "../../components/BookList.vue";
import BookService from "../../services/book.service";
export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        //giám sát các thay đổi của biến searchText.
        //bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        //chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
        bookStrings() {
            return this.books.map((book) => {
                const { name, author, datePublish, type, countInStock, price, image } = book;
                return [name, author, datePublish, type, countInStock, price, image].join("");
            });
        },
        //trả về các book có chưa thông tin cần tìm kiếm.
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả sách?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
