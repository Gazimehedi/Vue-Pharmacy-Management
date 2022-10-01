<template>
  <div class="login-page">
    <div class="login-card">
      <div class="text-center">
        <img class="login-card__icon" src="/img/lock.png" alt="" />
        <h2>Login</h2>
      </div>
      <form action="#" @submit.prevent="handleSubmit">
        <label for="username" class="block mt-3">username</label>
        <input
          type="text"
          placeholder="username"
          v-model="formData.username"
          required
        />
        <label for="password" class="block mt-3">Password</label>
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password"
          required
          ref="password"
        />
        <!-- <p class="text-center mt-3" v-if="logingIn">loging...</p>
        <button type="submit" class="w-100 mt-3" v-else>Login</button> -->
        <TheButton class="mt-3" :block="true" :loding="logingIn"
          >Login</TheButton
        >
        <div class="d-flex jc-between mt-3">
          <div>
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheButton from "../components/TheButton.vue";
import TheToast from "../components/TheToast.vue";
export default {
  data: () => ({
    formData: {
      username: "",
      password: "",
    },
    logingIn: false,
  }),
  methods: {
    handleSubmit() {
      if (!this.formData.username) {
        // alert("username cannot be empty!");
        this.$eventBus.emit("toast", {
          type: "Error",
          message: "Username cannot be empty!",
        });
        return;
      }
      if (this.formData.password.length < 6) {
        // alert("Password must be at least 6 characters long!");
        this.$eventBus.emit("toast", {
          type: "Error",
          message: "Password must be at least 6 characters long!",
        });
        this.$refs.password.focus();
        return;
      }
      this.logingIn = true;
      axios
        .post("http://127.0.0.1:8000/api/login", this.formData)
        .then((res) => {
          this.$eventBus.emit("toast", {
            type: res.data.status,
            message: res.data.message,
          });
        })
        .catch((err) => {
          this.$eventBus.emit("toast", {
            type: err.response.data.status,
            message: err.response.data.message,
          });
          // console.log(err.response.data);
        })
        .finally(() => {
          this.logingIn = false;
        });
      // axios
      //   .get("http://localhost:8000/")
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // console.log(this.formData);
    },
  },
  components: { TheToast, TheButton },
};
</script>
<style>
.box {
  width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  transition: all 0.5s;
}

.box--right {
  margin-left: 222px;
}

.box1 {
  width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  /* animation: showhide 1s ease-in; */
}

.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0px 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type="email"],
.login-card input[type="text"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}
button {
  background: rgb(48, 15, 15);
  color: #fff;
  padding: 10px 15px;
  border-radius: 3px;
  border: 1px solid #dddddd;
}

@keyframes showhide {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.showhide-enter-active {
  animation: showhide 1s ease-in;
  /* transition: all 0.5s; */
}
.showhide-enter-from {
  /* opacity: 0;
    transform: scale(0.5); */
}

.showhide-enter-to {
  /* opacity: 1;
    transform: scale(1); */
}

.showhide-leave-active {
  animation: showhide 1s ease-in reverse;
  /* transition: all 0.5s; */
}
.showhide-leave-from {
  /* opacity: 1;
    transform: scale(1); */
}

.showhide-leave-to {
  /* opacity: 0;
    transform: scale(0.5); */
}
</style>
