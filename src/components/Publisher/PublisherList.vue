<script>
import Card from '../Card.vue';
export default {
    components: {
        Card
    },
    data() {
        return {
            newPublisherList: [],
        }
    },
    props: {
        publishers: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        // Phát đi 1 sự kiện khi click chọn một publisher
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        changeToNewPublisher(publisher) {
            let newInfor = {
                _id: { label: "Mã NXB", },
                name: { label: "Tên NXB" },
                address: { label: "Địa chỉ", },
            };
            for (let key in newInfor) {
                newInfor[key] = { ...newInfor[key], value: publisher[key] };
            }
            return newInfor;
        },
        getNewPublishers() {
            let newsPublisher = [];
            this.publishers.forEach((publisher) => {
                newsPublisher.push(this.changeToNewPublisher(publisher));
            });
            this.newPublisherList = newsPublisher;
        }
    },
    created() {
        this.getNewPublishers();
    }
}
</script>
<template>
    <!-- address, name-->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(publisher, index) in newPublisherList" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ publisher.name.value }}
            <div v-if="index === activeIndex">
                <Card :Infor="publisher" :title="'Thông tin về NXB'"></Card>
                <router-link :to="{
                    name: 'publisher.edit',
                    params: { id: publisher._id.value },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
