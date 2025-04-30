<script>
export default {
    props: {
        Infor: { type: Object, required: true, },
        title: { required: true, },
    },
    data() {
        return {
            newInfor: {},
        }
    },
    methods: {
        // Không hiển thị _id và titleElement
        getNewInfor() {
            const { _id, titleElement, ...newIn } = this.Infor;
            this.newInfor = newIn;
        }
    },
    created() {
        this.getNewInfor()
    }
}
</script>
<template>
    <div class="card" style="width: 20rem;">
        <div class="card-header">
            {{ title }}
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="(keyInfor) in newInfor" :key="keyInfor" class="list-group-item">
                {{ keyInfor.label }}: {{ keyInfor.value }}
            </li>
        </ul>
    </div>
</template>