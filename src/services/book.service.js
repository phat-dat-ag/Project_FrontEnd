import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getAllBookWithPublisher() {
        return (await this.api.get("/find_all_with/pubisher")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async uploadBookImage(imageFile) {
        // Tạo một FormData object
        const formData = new FormData();
        // Gửi file ảnh lên với key là 'img'
        formData.append('img', imageFile);

        // Gửi yêu cầu POST với formData chứa file ảnh
        return (await this.api.post("/upload/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Chỉ định kiểu dữ liệu là multipart/form-data
            }
        })).data;
    }
}

export default new BookService();
