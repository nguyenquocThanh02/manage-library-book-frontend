<script>
export default {
    props: {
        books: {type: Array, default: []},
        activeIndex: {type: Number, default: -1},
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index){
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Tên sách</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Giá</th>
                <th scope="col">Có sẵn</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(book, index) in books"
                :key="book._id"
                :class="{active: index === activeIndex}"
                @click="updateActiveIndex(index)"
            >
                <td>{{ book.name }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.price }}</td>
                <td>{{ book.countInStock }}</td>
            </tr>
        </tbody>
    </table>

</template>