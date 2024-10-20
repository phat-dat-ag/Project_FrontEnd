<script>
import ReaderCard from '@/components/Reader/ReaderCard.vue';
export default {
    components: {
        ReaderCard,
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
        }
    }
}
</script>
<template>
    <!-- address, birthday, favorite, first_name, last_name, phone, sex -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(reader, index) in readers" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ reader.first_name }} {{ reader.last_name }}
            <div v-if="index === activeIndex">
                <ReaderCard :reader="reader"></ReaderCard>
                <router-link :to="{
                    name: 'reader.edit',
                    params: { id: reader._id },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>