<template>
    <div></div>
</template>

<script>
export default {
    name:'logout',
    created(){
        if(process.client){
            localStorage.removeItem('user')
            this.$router.push(
                this.$route.query.redirectFrom || {
                    path: "/login",
                }
                );
        }
    }
}
</script>