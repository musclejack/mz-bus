<template>
    <div>
        list
        <button @click="getList(page)">点击加载数据</button>
    </div>
</template>
<script>
    import axios from 'axios'
    import { getUserList } from '../../../host'
    export default {
        data () {
            return {
                page: 1
            }
        },
        methods: {
            getList (page) {
                axios.get(getUserList + '?page=' + page)
                .then( (response) => {
                    console.log(response);
                })
                .catch( (error) => {
                    console.log(error);
                    this.$router.replace('/login')
                })
            }
        }
    }
</script>