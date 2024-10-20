<template>
    <div>
        <h4>Thêm Nhà xuất bản</h4>
        <!-- Dù addPublisher nhận tham số, nhưng nó là từ sự kiện emit mà -->
        <PublisherForm :publisher="publisher" @submit:publisher="addPublisher" />
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
        refreshPublisherList: { type: Function },
    },
    data() {
        return {
            publisher: {},
            message: "",
        };
    },
    methods: {
        async addPublisher(data) {
            try {
                await publisherService.create(data);
                alert(`Đã thêm Nhà xuất bản.`);
                // Làm mới
                this.refreshPublisherList();
                // Điều hướng trở về trang Nhà xuất bản, nếu không cái form vẫn còn (còn ở /publisher/add)
                this.$router.push({ name: "publisher" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
