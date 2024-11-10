<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Độc giả {{ userInfor.last_name }}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{}" class="nav-link">
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{}" class="nav-link">
                            Sách đang mượn
                        </router-link>
                    </li>
                </ul>
                <button class="btn btn-danger ms-auto" @click="logout">Đăng xuất</button>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    emits: ["logout"],
    props: {
        userInfor: { type: Object, required: true },
    },
    methods: {
        logout() {
            this.$emit('logout'); // Emit the logout event to the parent
        }
    }
}
</script>