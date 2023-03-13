<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />
            
            <section v-if="dismissCountDown !== 0">
                <Alert :aType="2"/>
            </section>

            <!-- delete -->
            <!-- <section v-if="cekType === 2">
                <b-alert :show="dismissCountDown" dismissible fade variant="warning">
                    {{ outMsg }}
                </b-alert>
            </section> -->

            <b-modal class="font-title" v-model="cekDelete" hide-footer no-close-on-backdrop>
                <template #modal-header="{ close }">
                    <h4 style="color: grey">Confirm Deletion Data</h4>
                </template>
                <img src="../aset/confirmDel.png" style="width: 90%; display: flex; justify-content: center; margin-left: 5%"/>
                <b-overlay :show="notFinish" style="display: flex; justify-content: flex-end; width: 100%">
                    <b-button id="noDelete" size="sm" variant="outline-info" style="margin-right: 2%" @click="confirmDeletion(2)">Cancel</b-button>
                    <b-button id="doDelete" size="sm" variant="danger" @click="confirmDeletion(1)">Delete</b-button>
                </b-overlay>
            </b-modal>

            <b-modal class="font-title" v-model="cek2" hide-footer no-close-on-backdrop>
                <template #modal-header="{ close }">
                    <h4 style="color: grey">Update Data</h4>
                    <b-button id="btnClose" size="sm" variant="outline-danger" @click="hideModal">Close</b-button>
                </template>
                <!-- @cek3="cek3" -->
                <ModalUpdateData v-if="ambilData" :id="ambilData.id" :firstName="ambilData.fName" :lastName="ambilData.lName" :email="ambilData.email" :noHP="ambilData.noHP" :password="ambilData.password"/>
            </b-modal>

            <div class="container-fluid" style="width: 80%;">
                <div class="mt-3 col-lg-6 col-md-8 col-sm-12 navbar navbar-light" style="padding-left: 0pt">
                    <form class="form-inline">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><b-icon icon="search"></b-icon></span>
                            </div>
                            <input class="shadow-none form-control mr-sm-2 col-lg-10 col-md-8 col-sm-8" v-model="forSearch" type="search" placeholder="Search" aria-label="Search">
                        </div>
                    </form>
                </div>

                <b-table striped hover responsive caption-top :items="forSearching" :fields="field" :per-page="perPage" :current-page="currentPage" align-items-center style="margin-top: 2%">
                    <!-- <template #table-caption>All Users' Data</template> -->

                    <template #cell(actions)="row">
                        <b-button size="sm" class="mr-2" variant="info" @click="showModal(row.item.id)">
                            <b-icon size="sm" class="mr-2" icon="pencil-square"></b-icon> Update
                        </b-button>
                        <b-button size="sm" class="mr-2" variant="danger" @click="toDeleteUserData(row.item.id)"> <!--  -->
                            <b-icon size="sm" class="mr-2" icon="trash"></b-icon> Delete
                        </b-button>
                    </template>
                </b-table>

                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
            </div>
        </b-overlay>
    </fragment>
</template>

<style lang="css" scoped>
    @import '~/style2.css';
</style>

<script setup>
    import { ref, onMounted, computed, getCurrentInstance } from "vue";
    import ModalUpdateData from "../components/ModalUpdateData.vue";
    import NavbarUsersPage from "../components/NavbarUsersPage.vue";
    import Alert from "../components/Alert.vue";

    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const router = getCurrentInstance().proxy.$router;
    const ctx = $root.$auth;

    const cek2 = ref(false);
    const cek3 = ref(false);
    const cekType = ref(0);
    const cekDelete = ref(false);
    const activeID = ref(0); // buat dptin id row yg button "update" nya di klik
    const dismissCountDown = ref(0);
    const notFinish = ref(false);
    const tempID = ref(0);
    const forSearch = ref("");
    const perPage = 8;
    const currentPage = ref(1);
    // const outMsg = ref("");
    
    const dataUser = computed(() => $store.getters['regis/fetchUser']);
    const rows = computed(() => dataUser.value.length);
    const ambilData = computed(() => {
        if(activeID.value !== 0){
            const a = dataUser.value.filter((item) => item.id == activeID.value) ?? {}; // diambil row yg button "update" nya di klik doang (krna pke filter)
            return (a.length > 0) ? a[0] : {};        // item yg diambil cmn item dengan id yg sama kyk activeID (id yg di klik button update nya)
        }
    });
    const forSearching = computed(() => {
        if(forSearch.value !== ""){
            const a = dataUser?.value?.filter(
                (item) => item.fName.toUpperCase().includes(forSearch.value.toUpperCase()) ||
                          item.lName.toUpperCase().includes(forSearch.value.toUpperCase()) ||
                          item.email.includes(forSearch.value) || 
                          item.noHP.includes(forSearch.value));
            return a;
        }
        else
            return dataUser.value;
    })

    const confirmDeletion = async(conIn) => {
        if(conIn == 1){
            notFinish.value = true;
            await $store.dispatch('regis/deleteUserData', {
                axiosInstance: $axios,
                val: tempID.value
            });

            await $store.dispatch('regis/fetchUserData', {
                axiosInstance: $axios
            });
            notFinish.value = false;

            cekDelete.value = false;
            dismissCountDown.value = 1;
        }
        else
            cekDelete.value = false;
    }

    const toDeleteUserData = async (id) => {
        tempID.value = id;
        cekDelete.value = true;
    }

    const showModal = (id) => {
        cek2.value = true;
        activeID.value = id; // disni dptin id row yg button update nya di klik
    }
    const hideModal = () => {
        cek2.value = false;
    }

    // const modalStat = computed(() => $store.getters['regis/modalStatus']); //reqStatus 'regis/status'
    // if(modalStat.value){
        //     console.log(modalStat.value)
        //     cek2.value = false;
        //     cekType.value = 1;
        //     outMsg.value = "Data Has Been Successfully Updated";
        //     countDownChanged(3, 1);
        // }

    const field = [{
        key: 'id',
        sortable: true,
        label: 'ID'
    }, {
        key: 'fName',
        sortable: true,
        label: 'First Name'
    }, {
        key: 'lName',
        sortable: true,
        label: 'Last Name'
    }, {
        key: 'email',
        sortable: true,
        label: 'Email'
    }, {
        key: 'noHP',
        sortable: true,
        label: 'Phone Number'
    }, {
        key: 'actions',
        label: 'Actions'
    }]

    onMounted(async () => {
        notFinish.value = true;
        await $store.dispatch('regis/fetchUserData', {
            axiosInstance: $axios
        });
        notFinish.value = false;
    });
</script>
