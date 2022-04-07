<template>
    <div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    name:'layoutwatch',
    data(){
        return{
            user:this.$store.state.auth.user
        }
    },
}
</script>

<style scoped>
.nav{
    height: 70px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0px 5px 5px rgb(33, 37, 41, 0.1);
    transition: 0.2s;
}
.nav:hover{
    box-shadow: 0px 5px 5px rgb(33, 37, 41, 0.15);
}
.link:link{
    text-decoration: none!important;
}
.nav-buttons{
    color: #212529;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    transition: 0.25s;
}
.nav-buttons:hover{
    background: rgba(226, 226, 226, 0.5);
    text-decoration: none;
    transition: 0.25s;
}
</style>