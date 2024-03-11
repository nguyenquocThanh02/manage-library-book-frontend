
<template>
    <div class="row mt-4 mb-4 shadow bg-light p-2">
        <div class="col-4">
            <BookCard :book="book"/>
        </div>
        <div class="col-4">
            <Form :validation-schema="inforUserFormSchema" class="bg-white border p-2"> 
                <div class="form-group">
                    <label for="name">Họ và tên: </label>
                    <Field name="name" type="text" class="form-control" v-model="inforUser.name"/>
                    <ErrorMessage name="name" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <label for="email">Email: </label>
                    <Field name="email" type="email" class="form-control" v-model="inforUser.email"/>
                    <ErrorMessage name="email" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại: </label>
                    <Field name="phone" type="text" class="form-control" v-model="inforUser.phone"/>
                    <ErrorMessage name="phone" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <label for="address">Địa chỉ: </label>
                    <Field name="address" type="text" class="form-control" v-model="inforUser.address"/>
                    <ErrorMessage name="address" class="error-feedback"/>
                </div>
                
                <div class="form-group mt-2">
                    <button class="btn btn-primary w-100" @click="handleBorrow">Xác nhận mượn</button>
                </div>
            </Form>
        </div>
        <div class="col-4">
            <div class="bg-white border p-3">
                <ul >
                    <li>Thời gian mượn: {{ currentDate }}</li>
                    <li>Thời gian trả: {{ futureDate }}</li>
                </ul>
                <p class="text-center font-italic font-weight-light">Thời gian tối đa để trả lại sách là 7 ngày</p>
                <p class="text-center font-italic font-weight-light">Hãy đảm bảo rằng bạn trả trước thời hạn! Để tránh phát sinh chi phí.</p>
            </div>
        </div>
    </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import BookService from '@/services/book.service';
import UserService from '@/services/user.service';
import OrderService from '@/services/order.service';

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default{
    components: {
        BookCard,
        Form, 
        Field,
        ErrorMessage,
    },
    props: {
        id: {type: String, required: true},
    },
    data(){
        const inforUserFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Họ và tên phải có giá trị."),
            phone: yup 
                .string()
                .required("SĐT phải có giá trị."),
            address: yup
                .string()
                .required("Địa chỉ phải có giá trị."),
        });
        return {
            book: null,
            message: "",
            inforUser: {
                name: "",
                email: "",
                phone: "",
                address: "",
            },
            currentDate: "",
            futureDate: "",
            inforUserFormSchema,
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
        async getUser(){
            try{
                const email = localStorage.getItem('useremail');
                this.inforUser = await UserService.getUser(email);
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
        getCurrentDate() {
            const today = new Date();
            const formattedDate = this.formatDate(today);
            this.currentDate = formattedDate;
        },
        calculateFutureDate() {
            const today = new Date();
            const futureDay = new Date(today);
            futureDay.setDate(today.getDate() + 7);
            const formattedFutureDate = this.formatDate(futureDay);
            this.futureDate = formattedFutureDate;
        },
        formatDate(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        async handleBorrow(e){
            e.preventDefault();

            const param = {
                orderBook: {
                    image: this.book.image,
                    name: this.book.name,
                    price: this.book.price,
                    author: this.book.author,
                    book: this.book._id
                },
                orderUser: {
                    name: this.inforUser.name,
                    email: this.inforUser.email,
                    phone: this.inforUser.phone,
                    address: this.inforUser.address,
                    user: this.inforUser._id
                },
                dateOrdered: this.currentDate,
                dateReturned: this.futureDate
            }

            // console.log(param);
            try{
                const result = await OrderService.create(param);
                if(result?.status){
                    console.log('het sach')
                }else{
                    console.log('thanh cong')
                    this.$router.push({
                        name: "ordersofuser",
                        params: { email: localStorage.getItem('useremail') }
                    });
                }
            }catch(e){
                console.log(e)
            }
        }
    },
    created(){
        this.getBook(this.id);
        this.getUser();
        this.message = "";
        this.getCurrentDate();
        this.calculateFutureDate();
    },
}
</script>