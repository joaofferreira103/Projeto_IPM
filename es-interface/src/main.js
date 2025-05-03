import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import "@/assets/styles/fonts.css";
import { useDatabaseStore } from './store/useDatabaseStore';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const databaseStore = useDatabaseStore();
databaseStore.loadDatabase();

createApp(App).use(pinia).use(router).mount('#app');