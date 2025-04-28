import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
// Cấu hình: lưu giá trị lại kể cả load lại trang
pinia.use(piniaPluginPersistedstate);

export default pinia;
