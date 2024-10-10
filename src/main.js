import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS (cho các tính năng tương tác của Bootstrap), nếu không có thể Nav bar không hoạt động như bình thường
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router'

createApp(App).use(router).mount('#app')
