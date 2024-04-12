<template>
    <div v-if="message" class="alert alert-success" role="alert">
        <i class="fa-regular fa-circle-check"></i>
        {{ message }}
    </div>
    <Form :validation-schema="UserFormSchema" class="w-50 m-auto shadow p-4"> 
        <h4 class="text-center">Đăng ký</h4>
        <div class="form-group">
            <label for="name">Họ và tên: </label>
            <Field name="name" type="text" class="form-control" v-model="UserLocal.name"/>
            <ErrorMessage name="name" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="email">Email: </label>
            <Field name="email" type="email" class="form-control" v-model="UserLocal.email"/>
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại: </label>
            <Field name="phone" type="phone" class="form-control" v-model="UserLocal.phone"/>
            <ErrorMessage name="phone" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ liên hệ: </label>
            <Field name="address" type="text" class="form-control" v-model="UserLocal.address"/>
            <ErrorMessage name="address" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="password">Password: </label>
            <Field name="password" type="password" class="form-control" v-model="UserLocal.password"/>
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="confirmPassword">Confirm password: </label>
            <Field name="confirmPassword" type="password" class="form-control"/>
            <ErrorMessage name="confirmPassword" class="error-feedback"/>
        </div>
        
        <div class="form-group  d-flex justify-content-end">
            <button class="btn btn-secondary mr-2" @click="goToLoginPage">Đăng nhập</button>
            <button @click="submitUser" class="btn btn-primary">Đăng ký</button>
        </div>
        
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";

export default {
    components: {
        Form, 
        Field,
        ErrorMessage,
    },
    data(){
        const UserFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị."),
            email: yup 
                .string()
                .required("Email phải có giá trị."),
            phone: yup
                .string()
                .required("Phone phải có giá trị."),
            address: yup
                .string()
                .required("address phải có giá trị."),
            password: yup
                .string()
                .required("Password phải có giá trị."),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận phải giống với mật khẩu.')
                .required("Confirm password phải có giá trị."),
        });
        return {
            UserLocal: {},
            UserFormSchema,
            message: ""
        };
    },
    methods: {
        async submitUser(){
            try{
                await UserService.signIn(this.UserLocal);
                this.message= "Bạn đã đăng ký thành công tài khoản"
                // setTimeout(()=>{
                //     this.goToLoginPage();
                // }, 5000)
            }catch(error){
                this.message = "Error: " + error;
            }
        },
        goToLoginPage(){
            this.$router.push({name: "userlogin"});
        }
    },
};
</script>
<style>
@import "@/assets/style.css";
</style>