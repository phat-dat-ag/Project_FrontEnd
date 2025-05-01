<script>
import Card from '@/components/Card.vue';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { BOOK_TYPE, PUBLISHER_TYPE, READER_TYPE, STAFF_TYPE, TRANSACTION_TYPE } from '@/constants/form.constants';
import { bookInfor, publisherInfor, readerInfor, staffInfor, transactionInfor } from '@/constants/inforcard.constant';
export default {
    components: {
        Card,
    },
    props: {
        // Nhận vào 1 danh sách dữ liệu ban đầu
        entities: { type: Array, default: () => [], required: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            // Chứa đầy đủ thông tin cần hiển thị
            fullEntityInfor: [],
            // Tiêu đề của Card
            titleCard: "",
            // Loại giao diện đang yêu cầu
            selectedFormType: null,
        }
    },
    methods: {
        // Phát đi 1 sự kiện khi click chọn một phần tử trong list
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        // Chỉ lấy thông tin cần hiển thị từ entity dựa trên infor
        // keys là 1 mảng, chứa các trường để tạo nên title
        changeToInfor(entity, inforModel, keys) {
            // Sử dụng deep copy
            let infor = JSON.parse(JSON.stringify(inforModel));
            // Từng value của mỗi key trong đối tượng infor là đối tượng {label, value}
            for (let key in infor) {
                // Bổ sung value vào
                infor[key] = { ...infor[key], value: entity[key] };
            }
            let titleString = "";
            for (let key of keys)
                titleString += `${infor[key].value} `;
            // Bổ sung titleElement để đặt cho từng thẻ trong list
            infor.titleElement = titleString;
            return infor;
        },
        // Lấy thông tin cho chung Publisher, Staff, Reader: đều không liên quan đến thằng khác
        getEntityInfor(infor, keys) {
            let inforArr = [];
            for (let entity of this.entities) {
                // Chuyển từng entity đã được cập nhật thành dữ liệu hiển thị
                let newEntityInfor = this.changeToInfor(entity, infor, keys);
                inforArr.push(newEntityInfor);
            }
            return inforArr;
        },
        // Lấy đầy đủ thông tin để hiển thị
        // Xác định tiêu đề của Card
        async getFullEntityInfor() {
            switch (this.selectedFormType) {
                case PUBLISHER_TYPE:
                    this.fullEntityInfor = this.getEntityInfor(publisherInfor, ["name"]);
                    this.titleCard = "Thông tin Nhà xuất bản";
                    break;
                case READER_TYPE:
                    this.fullEntityInfor = this.getEntityInfor(readerInfor, ["first_name", "last_name"]);
                    this.titleCard = "Thông tin Độc giả";
                    break;
                case STAFF_TYPE:
                    this.fullEntityInfor = this.getEntityInfor(staffInfor, ["fullname"]);
                    this.titleCard = "Thông tin Nhân viên";
                    break;
                case BOOK_TYPE:
                    this.fullEntityInfor = this.getEntityInfor(bookInfor, ["name"]);
                    this.titleCard = "Thông tin Sách";
                    break;
                case TRANSACTION_TYPE:
                    this.fullEntityInfor = this.getEntityInfor(transactionInfor, ["reader_fullname", "status", "book_name"]);
                    this.titleCard = "Thông tin Giao dịch mượn sách";
                    break;
                default:
                    confirm("Có lỗi xảy ra khi hiển thị danh sách");
            }
        },
    },
    watch: {
        // entities thay đổi thì cập nhật lại
        async entities() {
            this.fullEntityInfor = [];
            await this.getFullEntityInfor();
        }
    },
    created() {
        const formtype = useFormTypeStore();
        this.selectedFormType = formtype.getFormType;
        this.getFullEntityInfor();
    }
}
</script>
<template>
    <!-- Chỗ này tùy cách hiển thị của mỗi loại nữa -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(entity, index) in fullEntityInfor" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ entity.titleElement }}
            <div v-if="index === activeIndex">
                <Card :Infor="entity" :title="titleCard"></Card>
                <router-link :to="{
                    name: 'entity.edit',
                    params: { id: entity._id.value },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
