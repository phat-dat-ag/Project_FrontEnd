import { defineStore } from "pinia"

export const useFormTypeStore = defineStore("formtype", {
    state: () => {
        return {
            formtype: 0,
        }
    },
    // Cho phép lưu giá trị ngay cả khi load lại trang
    persist: true,
    getters: {
        getFormType: (state) => state.formtype,
    },
    actions: {
        setFormType(newFormType) {
            this.formtype = newFormType;
        }
    }
})