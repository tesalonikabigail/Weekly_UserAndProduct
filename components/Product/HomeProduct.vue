<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />

            <section v-if="dismissCountDown !== 0">
                <Alert :aType="2"/>
            </section>

            <b-modal class="font-title" v-model="cek" hide-footer no-close-on-backdrop>
                <template #modal-header="{ close }">
                    <!-- <h4 style="color: grey">{{ ambilData.product_name }}</h4> -->
                    <b-button id="btnClose" size="sm" variant="outline-danger" @click="hideModal">Close</b-button>
                </template>
                <ProductDetail v-if="ambilData" :prodData="ambilData"/>
            </b-modal>

            <b-modal class="font-title" v-model="cekDelete" hide-footer no-close-on-backdrop>
                <template #modal-header="{ close }">
                    <h4 style="color: grey">Confirm Deletion Data</h4>
                </template>
                <img src="../../aset/confirmDel.png" style="width: 90%; display: flex; justify-content: center; margin-left: 5%"/>
                <b-overlay :show="notFinish" style="display: flex; justify-content: flex-end; width: 100%">
                    <b-button id="noDelete" size="sm" variant="outline-info" style="margin-right: 2%" @click="confirmDeletion(2)">Cancel</b-button>
                    <b-button id="doDelete" size="sm" variant="danger" @click="confirmDeletion(1)">Delete</b-button>
                </b-overlay>
            </b-modal>

            <div class="container-fluid" style="width: 80%">
                <div @click="toAddNewProduct" class="mt-2" style="display: flex; justify-content: right; align-items: right;">
                    <p class="mt-2" style="color: #31A2CB;">Add New Product</p>
                    <b-icon style="width: 5vw; height: 5vh;" icon="plus-square-fill" variant="info"></b-icon>
                </div>

                <div style="display: flex; jusitfy-content: center; align-items: center; width: 100%"> <!-- row-cols-5 --> <!-- v-for="(p, index) in products" :key="index" -->
                    <div class="row mb-4">
                        <div v-for="(d, index) in dataProducts" :key="index" class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
                            <b-card @click="showModal(d.id)" bg-variant="light" :img-src="d.product_images.url[0]" img-alt="Image" img-top footer-tag="footer" style="cursor: pointer; max-width: 15rem; border-radius: 10px;" class="mb-2 mt-5">
                                <p style="height: 3.5rem; font-family: 'Poppins', sans-serif; font-size: 15px">{{ d.product_name }}</p>
                                <b-card-text style="color: darkgrey; margin-bottom: 0px; font-size: 12px;"><del>Rp {{ d.price }}</del></b-card-text>
                                <b-card-text style="color: #31A2CB; font-weight: bold; font-size: 18px">Rp {{ d.product_special_price}}</b-card-text>

                                <div class="row d-flex justify-content-center mb-auto">
                                    <b-button size="md" style="margin-right: 2%" variant="info"><b-icon icon="cart"></b-icon></b-button>
                                    <b-button size="md" style="margin-right: 2%" variant="success"><b-icon icon="pencil-square"></b-icon></b-button>           
                                    <b-button size="md" variant="danger" @click="toDeleteProductData(d.id)"><b-icon icon="trash"></b-icon></b-button>   
                                </div>
                            </b-card>
                        </div>
                    </div>
                </div>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import NavbarUsersPage from '~/components/NavbarUsersPage.vue';
    import ProductCarousel from './ProductCarousel.vue';
    import Alert from '~/components/Alert.vue';
    import ProductDetail from './ProductDetail.vue';
    import { ref, computed, getCurrentInstance, onMounted } from "vue";

    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const router = getCurrentInstance().proxy.$router;
    
    const notFinish = ref(false);
    const activeID = ref(0);
    const cekDelete = ref(false);
    const dismissCountDown = ref(0);
    const cek = ref(false);

    const dataProducts = computed(() => $store.getters['products/fetchProduct']);
    const ambilData = computed(() => {
        const a = dataProducts?.value?.filter((item) => item.id == activeID.value) ?? {};
        return (a.length > 0) ? a[0] : {};
    }); 

    const showModal = (id) => {
        cek.value = true;
        activeID.value = id;
    }
    const hideModal = () => {
        cek.value = false;
    }

    const toAddNewProduct = () => {
        router.push({ name: 'inputNewProduct' })
    }

    const confirmDeletion = async(conIn) => {
        if(conIn == 1){
            notFinish.value = true;
            await $store.dispatch('products/deleteProductData', {
                axiosInstance: $axios,
                val: activeID.value
            });

            await $store.dispatch('products/fetchProductData', {
                axiosInstance: $axios
            });
            notFinish.value = false;

            cekDelete.value = false;
            dismissCountDown.value = 1;
        }
        else
            cekDelete.value = false;
    }
    const toDeleteProductData = async(id) => {
        activeID.value = id;
        cekDelete.value = true;
    }

    onMounted(async () => {
        notFinish.value = true;
        await $store.dispatch('products/fetchProductData', {
            axiosInstance: $axios
        });
        notFinish.value = false;
    })
</script>