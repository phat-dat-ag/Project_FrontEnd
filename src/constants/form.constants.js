export const BOOK_TYPE = 1;
export const PUBLISHER_TYPE = 2;
export const READER_TYPE = 3;
export const STAFF_TYPE = 4;
export const TRANSACTION_TYPE = 5;

export const formDescriptions = {
    book: {
        addTitle: "Thêm sách mới",
        updateTitle: "Cập nhật sách",
        entityName: "book" // Tên của entity, là tên trong router luôn
    },
    publisher: {
        addTitle: "Thêm nhà xuất bản mới",
        updateTitle: "Cập nhật nhà xuất bản",
        entityName: "publisher"
    },
    reader: {
        addTitle: "Thêm độc giả mới",
        updateTitle: "Cập nhật độc giả",
        entityName: "reader"
    },
    staff: {
        addTitle: "Thêm nhân viên mới",
        updateTitle: "Cập nhật nhân viên",
        entityName: "staff"
    },
    transaction: {
        addTitle: "Thêm giao dịch mới",
        updateTitle: "Cập nhật giao dịch",
        entityName: "transaction"
    }
}