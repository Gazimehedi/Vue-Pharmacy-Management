<template>
  <!-- <Login></Login> -->
  <router-view></router-view>
  <!-- <div class="toasts"> -->
  <TransitionGroup name="slide-left" tag="div" class="toasts">
    <TheToast
      v-for="(toast, i) in toasts"
      :key="i"
      :toastType="toast.type"
      :message="toast.message"
    ></TheToast>
  </TransitionGroup>
  <!-- </div> -->
</template>
<script>
import TheToast from "./components/TheToast.vue";
import { eventBus } from "./utils/eventBus";
// import Login from "./views/Login.vue";
export default {
  data: () => ({
    toasts: [
      // {
      //   type: "Success",
      //   message: "Done Successfully!",
      // },
      // {
      //   type: "Error",
      //   message: "Something went wrong!",
      // },
    ],
  }),
  components: { TheToast },
  mounted() {
    eventBus.on("toast", (data) => {
      // console.log(data);
      this.toasts.push(data);
      this.removeOneToast();
    });
  },
  methods: {
    removeOneToast() {
      setTimeout(() => {
        this.toasts.shift();
      }, 2222);
    },
  },
};
</script>
<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
