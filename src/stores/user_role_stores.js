import { defineStore } from "pinia";

export const useUserRoleStore = defineStore("user-store", {
    state: () => ({ userRole: 0 }),
    persist: true,
    getters: {
        getUserRole: (state) => state.userRole,
    },
    actions: {
        setUserRole(newUserRole) {
            this.userRole = newUserRole;
        },
    }
})