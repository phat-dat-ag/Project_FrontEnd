<script>
import PublisherCard from '@/components/Publisher/PublisherCard.vue';
export default {
    components: {
        PublisherCard,
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
        }
    }
}
</script>
<template>
    <!-- address, name-->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(publisher, index) in publishers" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ publisher.name }}
            <div v-if="index === activeIndex">
                <PublisherCard :publisher="publisher"></PublisherCard>
                <router-link :to="{
                    name: 'publisher.edit',
                    params: { id: publisher._id },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>
