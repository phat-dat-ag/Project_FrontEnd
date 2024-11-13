<template>
    <div v-if="publisher">
        <h4>Hiệu chỉnh Nhà xuất bản</h4>
        <!-- Dù updateHeader nhận tham số, nhưng nó là từ sự kiện emit mà, deletePublisher cũng vậy -->
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import PublisherForm from "@/components/Publisher/PublisherForm.vue";
import publisherService from "@/services/publisher.service";
export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true },
        refreshPublisherList: { type: Function },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await publisherService.get(id);
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
        async updatePublisher(data) {
            try {
                await publisherService.update(this.publisher._id, data);
                alert('Nhà xuất bản được cập nhật thành công.');
                // Làm mới
                this.refreshPublisherList();
                //  Điều hướng trở về trang Nhà xuất bản, nếu không cái form vẫn còn (còn ở /publisher/edit:id)
                this.$router.push({ name: "publisher" });
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher(id) {
            if (confirm("Bạn muốn xóa Nhà xuất bản này?")) {
                try {
                    await publisherService.delete(id);
                    alert('Nhà xuất bản được xóa thành công.');
                    // Làm mới
                    this.refreshPublisherList();
                    //  Điều hướng trở về trang Nhà xuất bản, nếu không cái form vẫn còn
                    this.$router.push({ name: "publisher" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    },
    // Thêm cái này để theo dõi, mỗi khi id thay đổi thì thay đổi thông tin trong publisher
    watch: {
        // Theo dõi sự thay đổi của prop 'id' từ component cha
        async id(newId) {
            await this.getPublisher(newId); // Gọi lại hàm lấy dữ liệu mỗi khi id thay đổi
            // console.log("Cần cập nhật " + this.publisher.last_name);
        },
    },
};
</script>
