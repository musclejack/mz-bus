<template>
    <div>
        
    </div>
</template>
<script>
    import axios from 'axios'
    import {findUserInfo} from '../../host'
    export default {
        created () {
            axios.get(findUserInfo)
                .then(response => {
                    console.log(response)
                })
        }
    }
</script>