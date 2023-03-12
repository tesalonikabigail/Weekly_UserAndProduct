<template>
    <fragment>
        <b-navbar fixed sticky toggleable class="bg-light">
            <b-overlay :show="notFinish">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-6">
                        <div class="col-lg-3 d-none d-lg-block d-md-none d-sm-none">
                            <h5 style="display: flex; justify-content: right">
                                <b-icon icon="person-check-fill" style="margin-top: 1.5%"></b-icon>
                            </h5>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-9" style="display: flex; justify-content: left;">
                            <h5 style="align-items: center">{{ dataLogin?.fName + " " + dataLogin?.lName }}</h5>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-4 col-sm-6">
                        <div class="col-lg-10 col-md-12 col-sm-12" style="display: flex; justify-content: flex-end;">
                            <b-navbar-toggle target="navbar-toggle-collapse">
                                <template #default="{ expanded }">
                                    <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                                    <b-icon v-else icon="chevron-bar-down"></b-icon>
                                </template>
                            </b-navbar-toggle>
                        </div>
                        <div class="col-2 d-none d-lg-block d-md-none d-sm-none"></div>
                    </div>
                </div>

                <b-collapse id="navbar-toggle-collapse" is-nav>
                    <b-navbar-nav class="ml-auto" style="display: inline-block; justify-content: right; text-align: right; margin-right: 2%;">
                        <div class="row">
                            <b-nav-item class="col-3" @click="toHome">Home</b-nav-item>
                            <b-nav-item class="col-3" @click="toUsers">Users</b-nav-item>
                            <b-nav-item class="col-3" @click="toProduct">Products</b-nav-item>
                            <b-nav-item class="col-3" @click="toLogout">Logout</b-nav-item>
                        </div>
                    </b-navbar-nav>
                </b-collapse>
            </b-overlay>
        </b-navbar>
    </fragment>
</template>

<style lang="css" scoped>
    @import '~/style.css';
</style>

<script setup>
    import { getCurrentInstance, computed, ref } from 'vue';

    const router = getCurrentInstance().proxy.$router;
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const ctx = $root.$auth;

    const dataLogin = computed(() => $store.getters['regis/dataLogin']);
    const notFinish = ref(false);

    const toHome = () => {
        router.push({ name: 'home' });
    }
    const toUsers = () => {
        router.push({ name: 'usersData' });
    }
    const toProduct = () => {
        router.push({ name: 'product'});
    }
    const toLogout = async () => {
        localStorage.removeItem('dataLogin');
        localStorage.removeItem('token');
        localStorage.setItem('isAuth', false);

        // ctx.logout();
        // // await ctx.logout().then(() => {
        // //     router.push({ name: 'login' })
        // // });

        notFinish.value = true;
        await $store.dispatch('regis/logoutUser');
        notFinish.value = false;
        
        router.push({ name: 'login' });
    }
</script>