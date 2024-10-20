<template>
    <div v-if="book">
        <h4>Hiệu chỉnh Sách</h4>
        <!-- Dù updateBook nhận tham số, nhưng nó là từ sự kiện emit mà, deleteBook cũng vậy -->
        <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
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
        id: { type: String, required: true },
        refreshBookList: { type: Function },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await bookService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            console.log("Gọi đến updateBook!")
            try {
                await bookService.update(this.book._id, data);
                alert('Sách được cập nhật thành công.');
                // Làm mới
                this.refreshBookList();
                //  Điều hướng trở về trang Sách, nếu không cái form vẫn còn (còn ở /book/edit:id)
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook(id) {
            if (confirm("Bạn muốn xóa Sách này?")) {
                try {
                    await bookService.delete(id);
                    alert('Sách được xóa thành công.');
                    // Làm mới
                    this.refreshBookList();
                    //  Điều hướng trở về trang Sách, nếu không cái form vẫn còn
                    this.$router.push({ name: "book" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
    // Thêm cái này để theo dõi, mỗi khi id thay đổi thì thay đổi thông tin trong book
    watch: {
        // Theo dõi sự thay đổi của prop 'id' từ component cha
        async id(newId) {
            await this.getBook(newId); // Gọi lại hàm lấy dữ liệu mỗi khi id thay đổi
            // console.log("Cần cập nhật " + this.book.last_name);
        },
    },
};
</script>
