<script>
export default {
    // Props modelValue và event update:modelValue là mặc định khi dùng v-model (có thể tự chỉnh)
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },
        submit() {
            this.$emit("submit", "Sự kiện này của Con");
        }
    }
}
</script>
<template>
    <div class="input-group">
        <!-- Bỏ form-control là xấu -->
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue"
            @input="updateModelValue" @keyup.enter="submit" />
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                Tìm kiếm
            </button>
        </div>
    </div>
</template>