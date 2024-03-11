<template>
    <BorrowList :orders="orders"/>
</template>

<script>
import orderService from '@/services/order.service';
import BorrowList from '@/components/BorrowList.vue';
export default{
    components: {
        BorrowList,
    },
    data() {
        return{
            orders: null
        };
    },
    methods: {
        async getOrderOfUser(){
            this.orders = await orderService.getOrderOfUser(localStorage.getItem("useremail"));
        }
    },
    created() {
        this.getOrderOfUser();
        // console.log(this.orders)
    }
}
</script>