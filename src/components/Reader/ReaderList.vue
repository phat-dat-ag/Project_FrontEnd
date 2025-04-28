<script>
import Card from '../Card.vue';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { READER_TYPE } from '@/constants/form.constants';
export default {
    components: {
        Card,
    },
    data() {
        return {
            newReaderList: [],
        }
    },
    props: {
        readers: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        // Phát đi 1 sự kiện khi click chọn một reader
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        changeToNewReader(reader) {
            let newInfor = {
                _id: { label: "Mã độc giả", },
                first_name: { label: "Họ", },
                last_name: { label: "Tên", },
                username: { label: "Tên đăng nhập", },
                birthday: { label: "Sinh nhật", },
                sex: { label: "Giới tính", },
                address: { label: "Địa chỉ", },
                phone: { label: "Số điện thoại", },
            };
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: reader[key] };
            }
            return newInfor;
        },
        getNewReaders() {
            let newReaders = [];
            this.readers.forEach((reader) => {
                newReaders.push(this.changeToNewReader(reader));
            });
            this.newReaderList = newReaders;
        },
        handleClickUpdateButton() {
            const formTypeStore = useFormTypeStore();
            formTypeStore.setFormType(READER_TYPE);
        }
    },
    // Danh sách hiển thị cần thay đổi thì cập nhật
    // Hỗ trợ refresh
    watch: {
        readers() {
            this.newReaderList = [];
            this.getNewReaders();
        }
    },
    created() {
        this.getNewReaders();
    }
}
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(reader, index) in newReaderList" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ reader.first_name.value }} {{ reader.last_name.value }}
            <div v-if="index === activeIndex">
                <Card :Infor="reader" :title="'Thông tin về độc giả'"></Card>
                <router-link :to="{
                    name: 'entity.edit',
                    params: { id: reader._id.value },
                }">
                    <button class="btn btn-warning" @click="handleClickUpdateButton">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>