import createApiClient from "./api.service";
class AdminService {
    constructor(baseUrl = "/api/admins") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async login(data) {
        return (await this.api.post(`/login/account`, data)).data;
    }
    // Phương thức lấy thông tin nhân viên bằng token
    async getProfile(token) {
        return (await this.api.get("/login/profile", { headers: { Authorization: `Bearer ${token}` } })).data;
    }
} export default new AdminService();

