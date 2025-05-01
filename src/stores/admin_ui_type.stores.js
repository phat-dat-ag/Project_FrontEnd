import { defineStore } from "pinia"

export const useAdminUITypeStore = defineStore("formtype", {
    state: () => {
        return {
            adminUIType: 0,
        }
    },
    // Cho phép lưu giá trị ngay cả khi load lại trang
    persist: true,
    getters: {
        getAdminUIType: (state) => state.adminUIType,
    },
    actions: {
        setAdminUIType(newAdminUIType) {
            this.adminUIType = newAdminUIType;
        }
    }
})