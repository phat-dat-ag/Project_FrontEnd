<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Quản lý thư viện</a>
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
                        <router-link :to="{ name: 'reader' }" class="nav-link">
                            Độc giả
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'book' }" class="nav-link">
                            Sách
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'publisher' }" class="nav-link">
                            Nhà xuất bản
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'staff' }" class="nav-link">
                            Nhân viên
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'transaction' }" class="nav-link">
                            Theo dõi mượn sách
                        </router-link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>
