<template>
    <div v-if="reader">
        <h4>Hiệu chỉnh Độc giả</h4>
        <!-- Dù updateHeader nhận tham số, nhưng nó là từ sự kiện emit mà, deleteReader cũng vậy -->
        <ReaderForm :reader="reader" @submit:reader="updateReader" @delete:reader="deleteReader" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ReaderForm from "@/components/Reader/ReaderForm.vue";
import readerService from "@/services/reader.service";
export default {
    components: {
        ReaderForm,
    },
    props: {
        id: { type: String, required: true },
        refreshReaderList: { type: Function },
    },
    data() {
        return {
            reader: null,
            message: "",
        };
    },
    methods: {
        async getReader(id) {
            try {
                this.reader = await readerService.get(id);
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
        async updateReader(data) {
            console.log("Gọi đến updateReader!")
            try {
                await readerService.update(this.reader._id, data);
                alert('Độc giả được cập nhật thành công.');
                // Làm mới
                this.refreshReaderList();
                //  Điều hướng trở về trang  Độc giả, nếu không cái form vẫn còn (còn ở /reader/edit:id)
                this.$router.push({ name: "reader" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteReader(id) {
            if (confirm("Bạn muốn xóa Độc giả này?")) {
                try {
                    await readerService.delete(id);
                    alert('Độc giả được xóa thành công.');
                    // Làm mới
                    this.refreshReaderList();
                    //  Điều hướng trở về trang  Độc giả, nếu không cái form vẫn còn
                    this.$router.push({ name: "reader" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getReader(this.id);
        this.message = "";
    },
    // Thêm cái này để theo dõi, mỗi khi id thay đổi thì thay đổi thông tin trong reader
    watch: {
        // Theo dõi sự thay đổi của prop 'id' từ component cha
        async id(newId) {
            await this.getReader(newId); // Gọi lại hàm lấy dữ liệu mỗi khi id thay đổi
            // console.log("Cần cập nhật " + this.reader.last_name);
        },
    },
};
</script>
