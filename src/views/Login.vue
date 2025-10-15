<template>
  <div class="LoginBackground">
    <div class="LoginForm">
      <div class="big-contain">
        <div class="logo-container">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="50" height="50" fill="#2abeb2">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
        </div>
        <h1 class="system-title">慧医数字医疗系统</h1>
        <p class="welcome-subtitle">欢迎登录</p>
        <el-form :model="loginForm" ref="loginForm" status-icon>
          <div class="form">
            <el-form-item prop="username" :rules="loginRules.usernameRules">
              <div class="input-group">
                <div class="UserName">
                  <input
                      class="Input"
                      type="text"
                      v-model="loginForm.username"
                      autocomplete="off"
                      placeholder="用户名"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="password" :rules="loginRules.passwordRules">
              <div class="input-group">
                <div class="PassWord">
                  <input
                      class="Input"
                      type="password"
                      v-model="loginForm.password"
                      autocomplete="off"
                      placeholder="密码"
                      @keydown.enter="handleLogin('loginForm')"
                  />
                </div>
              </div>
            </el-form-item>
<!--            <el-form-item class="btn-container">-->
<!--              <button class="LoginBtn" @click.prevent="handleLogin('loginForm')">登录</button>-->
<!--            </el-form-item>-->
            <div class="btn-container">
              <button class="LoginBtn" @click.prevent="handleLogin('loginForm')">登录</button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/http/http.js'


export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        usernameRules: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passwordRules: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
   async handleLogin() {
     await axios.post('/user/login', {
       uname: this.loginForm.username,
       pwd: this.loginForm.password,
     }).then(res => {
       console.log(res);
       if (res.code === 200) {
         this.$message({
           type: 'success',
           message: res.msg
         })


         //前端存储整个对象
         localStorage.setItem("LoginUser",JSON.stringify(res.data))

         this.$router.push('/home/wel');
       }else{
         this.$message({
           type: 'error',
           message: res.msg
         })
       }
     })
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.LoginBackground{
  background: linear-gradient(135deg, #4dd5c5 0%, #5de0d0 50%, #6de8d8 100%);
  /* 如果有背景图片，取消下面的注释
  background: url("../assets/LoginBackground.jpg") no-repeat center;
  background-size: cover;
  */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 20px;
  position: relative;
}

/* 添加背景装饰圆圈 */
.LoginBackground::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  left: -100px;
}

.LoginBackground::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  bottom: -150px;
  right: -150px;
}

.LoginForm{
  background: rgba(255, 255, 255, 0.98);
  /* 如果有背景图片，取消下面的注释
  background: url("../assets/Login.png") no-repeat center;
  background-size: contain;
  */
  border-radius: 20px;
  box-shadow: 0 15px 45px rgba(42, 190, 178, 0.15);
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(42, 190, 178, 0.1);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2abeb2 0%, #24a89a 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 20px rgba(42, 190, 178, 0.3);
}

.logo-icon svg {
  fill: white;
}

.system-title {
  text-align: center;
  color: #2abeb2;
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: 700;
  letter-spacing: 2px;
}

.welcome-subtitle {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-bottom: 40px;
  font-weight: 400;
}

.big-contain {
  width: 100%;
}

.form {
  width: 100%;
}

.input-group {
  width: 100%;
  margin-bottom: 8px;
}

.input-label {
  display: block;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  padding-left: 4px;
}

.UserName,
.PassWord{
  border: 2px solid #2abeb2;
  border-radius: 12px;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  background: #fff;
}

.UserName:focus-within,
.PassWord:focus-within {
  border-color: #24a89a;
  box-shadow: 0 0 0 3px rgba(42, 190, 178, 0.1);
}

.Input{
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0 20px;
  height: 100%;
  font-size: 16px;
  color: #333;
}

.LoginBtn{
  /* 如果有按钮背景图片，取消下面的注释
  background: url("../assets/LoginButton.png") no-repeat center;
  background-size: 100% 100%;
  */
  background: linear-gradient(135deg, #2abeb2 0%, #24a89a 100%);
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(42, 190, 178, 0.3);
}

.LoginBtn:hover{
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(42, 190, 178, 0.4);
}

.LoginBtn:active {
  transform: translateY(0);
}

.btn-container{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Element UI 表单项样式重置 */
.el-form-item {
  margin-bottom: 25px;
}

input::-webkit-input-placeholder {
  color: #999;
}

input::-ms-input-placeholder {
  color: #999;
}

input::placeholder {
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .LoginForm {
    max-width: 90%;
    padding: 40px 30px;
  }

  .system-title {
    font-size: 24px;
  }

  .welcome-subtitle {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .logo-icon {
    width: 70px;
    height: 70px;
  }

  .logo-icon svg {
    width: 40px;
    height: 40px;
  }

  .input-label {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .Input {
    font-size: 14px;
  }

  .LoginBtn {
    font-size: 16px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .LoginForm {
    padding: 35px 25px;
  }

  .system-title {
    font-size: 20px;
    letter-spacing: 1px;
  }

  .welcome-subtitle {
    font-size: 13px;
    margin-bottom: 25px;
  }

  .logo-icon {
    width: 60px;
    height: 60px;
  }

  .logo-icon svg {
    width: 35px;
    height: 35px;
  }

  .input-label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .UserName,
  .PassWord {
    height: 45px;
  }
}
</style>