<script>
export default {
    props: {
        orders: {type: Array, default: []},
    },
    methods: {
        goToDetailBorrow(id){
            this.$router.push({name: 'detailborrow', params: {id: id}});
        }
    }
};
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Đã nhận</th>
                <th scope="col">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(order, index) in orders"
                :key="order._id"
            >
                <td>{{ order._id }}</td>
                <td>{{ order.orderBook.name }}</td>
                <td>{{ order.dateOrdered }}</td>
                <td>{{ order.dateReturned }}</td>
                <td>{{ order.isReceived }}</td>
                <td><button @click="goToDetailBorrow(order._id)" class="btn btn-outline-primary">Xem</button></td>
            </tr>
        </tbody>
    </table>

</template>