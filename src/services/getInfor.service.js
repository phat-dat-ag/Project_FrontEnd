import { BOOK_TYPE, PUBLISHER_TYPE, READER_TYPE, STAFF_TYPE, TRANSACTION_TYPE } from "@/constants/form.constants";
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";
import readerService from "@/services/reader.service";
import staffService from "@/services/staff.service";
import transactionService from "@/services/transaction.service";
import { useAdminUITypeStore } from "@/stores/admin_ui_type.stores";
import { formatDate, getTransactionStatusTitle } from "@/utils/date.utils";

export async function getAllEntities() {
    let entities = [];
    // Lấy từ Pinia
    const type = useAdminUITypeStore();
    try {
        switch (type.getAdminUIType) {
            case BOOK_TYPE:
                entities = await bookService.getAllBookWithPublisher();
                break;
            case PUBLISHER_TYPE:
                entities = await publisherService.getAll();
                break;
            case READER_TYPE:
                entities = await readerService.getAll();
                break;
            case STAFF_TYPE:
                entities = await staffService.getAll();
                break;
            case TRANSACTION_TYPE:
                entities = await transactionService.getAllTransactionWithFullInformation();
                for (let entity of entities) {
                    entity.request_date = formatDate(entity.request_date);
                    entity.borrow_date = formatDate(entity.borrow_date);
                    entity.due_date = formatDate(entity.due_date);
                    entity.return_date = formatDate(entity.return_date);
                    entity.status = getTransactionStatusTitle(entity.status);
                }
                break;
            default:
                confirm(`Đã có lỗi trong quá trình getAll dữ liệu!`);
        }
        return entities;
    } catch (error) {
        console.log(error);
    }
}