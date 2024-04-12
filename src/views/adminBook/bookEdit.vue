<template>
    <div v-if="message" class="alert alert-success" role="alert">
        <i class="fa-regular fa-circle-check"></i>
        {{ message }}
    </div>
    <div v-if="book" class="page">
        <h4 class="text-center">Hiệu chỉnh sách</h4>
        <BookForm 
            :book="book"
            @submit:book="updateBook"
            @delete:book="deleteBook"
        />
    </div>
</template>

<script>
import BookService from '@/services/book.service';
import BookForm from '@/components/BookForm.vue';
export default {
    components: {
        BookForm,
    },
    props: {
        id: {type: String, required: true},
    },
    data(){
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id){
            try{
                this.book = await BookService.get(id);
            }catch (error){
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$router.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data){
            try{
                await BookService.update(this.book._id, data);
                this.message="Sách được cập nhật thành công.";
            }catch (error){
                console.log(error);
            }
        },
        async deleteBook(){
            if(confirm("Bạn muốn xoá sách này?")){
                try{
                    await BookService.delete(this.book._id);
                    this.$router.push({name: "adminbook"});
                }catch (error){
                    console.log(error);
                }
            }
        }
    },
    created(){
        this.getBook(this.id);
        this.message = "";
    },
};
</script>