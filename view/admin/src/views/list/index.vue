

<template>
<div class="list-page">
    <div class="table-warp">
      <el-table
        :data="listData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="user_id"
          label="#"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          width="80">
        </el-table-column>
        <el-table-column
          prop="tele"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="openid"
          label="openid">
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
        <el-pagination
            @current-change="handleCurrentChange"
            small
            layout="prev, pager, next"
            :total="count">
        </el-pagination>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { getUserList, getUserCount } from '../../host'
export default {
    data() {
        return {
            listData: [],
            count: 0
        }
    },
    watch: {
        '$route': 'getList'
    },
    methods: {
        getList ( ) {
            axios.get(getUserList + '?page=' + this.$route.params.id)
            .then( (response) => {
                console.log(response);
                if (response.data.code === 200) {
                    this.listData = response.data.data
                    // console.log(this.listData)
                } else (
                    this.$router.replace('/login')
                )
                
            })
            .catch( (error) => {
                console.log(error);
                this.$router.replace('/login')
            })
        },
        getListCount () {
            axios.get(getUserCount)
            .then( (response) => {
                console.log(response);
                if (response.data.code === 200) {
                    this.count = response.data.data.count
                    console.log(response.data.data.count)
                    // console.log(this.listData)
                } else (
                    this.$router.replace('/login')
                )
                
            })
            .catch( (error) => {
                console.log(error);
                this.$router.replace('/login')
            })
        },
        handleCurrentChange (index) {
            console.log(index)
            this.$router.push({name: 'list', params: {id: index}})
        }
    },
    created () {
        this.getListCount ()
        this.getList()
    }
}
</script>
<style lang= "scss">
.list-page {
    width: 800px;
    margin: 0 auto;
    .table-warp{
        min-width: 600px;
        max-width: 800px;
        height: 500px;
    }
    .pager {
        margin: 0 auto;
        width: 300px;
        text-align: center;
    }
}
</style>
