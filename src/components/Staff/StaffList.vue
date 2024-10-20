<script>
import StaffCard from './StaffCard.vue';
export default {
    components: {
        StaffCard,
    },
    props: {
        staffs: { type: Array, default: [], require: true },
        // Có liên quan chức năng Tìm kiếm, nên không xóa
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        // Phát đi 1 sự kiện khi click chọn một staff
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
}
</script>
<template>
    <!-- fullname, username, password, titile, address -->
    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="(staff, index) in staffs" :key="index"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ staff.fullname }}
            <div v-if="index === activeIndex">
                <StaffCard :staff="staff"></StaffCard>
                <router-link :to="{
                    name: 'staff.edit',
                    params: { id: staff._id },
                }">
                    <button class="btn btn-warning">Hiệu chỉnh</button>
                </router-link>
            </div>
        </li>
    </ul>
</template>