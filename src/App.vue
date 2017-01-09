<template>
  <div id="app">
    <div class="header-wrap">
      <div class="header">
        <div class="container">
          <h1>Accounting System</h1>
          <ul class="nav">
            <li class="nav-item">
              <router-link to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/add">新增</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/count">统计</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about">关于</router-link>
            </li>
            <li v-if="!islogin" class="nav-item">
              <router-link to="/login">登录</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import {currentUser} from './api'
  export default {
    name: 'app',
    created () {
      this.checkLogin()
    },
    data () {
      return {
        islogin: false
      }
    },
    methods: {
      checkLogin () {
        if (currentUser) {
          this.islogin = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .header-wrap {
    height: 80px;
    width: 100%;
    line-height: 80px;
    margin-bottom: 30px;
    background-color: #20a0ff;
    color: #fff;
  }

  .header {
    height: 100%;
    box-sizing: border-box;

    h1 {
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: 400;
    }
    .nav {
      float: right;
      height: 100%;
      line-height: 80px;
      background: transparent;
      padding: 0;
      margin: 0;

      &:before {
        display: table;
        content: "";
      }
    }

    .nav-item {
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;
      margin-left: 20px;

      a {
        text-decoration: none;
        color: #fff;
        display: block;
        padding: 0 20px;
        opacity: .8;
      }
    }

    a.router-link-active {
      opacity: 1;
      font-weight: 700;
      &:before {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #99d2fc;
      }
    }
  }

  .container {
    width: 1140px;
    padding: 0 30px;
    margin-left: auto;
    margin-right: auto;
  }

  .fade-enter-active, .fade-leave-active{
    transition: all .2s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

</style>
