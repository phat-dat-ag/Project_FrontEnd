import createApiClient from "./api.service";
class TransactionService {
    constructor(baseUrl = "/api/transactions") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getAllTransactionWithFullInformation() {
        return (await this.api.get("/find_all_with/information")).data;
    }
    // Gọi Get với query (?key=value)
    async getAllTransactionWithFullInformationById(param) {
        return (await this.api.get("/find_all/by_id", { params: param })).data;
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
}
export default new TransactionService();
