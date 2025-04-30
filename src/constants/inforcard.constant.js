// Đối tượng chứa đối tượng => Cẩn thận khi tham chiếu
// ở ListEntity sẽ bổ sung thuộc tính value cho mỗi đối tượng {label, value}
// titleElement sau khi bổ sung chỉ đơn giản là kiểu String

export const bookInfor = {
    _id: { label: "Mã sách", },
    name: { label: "Tên sách" },
    author: { label: "Tác giả" },
    price: { label: "Giá sách" },
    quantity: { label: "Số lượng" },
    publisher_name: { label: "Nhà xuất bản" },
    publication_year: { label: "Năm xuất bản" },
};

export const publisherInfor = {
    _id: { label: "Mã NXB", },
    name: { label: "Tên NXB" },
    address: { label: "Địa chỉ", },
};

export const readerInfor = {
    _id: { label: "Mã độc giả", },
    first_name: { label: "Họ", },
    last_name: { label: "Tên", },
    username: { label: "Tên đăng nhập", },
    birthday: { label: "Sinh nhật", },
    sex: { label: "Giới tính", },
    address: { label: "Địa chỉ", },
    phone: { label: "Số điện thoại", },
};

export const staffInfor = {
    _id: { label: "Mã Nhân viên", },
    fullname: { label: "Họ và tên", },
    username: { label: "Tên đăng nhập", },
    title: { label: "Chức vụ", },
    address: { label: "Địa chỉ", },
};

export const transactionInfor = {
    _id: { label: "Mã giao dịch", },
    book_name: { label: "Sách", },
    publisher_name: { label: "Nhà xuất bản" },
    reader_fullname: { label: "Độc giả", },
    staff_fullname: { label: "Nhân viên", },
    borrow_date: { label: "Ngày mượn", },
    return_date: { label: "Ngày trả", },
    status: { label: "Trạng thái" }
};