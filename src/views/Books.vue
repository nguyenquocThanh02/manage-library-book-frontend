<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        
    </div>
    <div class="row mt-4 mb-4">
        <div v-if="filteredBooksCount > 0" class="col-3" v-for="book in filteredBooks">
            <BookCard :book="book"  :hasButton="true"/>
        </div>
        <p v-else>Chưa có sách nào!</p>
    </div>
</template>
<script>
import BookCard from '@/components/BookCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import BookService from '@/services/book.service';
export default{
    components: {
        BookCard,
        InputSearch
    },
    data(){
        return {
            books: [],
            searchText: "",
        }
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
        },
    },
    mounted() {
        this.refreshList();
    },
}
</script>