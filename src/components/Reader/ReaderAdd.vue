<template>
    <div>
        <h4>Thêm Độc giả</h4>
        <!-- Dù addReader nhận tham số, nhưng nó là từ sự kiện emit mà -->
        <ReaderForm :reader="reader" @submit:reader="addReader" />
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
        refreshReaderList: { type: Function },
    },
    data() {
        return {
            reader: {},
            message: "",
        };
    },
    methods: {
        async addReader(data) {
            try {
                await readerService.create(data);
                alert(`Đã thêm Độc giả.`);
                // Làm mới
                this.refreshReaderList();
                // Điều hướng trở về trang  Độc giả, nếu không cái form vẫn còn (còn ở /reader/add)
                this.$router.push({ name: "reader" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
