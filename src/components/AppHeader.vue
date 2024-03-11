<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
        <router-link :to="{name: 'homepage'}" class="nav-link">
            <i class="fa-solid fa-house"></i>
            HOME
        </router-link>
        <ul class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{name: 'books'}" class="nav-link">
                    Tất cả sách
                    <i class="fa-solid fa-book-open"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'adminbook'}" class="nav-link">
                    Quản lý
                </router-link>
            </li>
        </ul>
        <div v-if="!userName">
            <router-link :to="{name: 'usersignin'}" class="nav-link">
                Tài khoản
                <i class="fa-regular fa-user"></i>
            </router-link>
        </div>
        <div v-else>
            <div class="d-flex">
                <div>
                    <router-link :to="{name: 'ordersofuser', params: { email: userEmail}}" class="nav-link">
                        Đã mượn
                        <i class="fa-solid fa-book"></i>
                    </router-link>
                </div>
                <div class="mr-2 ml-2">{{ userName }}</div>
                <div @click="logout">Đăng xuất</div>
            </div>
        </div>
    </nav>
</template>
<script>
export  default{
    data() {
        return {
            userName: null,
            userEmail: null
        };
    }, 
    computed: {
        getUserName(){
            this.userName = localStorage.getItem('username');
            this.userEmail = localStorage.getItem('useremail');
            return this.userName;
        },
        logout(){
            localStorage.removeItem('username');
            localStorage.removeItem('useremail');
        }
    },
    mounted() {
        this.getUserName;
    },
}
</script>
