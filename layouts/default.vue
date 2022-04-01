<template>
    <div>
        <div class="d-flex justify-content-center align-items-center bg-light nav">
            <NuxtLink class="link" :to="'/'">
                <div class="nav-buttons">
                    Home
                </div>
            </NuxtLink>
            <NuxtLink class="link" :to="'/list'">
                <div class="nav-buttons">
                    Video List
                </div>
            </NuxtLink>
            <NuxtLink class="link" :to="'/replies'">
                <div class="nav-buttons">
                    Messages
                </div>
            </NuxtLink>
        </div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    name:'default',
    data(){
        return{
            user:'user1'
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