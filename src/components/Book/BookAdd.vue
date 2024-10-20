<template>
    <div>
        <h4>Thêm Sách</h4>
        <!-- Dù addBook nhận tham số, nhưng nó là từ sự kiện emit mà -->
        <BookForm :book="book" @submit:book="addBook" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookForm from "@/components/Book/BookForm.vue";
import bookService from "@/services/book.service";
export default {
    components: {
        BookForm,
    },
    props: {
        refreshBookList: { type: Function },
    },
    data() {
        return {
            book: {},
            message: "",
        };
    },
    methods: {
        async addBook(data) {
            try {
                await bookService.create(data);
                alert(`Đã thêm Sách.`);
                // Làm mới
                this.refreshBookList();
                // Điều hướng trở về trang Sách, nếu không cái form vẫn còn (còn ở /book/add)
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
