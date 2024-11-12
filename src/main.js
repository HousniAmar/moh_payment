import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

// Import your views
import Home from './views/Home.vue';
import Payment from './views/Payment.vue';
import Test from './views/test.vue';

import PaymentSuccess from './views/PaymentSuccess.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/payment', component: Payment },
  { path: '/test', component: Test },
  { path: '/success', component: PaymentSuccess },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory instead of createWebHashHistory
  routes,
});

const app = createApp(App);

// Use Pinia
app.use(createPinia());
// Use Vue Router
app.use(router);

app.mount('#app');

export default router; // Export the router instance

