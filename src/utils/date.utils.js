import { APPROVED, PENDING, REJECTED, transactionStatusTitle } from "@/constants/transaction_status.constants";

// Chuyển về định dạng thích hợp để hiển thị
export function formatDate(date) {
    if (date)
        return new Date(date).toISOString().slice(0, 10);
    else return null;
}

export function getTransactionStatusTitle(statusValue) {
    let text = "";
    switch (statusValue) {
        case PENDING:
            text = transactionStatusTitle.pending;
            break;
        case REJECTED:
            text = transactionStatusTitle.rejected;
            break;
        case APPROVED:
            text = transactionStatusTitle.approved;
            break;
        default:
            confirm("Có lỗi khi lấy dữ liệu cho các giao dịch!");
    }
    return text;
}