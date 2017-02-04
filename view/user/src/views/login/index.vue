<template>
    <div class="login-body">
        <div class="login">
            <label><span>账号</span><input name="account" v-model = "user.name"></input></label>
            <label><span>账号</span><input name="account" v-model = "user.password"></input></label>
            <img :src="code.codesrc" @click="changeSrc"/>
            <label><span>账号</span><input name="account" v-model = "code.codedata" @change='changeCode'></input></label>
            <button @click="submit">按我</button>
        </div>
    </div>
</template>

<script>
import { codeurl, codeacturl, adminLogin } from '../../../host'
import axios from 'axios'
// import AJAX from '../../util/ajax.js'
console.log(adminLogin)
export default {
    data () {
        return {
            code: {
                basesrc: codeurl,
                codesrc: codeurl,
                codedata: ''
            },
            user: {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        changeSrc () {
            this.code.codesrc = this.code.basesrc + Math.random()
        },
        changeCode () {
            axios.post(codeacturl, {
                code: this.code.codedata
            })
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error)
            })
        },
        submit () {
            axios.post(adminLogin, {
                name: this.user.name,
                password: this.user.password
            })
            .then( response => {
                console.log(response)
                if (response.data.data&&response.data.data.login === 'success') {
                    this.$router.replace('/list')
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
    .login-body {
        width: 100%;
        height: 100%;
         .login {
            width: 400px;
            padding-top: 400px;
            margin: 0 auto;
            label {
                display: block;
                padding-bottom: 2px;
                span {
                    display: inline-block;
                    width: 50px;
                    line-height: 25px;
                    background-color: #eee;
                    font-size: 20px;
                }
                input {
                    height: 25px;
                    font-size: 20px;
                  /*  width: (100% - 50px);*/
                }
            }
        }
    } 
</style>