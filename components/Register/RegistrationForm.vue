<template>
    <fragment>
        <div class="container-fluid py-3" style="height: 100vh; overflow: auto">
            <section v-if="!cekErrMsg">
                <b-modal class="font-title" v-model="cek2" hide-footer no-close-on-backdrop>
                    <template #modal-header="{ close }">
                        <b-button id="btnClose" size="sm" variant="outline-danger" @click="hideModal">Close</b-button>
                    </template>
                    <ModalRegis v-if="!cekErrMsg" :cek="cek" :errorList="errorData" :fName="fName" :lName="lName" :noHP="noHP" :email="email"/>              
                </b-modal>
            </section>

            <b-overlay :show="notFinish">
                <div class="mx-auto my-auto" style="transform: translate(0vw, 2vh); background-color: white; padding: 1.3%; border-radius: 15px; width: 80%; max-height: 100vh; box-shadow: 5px 5px 10px 1px grey;"> <!-- hori, verti, spread, blur, col -->
                    <div class="container-fluid">   
                        <div class="row" style="max-height: 100vh">
                            <div class="col-lg-6">
                                <div class="h-100 picture">
                                    <img class="d-none d-lg-block d-md-none d-sm-none" style="object-fit: cover; width: 100%; height: 80vh" src="../../aset/pict.png" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <h2 style="text-align: center; font-family: 'Labrada', 'serif'"> Create New Account </h2> <hr />
                                <form id="regisForm" class="px-2" @submit="onSubmit" method="post">
                                    <b-input-group class="mb-2" v-for="(i, index) in info" :key="index"> <!-- :key itu cmn identifier, pasang aja biasa klo gada suka error -->                
                                        <FormInput :judul="i.judul" :types="i.types" :iconPict="i.iconPict" :id="i.id" v-model="i.keys" />
                                    </b-input-group>

                                    <p v-if="cekErrMsg" style="color: red; text-align: center;">{{ errMsgLogin }}</p>
                                    <input id="btnSubmit" type="submit" class="btn btn-outline-info" value="Submit" style="width: 100%; margin-top: 1%; border-radius: 10px" />
                                    <p style="font-size: 12px; margin-top: 1%">Already have an account? <a @click="toLogin" style="color: cornflowerblue; cursor: pointer; font-weight: bold">Login Here</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </b-overlay>
        </div>
    </fragment>
</template>

<script setup>
    import FormInput from "./FormInput.vue";
    import ModalRegis from "./ModalRegis.vue";
    import { cekValidasi } from "../../utils/regisValidation";
    import { ref, getCurrentInstance, computed } from "vue";
        
    const err = ref([]); // klo ref pke nya const aja krna yg diganti itu .value nya doang bukan semuanya jadi gpp pke const krna cmn isi
    const cek = ref(false); // nya doang yang keganti, mknya pas mw manggil dan value nya diganti itu hrs pke .value dlu gbs lngsng pke var nya
    const cek2 = ref(false); // dan variable nya itu reaktif jadi bisa diiat di watch() buat pergantian value secara realtime (?) yg kyk span
    const fName = ref(""); // error message di bwh input form yg misalnya input nama trs malah kita tulis angka kan kdng suka muncul lngsng 
    const lName = ref(""); // error msg nya nah itu pke watch()
    const email = ref("");
    const noHP = ref(""); // ini msk STATE, klo store itu buat kyk nyimpen func" buat nnti di panggil yg kyk tdi AA_BB.namaFunc nya gtu
    const password = ref(""); // cth ACT_BANNER.base + '/' + ACT_BANNER.doGetBanner nnti jdi cthnya banner/base/doGetBanner
    const confirmPass = ref("");
    const notFinish = ref(false);
    const cekErrMsg = ref(false);
    
    const router = getCurrentInstance().proxy.$router;
        
    const info = ref(
        [{
            keys: fName,
            judul: "First Name",
            types: "text",
            iconPict: "fa fa-user fa-md",
            id: "fNames",
        }, {
            keys: lName,
            judul: "Last Name",
            types: "text",
            iconPict: "fa fa-user fa-md",
            id: "lNames",
        }, {
            keys: email,
            judul: "Email Address",
            types: "email",
            iconPict: "fa fa-envelope fa-md",
            id: "emails",
        }, {
            keys: noHP,
            judul: "Phone Number",
            types: "text",
            iconPict: "fa fa-phone fa-md",
            id: "noHPs"
        }, {
            keys: password,
            judul: "Password",
            types: "password",
            iconPict: "fa fa-key fa-md",
            id: "passS",
        }, {
            keys: confirmPass,
            judul: "Confirm Password",
            types: "password",
            iconPict: "fa fa-key fa-md",
            id: "confirmPassS",
        }]
    )
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;

    const sendToStore = async () => {
        notFinish.value = true;
        if(!cek.value){
            await $store.dispatch("regis/inputNewUserData", { 
                axiosInstance: $axios,
                val: {
                    fName: fName.value,
                    lName: lName.value,
                    email: email.value,
                    noHP: noHP.value,
                    password: password.value
                }
            });

            if(errMsgLogin.value){
                cek.value = true;
                cekErrMsg.value = true;
            }
        }
        else
            $store.dispatch("regis/setErr", err.value);
        notFinish.value = false;
    };
    const errMsgLogin = computed(() => $store.getters['regis/errMsgLogin']);
    const errorData = computed(() => $store.getters['regis/errStg']);
        
    const showModal = () => {
        cek2.value = true;
    }
    const hideModal = () => {
        cek2.value = false;
        
        if(!cek.value)
            fName.value = lName.value = email.value = noHP.value = password.value = confirmPass.value =  "";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        err.value = [];
        cek.value = false;
        cekErrMsg.value = false;

        cekValidasi(fName.value, 3, 20, /^[A-Z]+$/i, "First Name", "(Include Only Alphabet)", 1) ? err.value.push(cekValidasi(fName.value, 3, 20, /^[A-Z]+$/i, "First Name", "(Include Only Alphabet)", 1)) : "";
        cekValidasi(lName.value, 3, 20, /^[A-Za-z]+$/, "Last Name", "(Include Only Alphabet)", 1) ? err.value.push(cekValidasi(lName.value, 3, 20, /^[A-Za-z]+$/, "Last Name", "(Include Only Alphabet)", 1)) : "";
        cekValidasi(email.value, 10, 30, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email", "(No Space and Special Characters Except ('-', '.', '_'))", 1) ? 
            err.value.push(cekValidasi(email.value, 10, 30, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email", "(No Space and Special Characters Except ('-', '.', '_'))", 1)) : "";
        cekValidasi(noHP.value, 10, 16, /^[0-9]+$/, "Phone Number", "(Include Only Numbers)", 1) ? err.value.push(cekValidasi(noHP.value, 10, 16, /^[0-9]+$/, "Phone Number", "(Include Only Numbers)", 1)) : ""; ///^\d+$/
        cekValidasi(password.value, 8, 12, "", "Password", "", 0) ? err.value.push(cekValidasi(password.value, 8, 12, "", "Password", "", 0)) : "";
        cekValidasi(confirmPass.value, 8, 12, "", "Confirm Password", "", 0) ? err.value.push(cekValidasi(confirmPass.value, 8, 12, "", "Confirm Password", "", 0)) : "";
        
        if(password.value !== confirmPass.value)
            err.value.push("Password and Confirm Password Must Be the Same");
        
        if(err.value.length > 0)
            cek.value = true;
        else
            document.getElementById("regisForm").reset();

        sendToStore();
        showModal();
    }

    function toLogin() {
        router.push({ name: 'login' })
    }
</script>