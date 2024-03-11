<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema"> 
        <div class="form-group">
            <label for="name">Tên sách: </label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name"/>
            <ErrorMessage name="name" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="author">Tác giả: </label>
            <Field name="author" type="text" class="form-control" v-model="bookLocal.author"/>
            <ErrorMessage name="author" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="type">Thể loại: </label>
            <Field name="type" type="text" class="form-control" v-model="bookLocal.type"/>
            <ErrorMessage name="type" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="price">Giá: </label>
            <Field name="price" type="text" class="form-control" v-model="bookLocal.price"/>
            <ErrorMessage name="price" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="countInStock">Số lượng: </label>
            <Field name="countInStock" type="text" class="form-control" v-model="bookLocal.countInStock"/>
            <ErrorMessage name="countInStock" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="image">Ảnh: </label>
            <input type="file" accept="image/jpeg" @change=uploadImage name="image"/>
            <ErrorMessage name="image" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="datePublish">Năm phát hành: </label>
            <Field name="datePublish" type="text" class="form-control" v-model="bookLocal.datePublish"/>
            <ErrorMessage name="datePublish" class="error-feedback"/>
        </div>
        
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="bookLocal._id" class="ml-2 btn btn-danger" type="button" @click="deleteBook">Xoá</button>
        </div>
        
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form, 
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: {type: Object, required: true}
    },
    data(){
        const bookFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị."),
            author: yup 
                .string()
                .required("Tên tác giả phải có giá trị."),
            type: yup
                .string()
                .required("Thể loại phải có giá trị.")
                .max(100, "Thể loại tối đa 100 kí tự."),
            price: yup
                .string()
                .required("Giá phải có giá trị."),
            countInStock: yup
                .string()
                .required("Số lượng phải có giá trị."),
            datePublish: yup
                .string()
                .required("Năm phát hành phải có giá trị."),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook(){
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook(){
            this.$emit("delete:book", this.bookLocal._id);
        },
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.bookLocal.image = e.target.result;
            };
        }
    },
};
</script>
<style>
@import "@/assets/style.css";
</style>