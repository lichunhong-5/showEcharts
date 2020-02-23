<template>
  <div class="login">
    <div class="img-top">
      <img src="@/assets/images/Login/logo-top.png" alt />
    </div>

    <div class="info">
      <div class="row">
        <label for="name">
          <p>账号</p>
          <input type="text" placeholder="请输入账号" v-model="account" />
        </label>
      </div>

      <div class="row">
        <label for="pass">
          <p>密码</p>
          <input type="password" placeholder="请输入密码" v-model="password" />
        </label>
      </div>

      <div class="row">
        <button @click="login">登录</button>
      </div>
    </div>

    <div class="img-bottom">
      <img src="@/assets/images/Login/logo-bottom.png" alt />
    </div>
  </div>
</template>

<script>
import "./Login.scss";

export default {
  name: "login",
  data() {
    return {
      account: window.localStorage.account ? window.localStorage.account : "",
      password: window.localStorage.password
        ? window.localStorage.password
        : "",
      checked: true,
      namespaced: "login"
    };
  },
  components: {},
  methods: {
    login() {
      const para = {
        account: this.account,
        password: this.password
      };
      this.$http
        .get("/register/token", para)
        .then(response => {
          window.localStorage.account = this.account;
          window.localStorage.password = this.password;
          this.$router.push({ name: "chooseInfo" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

