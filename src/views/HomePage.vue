<template>
    <div class="shadow-lg p-4 d-flex align-items-center flex-column mt-5" >
        <h1 class="text-center" :style="{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)' }">CHÀO MỪNG BẠN ĐẾN THƯ VIỆN CỦA CHÚNG TÔI</h1>
        <p class="text-center">Xem ở đây có sách gì nào? Bạn có muốn mượn sách không?</p>
    </div>
    <div class="mt-5 d-flex justify-content-center">
        <router-link :to="{name: 'books'}" class="mr-3">
            <span class="mt-2 badge badge-primary p-2">
                <i class="fa-solid fa-book-open"></i> Tất cả sách
            </span>
        </router-link>
        <router-link :to="{name: 'userlogin'}">
            <span class="mt-2 badge badge-primary p-2">
                <i class="fa-regular fa-user"></i> Đăng ký/Đăng nhập
            </span>
        </router-link>
    </div>
</template>