<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Nhân viên</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'staffHome' }" class="nav-link">
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'trackingBook' }" class="nav-link">
                            Lịch sử quản lý
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'staffAccount' }" class="nav-link">
                            Trang cá nhân
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>