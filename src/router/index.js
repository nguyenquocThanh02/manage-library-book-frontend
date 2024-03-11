import { createWebHistory, createRouter } from "vue-router";
import adminBook from "@/views/adminBook/adminBook.vue";
import HomePage from "@/views/HomePage.vue";
import Books from "@/views/Books.vue";
const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
    },
    {
        path: "/books",
        name: "books",
        component: Books,
    },
    {
        path: "/books/:id",
        name: "bookdetail",
        component: () => import("@/views/BookDetail.vue"),
        props: true
    },
    {
        path: "/admin/books",
        name: "adminbook",
        component: adminBook,
    },
    {
        path: "/books/update/:id",
        name: "book.edit",
        component: () => import("@/views/adminBook/bookEdit.vue"),
        props: true
    },
    {
        path: "/books/add",
        name: "book.add",
        component: () => import("@/views/adminBook/bookAdd.vue"),
    },

    // User
    {
        path: "/users/login",
        name: "userlogin",
        component: () => import("@/views/user/LoginUser.vue"),
    },
    {
        path: "/users/sign-in",
        name: "usersignin",
        component: () => import("@/views/user/SigninUser.vue"),
    },

    // Order
    {
        path: "/orders/:email",
        name: "ordersofuser",
        component: () => import("@/views/user/BooksBorrowing.vue"),
        props: true
    },
    {
        path: "/orders/detail/:id",
        name: "detailborrow",
        component: () => import("@/views/DetailBorrow.vue"),
        props: true
    },
    {
        path: "/admin/borrow",
        name: "adminborrow",
        component: () => import("@/views/AdminBorrow.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;