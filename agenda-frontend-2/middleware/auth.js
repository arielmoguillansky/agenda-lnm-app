import { useUserStore } from "~~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  // if (
  //   !userStore.isLoggedIn &&
  //   to.fullPath !== "/login" &&
  //   to.fullPath !== "/signup"
  // ) {
  //   return navigateTo("/login");
  // }
  if (!userStore.isLoggedIn) {
    return navigateTo("/login");
  }
});
