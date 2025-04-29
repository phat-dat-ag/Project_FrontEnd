<script>
import InputSearch from '@/components/InputSearch.vue';
import bookService from '@/services/book.service';
import { useFormTypeStore } from '@/stores/formtype.stores';
import { BOOK_TYPE } from '@/constants/form.constants';
import ListEntity from '@/entities/ListEntity.vue';
export default {
    components: {
        InputSearch, ListEntity
    },
    data() {
        return {
            books: [],
            searchText: "",
            activeIndex: -1,
            BOOK_TYPE,
        }
    },
    watch: {
        // Mỗi khi searchText thay đổi thì activeIndex đều gán lại -1
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        // Danh sách các chuỗi: Chuyển toàn bộ thông tin (trừ ID và favorite) của mỗi book thành 1 chuỗi để tiện cho chức năng tìm kiếm
        bookStrings() {
            return this.books.map((book) => {
                const { address, publication_year, favorite, name, price, quantity, author } = book;
                return [address, publication_year, favorite, name, price, quantity, author].join("");
            });
        },
        // Chức năng tìm kiếm
        filteredBooks() {
            if (!this.searchText)
                return this.books;
            return this.books.filter((_book, index) => {
                return this.bookStrings[index].includes(this.searchText);
            });
        },
        // Lấy số lượng các book tìm được
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        // Lấy toàn bộ các đối tượng book từ CSDL
        async retrieveBookList() {
            try {
                this.books = await bookService.getAll();
                // console.log(this.books);
            } catch (error) {
                console.log(error);
            }
        },
        // Chức năng Làm mới: Làm mới danh sách, làm mới luôn giá trị tìm kiếm
        refreshBookList() {
            this.retrieveBookList();
            this.activeIndex = -1;
            this.searchText = "";
            // Đưa về trang Book luôn
            this.$router.push({ name: "book" });
        },
        // Chức năng Xóa tất cả: Đi đến CSDL xóa toàn bộ các book
        async removeBookList() {
            if (confirm("Xóa hết các Sách?")) {
                try {
                    await bookService.deleteAll();
                    this.refreshBookList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chức năng thêm mới
        goToAddBook() {
            const formTypeStore = useFormTypeStore();
            formTypeStore.setFormType(BOOK_TYPE);
            this.$router.push({ name: "entity.add" });
        }
    },
    mounted() {
        // Khi vừa mount là refresh, => lấy dữ liệu từ CSDL
        this.refreshBookList();
    }
}
</script>

<template>
    <h1>Quản lý Sách</h1>
    <div class="row">
        <!-- Liên kết 2 chiều, dùng một props mặc định là modelValue, và khi dữ liệu thay đổi thì dùng event update:modelValue -->
        <InputSearch v-model="searchText"></InputSearch>
        <div class="container">
            <div class="row">
                <!-- BookList: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">
                    <h4>Danh sách Sách</h4>
                    <!-- Đã responsive -->
                    <div class="row">
                        <!-- Button "Làm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-primary w-100 mb-2" @click="refreshBookList()">Làm mới</button>
                        </div>
                        <!-- Button "Thêm mới" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-success w-100 mb-2" @click="goToAddBook()">Thêm mới</button>
                        </div>
                        <!-- Button "Xóa tất cả" -->
                        <div class="col-12 col-md-4">
                            <button class="btn btn-danger w-100 mb-2" @click="removeBookList()">Xóa tất cả</button>
                        </div>
                    </div>

                    <!-- Chỗ này Tìm kiếm nè: mỗi khi searchText thay đổi thì đều lấy lại danh sách tìm kiếm -->
                    <ListEntity v-if="filteredBooksCount > 0" :entities="filteredBooks"
                        v-model:activeIndex="activeIndex" :interfaceType="BOOK_TYPE"></ListEntity>
                    <p v-else>Không có Sách nào!</p>
                </div>

                <!-- BookAdd và BookEdit: chiếm 12 cột trên mobile, và 6 cột trên tablet và laptop -->
                <div class="col-12 col-md-6">

                </div>
            </div>
        </div>
    </div>
</template>