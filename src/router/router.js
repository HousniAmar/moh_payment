import { createRouter, createWebHistory } from "vue-router";
import Payment from '@/pages/Payment.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/payment_success",
      name: "PaymentSuccess",
      component: () =>
        import("../views/PaymentSuccess.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  //
});

export default router;
