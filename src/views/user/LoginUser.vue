<template>
    <div>{{ message }}</div>
    <Form @submit="submitUser" :validation-schema="UserFormSchema"> 
        <div class="form-group">
            <label for="email">Email: </label>
            <Field name="email" type="email" class="form-control" v-model="UserLocal.email"/>
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="password">Password: </label>
            <Field name="password" type="password" class="form-control" v-model="UserLocal.password"/>
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group d-flex justify-content-end">
            <button class="btn btn-secondary mr-2" @click="goToSignInPage">Đăng ký</button>
            <button class="btn btn-primary">Đăng nhập</button>
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
            email: yup 
                .string()
                .required("Email phải có giá trị."),
            password: yup
                .string()
                .required("Password phải có giá trị."),
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
                const result = await UserService.logIn(this.UserLocal);
                if(result.status == 400){
                    this.message = "ERR: " + result.message;
                }else{
                    localStorage.setItem('username', result.name);
                    localStorage.setItem('useremail', result.email);
                    console.log('nhap')
                    console.log(result.isAdmin)
                    if(result.idAdmin){
                        localStorage.setItem('isAdmin', result.idAdmin);
                    }
                    this.message= "Bạn đã đăng nhập thành công tài khoản";
                    setTimeout(()=>{
                        this.goToHomePage();
                    }, 3000)
                }
            }catch(error){
                this.message = "Error: " + error;
            }
        },
        goToSignInPage(){
            this.$router.push({"name": "usersignin"})
        },
        goToHomePage(){
            this.$router.push({"name": "homepage"})
        }
    },
};
</script>
<style>
@import "@/assets/style.css";
</style>