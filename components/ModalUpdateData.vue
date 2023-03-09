<template>
    <fragment>
        <section v-if="dismissCountDown !== 0">
            <Alert :aType="1"/>
        </section>

        <form id="updateFormData" class="px-2" @submit.prevent="toStoreUpdateData(id)" method="post">
            <b-input-group>
                <label for="fName" class="w-100" style="font-family: 'Lato', 'sans-serif';">First Name</label>
                <b-input-group-prepend>
                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="person-lines-fill"></b-icon></span>
                </b-input-group-prepend>
                <input class="shadow-none form-control" name="fName" id="fName" type="text" v-model="fNames" style="border-radius: 0 10px 10px 0;"/>
            </b-input-group>
            <span style="color: red">{{ updateErr.fName }}</span>

            <b-input-group class="mt-3">
                <label for="lName" class="w-100" style="font-family: 'Lato', 'sans-serif';">Last Name</label>
                <b-input-group-prepend>
                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="person-lines-fill"></b-icon></span>
                </b-input-group-prepend>
                <input class="shadow-none form-control" name="lName" id="lName" type="text" v-model="lNames" style="border-radius: 0 10px 10px 0;"/>
            </b-input-group>
            <span style="color: red">{{ updateErr.lName }}</span>
            
            <b-input-group class="mt-3">
                <label for="email" class="w-100" style="font-family: 'Lato', 'sans-serif';">Email</label>
                <b-input-group-prepend>
                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="envelope-fill"></b-icon></span>
                </b-input-group-prepend>
                <input class="shadow-none form-control" name="email" id="email" type="email" v-model="emails" style="border-radius: 0 10px 10px 0;"/>
            </b-input-group>
            <span style="color: red">{{ updateErr.email }}</span>
            
            <b-input-group class="mt-3">
                <label for="noHP" class="w-100" style="font-family: 'Lato', 'sans-serif';">Phone Number</label>
                <b-input-group-prepend>
                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="phone"></b-icon></span>
                </b-input-group-prepend>
                <input class="shadow-none form-control" name="noHP" id="noHP" type="text" v-model="noHPs" style="border-radius: 0 10px 10px 0;"/>
            </b-input-group>
            <span style="color: red">{{ updateErr.noHP }}</span>

            <b-overlay :show="notFinish">
                <section v-if="buttonDisabled">
                    <b-button disabled block id="btnUpdate" type="submit" class="mt-4" variant="outline-info" style="border-radius: 10px;">Update</b-button>         
                </section>
                <section v-else>
                    <b-button block id="btnUpdate" type="submit" class="mt-4" variant="outline-info" style="border-radius: 10px;">Update</b-button> <!-- @click="$bvModal.hide" -->      
                </section>
            </b-overlay>
        </form>
    </fragment>
</template>

<script setup>
    import { ref, getCurrentInstance, computed, watch } from 'vue';
    import { cekValidasi } from "../utils/regisValidation";
    import Alert from "../components/Alert.vue";
    
    const props = defineProps(['id', 'firstName', 'lastName', 'email', 'noHP', 'password']);

    const ids = ref(props.id);
    const fNames = ref(props.firstName);
    const lNames = ref(props.lastName);
    const emails = ref(props.email);
    const noHPs = ref(props.noHP);
    const passwords = ref(props.password);
    const notFinish = ref(false);

    const buttonDisabled = ref(true);
    const dismissCountDown = ref(0);

    const updateErr = ref({
        fName: '',
        lName: '',
        email: '',
        noHP: ''
    });
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;

    const emit = defineEmits(['cek3']);
    const toStoreUpdateData = async () => {
        notFinish.value = true;
        await $store.dispatch("regis/updateUserData", {
            axiosInstance: $axios,
            val: {
                id: ids.value,
                fName: fNames.value,
                lName: lNames.value,
                email: emails.value,
                noHP: noHPs.value,
                password: passwords.value
            }
        });
        notFinish.value = false;

        if(requestStatus){
            // confirm("Data Has Been Updated Successfully");
            // emit("cek3", true);

            dismissCountDown.value = 1;
            setTimeout(() => window.location.reload(), 1000);
        }
    };
    const requestStatus = computed(() => $store.getters['regis/status']);

    watch(fNames, (val) => {
        cekValidasi(val, 3, 20, /^[A-Z]+$/i, "First Name", "(Include Only Alphabet)", 1) ? updateErr.value.fName = cekValidasi(val, 3, 20, /^[A-Z]+$/i, "First Name", "(Include Only Alphabet)", 1) : updateErr.value.fName = "";
        forModal(updateErr.value.fName);
    })  

    watch(lNames, (val) => {
        cekValidasi(val, 3, 20, /^[A-Za-z]+$/, "Last Name", "(Include Only Alphabet)", 1) ? updateErr.value.lName = cekValidasi(val, 3, 20, /^[A-Za-z]+$/, "Last Name", "(Include Only Alphabet)", 1) : updateErr.value.lName = "";
        forModal(updateErr.value.lName);
    })

    watch(emails, (val) => {
        cekValidasi(val, 10, 30, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email", "(No Space and Special Characters Except ('-', '.', '_'))", 1) ? 
            updateErr.value.email = cekValidasi(val, 10, 30, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email", "(No Space and Special Characters Except ('-', '.', '_'))", 1) : updateErr.value.email = "";
        forModal(updateErr.value.email);
    })
    
    watch(noHPs, (val) => {
        cekValidasi(val, 10, 16, /^[0-9]+$/, "Phone Number", "(Include Only Numbers)", 1) ? updateErr.value.noHP = cekValidasi(val, 10, 16, /^[0-9]+$/, "Phone Number", "(Include Only Numbers)", 1) : updateErr.value.noHP = "";
        forModal(updateErr.value.noHP);
    })  
    
    const forModal = (el) => {
        if(el !== "")
            buttonDisabled.value = true;
        else
            buttonDisabled.value = false;
    }
    
    // const API_URL = 'http://localhost:3000/users';
    // const updateUserData = async (id) => {
        //     console.log(id);
        //     await axios.put(`API_URL/${ id }`) //`${API_URL}/${id}`
        //         .then((res) => {
            //             toStoreUpdateData();
    //             alert('Data Has Been Updated Successfully');
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
</script>