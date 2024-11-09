import createApiClient from "./api.service";
class ReaderService {
    constructor(baseUrl = "/api/readers") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
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
    async isExistingUsername(username) {
        return (await this.api.get(`/check/${username}`)).data;
    }
    async login(data) {
        return (await this.api.post(`/login/account`, data)).data;
    }
    // Phương thức lấy thông tin nhân viên bằng token
    async getProfile(token) {
        return (await this.api.get("/login/profile", { headers: { Authorization: `Bearer ${token}` } })).data;
    }
} export default new ReaderService();
