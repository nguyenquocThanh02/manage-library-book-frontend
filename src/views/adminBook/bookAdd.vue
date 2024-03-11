<template>
    <div class="page">
        <h4>Thêm sách mới</h4>
        <BookForm 
            :book="{}"
            @submit:book="createBook"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import BookService from '@/services/book.service';
import BookForm from '@/components/BookForm.vue';
export default {
    components: {
        BookForm,
    },
    data(){
        return {
            message: "",
        };
    },
    methods: {
        async createBook(data){
            try{
                await BookService.create(data);
                this.message="Sách được thêm thành công.";
            }catch (error){
                console.log(error);
            }
        }
    },
    created(){
        this.message = "";
    },
};
</script>