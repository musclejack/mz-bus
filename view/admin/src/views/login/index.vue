<template>
<!--     <div class="login-body">
        <div class="login">
            <label><span>账号</span><input name="account" v-model = "user.name"></input></label>
            <label><span>账号</span><input name="password" type="password" v-model = "user.password"></input></label>
            <button @click="submit">按我</button>
        </div>
    </div> -->
<!-- <div class="login-body">
    <div class="form-horizontal login">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-4 control-label">账号</label>
        <div class="col-sm-6">
          <input name="account" class="form-control" v-model = "user.name"></input>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-4 control-label">密码</label>
        <div class="col-sm-6">
          <input name="password" class="form-control" type="password" v-model = "user.password"></input>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-6">
          <button @click="submit" class="btn btn-default">登录</button>
        </div>
      </div>
    </div>
</div> -->
<div class="login-body">
    <div class="login">
        <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" type='password'></el-input>
            </el-form-item>
        </el-form>
        <!-- <button @click="submit" class="btn btn-default">登录</button> -->
        <el-button type="primary" @click="submit">文字按钮</el-button>
    </div>
</div>
</template>
<script>
import { codeurl, codeacturl, adminLogin } from '../../host'
import axios from 'axios'

export default {
    data() {
        return {
            labelPosition: 'right',
            user: {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        submit () {
            axios.post(adminLogin, {
                name: this.user.name,
                password: this.user.password
            })
            .then( response => {
                console.log(response)
                if (response.data.data&&response.data.data.login === 'success') {
                    this.$router.replace('/list/1')
                    console.log(11)
                }
            })
            .catch( error => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang = "scss" scoped>
    $whith : 170px;
    .login-body {
        width: 100%;
        height: 100%;
        padding-top: 300px;
        .login {
            width: 290px;
            margin: 0 auto;
            padding-top: 20px;
            border: 1px solid #eee;
            border-radius: 4px;
            box-shadow: 10px 10px 5px #888888;
            .el-input{
                width: $whith;
            }
            .el-input__inner {
                text-align: center;
            }
        }
        .el-input__inner{
            text-align: center;
        }
        .el-button {
            width: $whith;
            margin: 0 80px;
            margin-bottom: 15px;
        }
    } 
</style>