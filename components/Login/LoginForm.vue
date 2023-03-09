<template>
    <fragment>
        <b-overlay :show="notFinish">
            <div class="container-fluid py-3" style="height: 100vh; overflow: auto">
                <div class="mx-auto my-auto" style="transform: translate(0vw, 11vh); background-color: white; padding: 1.3%; border-radius: 15px; margin: auto; width: 60%; max-height: 70vh; box-shadow: 5px 5px 10px 1px grey;"> <!-- hori, verti, spread, blur, col -->
                    <div class="container-fluid">   
                        <div class="row" style="max-height: 100vh;">
                            <div class="col-lg-6">
                                <div class="h-100 picture">
                                    <img class="d-none d-lg-block d-md-none d-sm-none" style="object-fit: cover; width: 100%; max-height: 100vh" src="../../aset/pict.png" />
                                </div>
                            </div>
                            <div class="col-lg-6" style="margin-top: 7%">
                                <h2 style="text-align: center; font-family: 'Labrada', 'serif'"> User Login Page </h2> <hr />
                                <form id="regisForm" class="px-2" @submit.prevent="onSubmit" method="post" style="padding-top: 2%">
                                    <b-input-group class="mb-3" v-for="(i, index) in info2" :key="index"> <!-- :key itu cmn identifier, pasang aja biasa klo gada suka error -->                
                                        <FormInputLogin :judul="i.judul" :types="i.types" :iconPict="i.icon" :id="i.id" v-model="i.keys"/>
                                    </b-input-group>

                                    <p v-if="cekErrMsg" style="color: red; text-align: center;">{{ errMsgLogin }}</p>

                                    <input id="btnSubmit" type="submit" class="btn btn-outline-info" value="Submit" style="width: 100%; margin-top: 1%; border-radius: 10px" />
                                    <p style="font-size: 12px; margin-top: 2%">Don't have an account yet? <a @click="toRegis" style="color: cornflowerblue; cursor: pointer; font-weight: bold">Register Here</a></p>
                                </form>
                            </div> <!-- npm install vuex --save --legacy-peer-dep -->
                        </div>
                    </div>
                </div>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import { ref, getCurrentInstance, computed } from "vue";
    import FormInputLogin from './FormInputLogin.vue';

    const email = ref("");
    const password = ref("");
    const cekErrMsg = ref(false);
    const router = getCurrentInstance().proxy.$router;
    const notFinish = ref(false);

    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;

    // Buat Autentikasi User
    const ctx = $root.$auth;

    // const onSubmit2 = async () => {
    //     const res = 
    //         await ctx.loginWith('local', {
    //             data: {
    //                 email: email.value,
    //                 password: password.value
    //             }
    //     })
    //     ctx.setUser(res.data.user);

    //     // router.push({ name: 'usersData' });
        
    //     // .catch((err) => {
    //     //     console.log(err)
    //     // })
    // }

    const info2 = ref(
        [{
            keys: email,
            judul: "Email",
            types: "email",
            icon: "fa fa-envelope fa-md",
            id: "email"
        }, {
            keys: password,
            judul: "Password",
            types: "password",
            icon: "fa fa-key fa-md",
            id: "password"
        }]
    );
    
    const loginCek = computed(() => $store.getters['regis/cekLogin']);
    const errMsgLogin = computed(() => $store.getters['regis/errMsgLogin']);
    const onSubmit = async () => {
        notFinish.value = true;
        await $store.dispatch("regis/loginUser", {
            axiosInstance: $axios,
            val: {
                email: email.value, 
                password: password.value 
            }
        });
        notFinish.value = false;
        
        if(errMsgLogin.value)
            cekErrMsg.value = true;
        
        if(loginCek.value){
            cekErrMsg.value = false;

            // const dataUser = computed(() => $store.getters['regis/fetchUser']);
            // const ambilData = computed(() => {
            //     const a = dataUser?.value?.filter((item) => item.email == email.value) ?? {};
            //     return (a.length > 0) ? a[0] : {};
            // });

            router.push({ name: 'usersData' });
        }
    }

    const toRegis = () => {
        router.push({ name: 'regis' });
    }
</script>