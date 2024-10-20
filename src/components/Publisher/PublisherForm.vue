<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="name">Tên Nhà xuất bản</label>
            <Field name="name" type="text" class="form-control" v-model="publisherLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="publisherLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group row">
            <div class="col-12 col-md-4 mb-2">
                <button class="btn btn-primary w-100" @submit="submitPublisher">Lưu</button>
            </div>
            <div class="col-12 col-md-4 mb-2" v-if="publisherLocal._id">
                <button class="btn btn-danger w-100" type="button" @click="deletePublisher">Xóa</button>
            </div>
            <div class="col-12 col-md-4 mb-2">
                <button class="btn btn-secondary w-100" type="button" @click="Cancel">Thoát</button>
            </div>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên Nhà xuất bản là bắt buộc.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            address: yup.string().required("Địa chỉ là bắt buộc.").max(100, "Địa chỉ tối đa 100 ký tự."),
        });
        return {
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },
    watch: {
        publisher: {
            immediate: true,
            handler(newPublisher) {
                this.publisherLocal = { ...newPublisher };
            }
        }
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal._id);
        },
        Cancel() {
            const reply = window.confirm('Chưa lưu thay đổi! Vẫn rời đi? ');
            if (!reply) {
                return false;
            } else this.$router.push({ name: "publisher" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
