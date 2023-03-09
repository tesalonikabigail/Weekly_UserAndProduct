<template>
    <fragment>
        <div id = "home" class="black">
            <div class = "center">
                <h1 style="margin-top:10px; color: #F5F5F5">Tesalonika Abigail</h1>
                <h4 style="color: #F5F5F5">Web Developer Intern at Global Loyalty Indonesia</h4>
            </div>
            <div class="row">
                <b-navbar fixed sticky class="center navbar" style="padding-top: 20px; padding-bottom: 15px">
                    <li class="col-2"><a href="#home">Home</a></li>
                    <li class="col-2"><a href="#aboutme">About Me</a></li>
                    <li class="col-2"><a href="#experience">Experience</a></li>
                    <li class="col-2"><a href="#expDetail">Experience Detail</a></li>
                    <li class="col-2" style="cursor: pointer; text-decoration: none; color: rgba(255, 255, 255, 0.5)"><a @click="toRegis">Register</a></li>
                </b-navbar>
            </div>
        </div>
    </fragment>
</template>

<style lang="css" scoped>
    @import '~/style.css';
</style>

<script setup>
    import { getCurrentInstance } from 'vue';

    const router = getCurrentInstance().proxy.$router;

    const toRegis = () => {
        router.push({ name: 'regis' })
    }

</script>