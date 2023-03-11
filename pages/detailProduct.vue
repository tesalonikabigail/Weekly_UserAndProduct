<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />

            <div style="width: 80%;">
                <b-card no-body style="display: flex; justify-content: center; margin: auto; height: 80%">
                    <b-tabs active-nav-item-class="font-weight-bold" pills card vertical>
                        <b-tab title="Product Details" title-link-class="bg-light text-info" active><b-card-text><img :src="product_imagess"/> {{ product_descs }}</b-card-text></b-tab>
                        <b-tab title="Product Prices" title-link-class="bg-light text-info" ><b-card-text>Tab contents 2</b-card-text></b-tab>
                        <b-tab title="Other Informations" title-link-class="bg-light text-info" ><b-card-text>Tab contents 3</b-card-text></b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import { ref, getCurrentInstance, computed, onMounted } from "vue";
    import NavbarUsersPage from "../components/NavbarUsersPage.vue";
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const router = getCurrentInstance().proxy.$router;
    const route = getCurrentInstance().proxy.$route;
    const notFinish = ref(false);

    const dataProducts = computed(() => $store.getters['products/fetchProduct']);
    const ambilData = computed(() => {
        const a = dataProducts?.value?.filter((item) => item.id == id.value) ?? {};
        return (a.length > 0) ? a[0] : {};
    });

    const id = ref(route.params.id);
    const product_ids = ref(ambilData.value.product_id);
    const product_skus = ref(ambilData.value.product_sku);
    const product_names = ref(ambilData.value.product_name);
    const product_descs = ref(ambilData.value.product_desc);
    const statuss = ref(ambilData.value.status);
    const is_alfa_products = ref(ambilData.value.is_alfa_product);
    const prices = ref(ambilData.value.price);
    const product_special_prices = ref(ambilData.value.product_special_price);
    const product_special_price_tos = ref(ambilData.value.product_special_price_to);
    const product_special_price_froms = ref(ambilData.value.product_special_price_from);
    const product_alfagift_prices = ref(ambilData.value.product_alfagift_price);
    const product_imagess = ref(ambilData.value.product_images.url[0]);
    const alfagift_platforms = ref(ambilData.value.alfagift_platform);
    const product_pickup_availabilitys = ref(ambilData.value.product_pickup_availability);
    const product_is_groceriess = ref(ambilData.value.product_is_groceries);
    const product_visibility_pdps = ref(ambilData.value.product_visibility_pdp);
    const product_categorys = ref(ambilData.value.product_category);
    const product_sub_categorys = ref(ambilData.value.product_sub_category);

    onMounted(async () => {
        notFinish.value = true;
        await $store.dispatch('products/fetchProductData', {
            axiosInstance: $axios
        });
        notFinish.value = false;
    })
</script>