import { createApp } from 'vue';
import App from './App.vue';

import './assets/css/ayoflex.css';
import './assets/css/example.css';
import router from './router';

const app = createApp(App);
app.use(router);
// app.config.globalProperties.$eventBus = eventBus;

app.mount("#app");
