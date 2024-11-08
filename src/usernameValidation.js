import * as Yup from "yup";
import staffService from "./services/staff.service";
import readerService from "./services/reader.service";

Yup.addMethod(Yup.string, "checkUsername", function () {
    // .test(name, message error, testFunction)
    // tham số value được truyền tự động, là giá trị của trường hiện tại đang xác thực
    return this.test("check-username", "Tên đăng nhập đã tồn tại", async function (value) {
        // Lấy đường dẫn của trường hiện tại đang xác thực để dễ dàng báo lỗi chính xác
        // Giúp tạo ra thông báo lỗi chính xác đến chỗ gây ra lỗi
        const { path, createError } = this;

        // Nếu username bị xóa/ không có giá trị thì ko cần kiểm tra
        if (!value)
            return true;

        // Kiểm tra username trong cả Staff và Reader
        const isExisted = await staffService.isExistingUsername(value) || await readerService.isExistingUsername(value);
        if (isExisted)
            return createError({ path, message: "Tên đăng nhập đã tồn tại" });
        return true;
    })
})

export default Yup;