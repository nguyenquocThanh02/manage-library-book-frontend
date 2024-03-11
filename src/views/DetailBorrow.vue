<template>
    <table class="table table-bordered shadow">
        <tbody>
            <tr>
                <td class="text-center">
                    <img :src="borrow?.orderBook?.image" class="card-img-top" alt="anh sach" style="height: 400px; width: 300px;">
                </td>
                <td class="">
                    <h4 class="text-center">Thông tin sách</h4>
                    <ul class="">
                        <li>Tên sách: {{ borrow?.orderBook.name }}</li>
                        <li>Tác giả: {{ borrow?.orderBook.author }}</li>
                        <li>Giá: {{ borrow?.orderBook.price }}</li>
                    </ul>
                </td>
                <td>
                    <h4 class="text-center">Thông tin người mượn</h4>
                    <ul>
                        <li>Tên: {{ borrow?.orderUser.name }}</li>
                        <li>Số điện thoại: {{ borrow?.orderUser.phone }}</li>
                        <li>Email: {{ borrow?.orderUser.email }}</li>
                        <li>Địa chỉ: {{ borrow?.orderUser.address }}</li>
                    </ul>
                </td>
                <td>
                    <h4 class="text-center">Thông tin mượn sách</h4>
                    <ul>
                        <li>Mã đơn: {{ borrow?._id }}</li>
                        <li>Ngày đã mượn: {{ borrow?.dateOrdered }}</li>
                        <li>Ngày trả sách: {{ borrow?.dateReturned }}</li>
                        <li>Trạng thái: {{ borrow?.isReceived }}</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="isAdmin">
                <td colspan="4" class="text-right">
                    <div class="btn btn-warning">Đã trả ?</div>
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
            console.log(this.isAdmin)
        }
    },
    created(){
        this.getBorrowById(this.id);
        this.getIsAdmin();
    }
}
</script>