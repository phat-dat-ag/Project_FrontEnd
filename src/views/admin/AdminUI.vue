<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Admin</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'reader' }" class="nav-link" @click="handleSetNewType(READER_TYPE)">
                            Độc giả
                        </router-link>
                    </li>
                    <li class=" nav-item">
                        <router-link :to="{ name: 'book' }" class="nav-link" @click="handleSetNewType(BOOK_TYPE)">
                            Sách
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'publisher' }" class="nav-link"
                            @click="handleSetNewType(PUBLISHER_TYPE)">
                            Nhà xuất bản
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'staff' }" class="nav-link" @click="handleSetNewType(STAFF_TYPE)">
                            Nhân viên
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'transaction' }" class="nav-link"
                            @click="handleSetNewType(TRANSACTION_TYPE)">
                            Theo dõi mượn sách
                        </router-link>
                    </li>
                </ul>
                <button class="btn btn-danger ms-auto" @click="logout">Đăng xuất</button>
            </div>
        </div>
    </nav>
    <!-- Yêu cầu mỗi lần gọi phải tạo lại component, không tái sử dụng -->
    <!-- Nếu không có :key thì cách này (tái sử dụng AdminPage) sai, còn không tái sử dụng thì đúng -->
    <router-view :key="$route.fullPath"></router-view>
</template>
<script>
import { BOOK_TYPE, PUBLISHER_TYPE, READER_TYPE, STAFF_TYPE, TRANSACTION_TYPE } from '@/constants/form.constants';
import { useAdminUITypeStore } from '@/stores/admin_ui_type.stores';

export default {
    data: () => {
        return {
            BOOK_TYPE,
            PUBLISHER_TYPE,
            READER_TYPE,
            STAFF_TYPE,
            TRANSACTION_TYPE,
        }
    },
    methods: {
        logout() {
            // Xóa hết các key: value trên localStorage
            localStorage.clear();
            this.$router.push({ name: "loginUser" });
        },
        handleSetNewType(newType) {
            const adminUIType = useAdminUITypeStore();
            adminUIType.setAdminUIType(newType);
        }
    }
}
</script>