<template>
    <h4 class="text-center p-4">Chi tiết đơn mượn</h4>
    <table class="table table-bordered shadow">
        <tbody>
            <tr>
                <td class="">
                    <h5 class="text-center">Thông tin sách</h5>
                    <ul class="">
                        <li>Tên sách: {{ borrow?.orderBook.name }}</li>
                        <li>Tác giả: {{ borrow?.orderBook.author }}</li>
                        <li>Giá: {{ borrow?.orderBook.price }}</li>
                    </ul>
                </td>
                <td>
                    <h5 class="text-center">Thông tin người mượn</h5>
                    <ul>
                        <li>Tên: {{ borrow?.orderUser.name }}</li>
                        <li>Số điện thoại: {{ borrow?.orderUser.phone }}</li>
                        <li>Email: {{ borrow?.orderUser.email }}</li>
                        <li>Địa chỉ: {{ borrow?.orderUser.address }}</li>
                    </ul>
                </td>
                <td>
                    <h5 class="text-center">Thông tin mượn sách</h5>
                    <ul>
                        <li>Mã đơn: {{ borrow?._id }}</li>
                        <li>Ngày đã mượn: {{ borrow?.dateOrdered }}</li>
                        <li>Ngày trả sách: {{ borrow?.dateReturned }}</li>
                        <li>Trạng thái: {{ borrow?.isReceived }}</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="text-right">
                    <div class="btn btn-outline-secondary" @click="handleReturn" >Trở về</div>
                    <div v-if="isAdmin" class="btn btn-outline-warning ml-2" @click="handleCancelByAdmin">Đã trả</div>
                    <div v-else class="btn btn-outline-warning ml-2" @click="handleCancelByUser">Huỷ mượn sách</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import orderService from '@/services/order.service';

export default{
    props: {
        id: {type: String, required: true},
    },
    data(){
        return {
            borrow: null,
            isAdmin: false,
        };
    },
    methods: {
        async getBorrowById(id){
            this.borrow = await orderService.getBorrowById(id)
        },
        getIsAdmin(){
            this.isAdmin = localStorage.getItem('isAdmin') ? true : false;
        },
        handleReturn() {
            this.$router.push({"name": "adminborrow"})
        },
        async handleCancelByUser(){
            const userEmail = localStorage.getItem('useremail');
            await orderService.cancelOrderById(this.id)
            this.$router.push({"name": "ordersofuser",  params: { email: userEmail}})
        },
        async handleCancelByAdmin(){
            await orderService.cancelOrderById(this.id)
            this.$router.push({"name": "adminborrow"})
        }
    },
    created(){
        this.getBorrowById(this.id);
        this.getIsAdmin();
    }
}
</script>