<script>
import BookCard from '@/components/Book/BookCard.vue';
export default {
    components: {
        BookCard,
    },
    props: {
        books: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        // Phát đi 1 sự kiện khi click chọn một book
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
}
</script>

<template>
    <!-- name, price, quantity, publication_year, author -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(book, index) in books" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ book.name }}
            <div v-if="index === activeIndex">
                <BookCard :book="book"></BookCard>
                <router-link :to="{
                    name: 'book.edit',
                    params: { id: book._id },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
