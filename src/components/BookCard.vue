<script>
export default {
    props: {
        book: {type: Object, required: true},
        hasButton: {type: Boolean, default: false},
    },
    methods: {
        goToBookDetail(){
            this.$router.push({name: 'bookdetail', params: {id: this.book._id}});
        }
    }
};
</script>

<template>
    <div class="card p-0 m-0" style="width: 100%;">
        <img :src="book?.image" class="card-img-top" alt="anh sach" style="height: 280px;">
        <div class="card-body">
            <h5 class="card-title">{{ book?.name }}</h5>
            <p class="card-text">Tác giả: {{ book?.author }}</p>
            <div class="d-flex justify-content-between">
                <p class="card-text">Thể loại: {{ book?.type }}</p>
                <p class="card-text">Giá: {{ book?.price }}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="card-text">Số lượng: {{ book?.countInStock }}</p>
                <p class="card-text">Đang mượn: {{ book?.amountBorrowed }}</p>
            </div>
            <button v-if="hasButton" class="btn btn-primary" @click="goToBookDetail">Chi tiết</button>
        </div>
    </div>
</template>
