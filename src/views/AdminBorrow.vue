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
        async getAllOrders(){
            this.orders = await orderService.getAllOrders();
        }
    },
    created() {
        this.getAllOrders();
        // console.log(this.orders)
    }
}
</script>