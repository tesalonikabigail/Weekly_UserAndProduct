<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />

            <div class="mt-4 mb-4" style="width: 80%; height: 80%; display: flex; justify-content: center; margin: auto;">
                <b-card no-body>
                    <b-tabs active-nav-item-class="font-weight-bold" pills card vertical>
                        <b-tab title="Product Details" title-link-class="bg-light text-info" active>
                            <b-card-text>
                                <!-- product_images, product_id, product_sku, product_name, product_desc -->
                                <!-- price, product_special_price, product_special_price_to, product_special_price_from, product_alfagift_price -->
                                <!-- status, is_alfa_product, alfagift_platform, product_pickup_availability, product_is_groceries, product_visibility_pdp, product_category, product_sub_category -->
                                <!-- <div class="row">
                                    <div class="col-6">
                                        <img class="img-fluid" :src="product_imagess"/>
                                    </div>
                                    <div class="col-6">
                                        <ul>
                                            <li>{{ product_ids }}</li>
                                            <li>{{ product_skus }}</li>
                                            <li>{{ product_names }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <p>{{ product_descs }}</p> -->
                                
                                <!-- <slot name="product_details" :img="product_imagess" :pID="product_ids" :pSKU="product_skus" :pName="product_names" :pDesc="product_descs"></slot> -->
                                
                                <div class="row">
                                    <div class="col-lg-4 col-md-6">
                                        <img class="img-fluid" style="display: flex; justify-content: center; align-items: center" :src="product_imagess"/>
                                    </div>
                                    <div class="col-lg-8 col-md-6 my-auto mx-auto">
                                        <b-input-group class="mb-3">            
                                            <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product ID</label>
                                            <b-input-group-prepend class="w-100 ml-2 mr-2">
                                                <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                <input disabled class="shadow-none form-control" v-model="product_ids" style="border-radius: 0 10px 10px 0;"/>
                                            </b-input-group-prepend>
                                        </b-input-group>

                                        <b-input-group class="mb-3">            
                                            <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product SKU</label>
                                            <b-input-group-prepend class="w-100 ml-2 mr-2">
                                                <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                <input disabled class="shadow-none form-control" v-model="product_skus" style="border-radius: 0 10px 10px 0;"/>
                                            </b-input-group-prepend>
                                        </b-input-group>

                                        <b-input-group class="mb-3">            
                                            <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product Name</label>
                                            <b-input-group-prepend class="w-100 ml-2 mr-2">
                                                <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                <input disabled class="shadow-none form-control" v-model="product_names" style="border-radius: 0 10px 10px 0;"/>
                                            </b-input-group-prepend>
                                        </b-input-group>
                                    </div>
                                </div>
                                <p style="text-align: justify;">{{ product_descs }}</p>
                            </b-card-text>
                        </b-tab>
                        
                        <b-tab title="Product Prices" title-link-class="bg-light text-info" >
                            <b-card-text>
                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Price</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input disabled class="shadow-none form-control" v-model="prices" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product Special Price</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input disabled class="shadow-none form-control" v-model="product_special_prices" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Discount Start Date</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="product_special_price_froms" disabled class="shadow-none form-control" v-model="product_special_price_froms" style="border-radius: 0 10px 10px 0;"/>                                
                                        <input v-else disabled class="shadow-none form-control" value="No Ongoing Discount" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Discount End Date</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="product_special_price_tos" disabled class="shadow-none form-control" v-model="product_special_price_tos" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="No Ongoing Discount" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product Alfagift Price</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input disabled class="shadow-none form-control" v-model="product_alfagift_prices" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </b-card-text>
                        </b-tab>

                        <b-tab title="Other Informations" title-link-class="bg-light text-info" >
                            <b-card-text>
                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Status</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="statuss === 1" disabled class="shadow-none form-control" value="Active" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="Inactive" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Alfamart Product</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="is_alfa_products === 1" disabled class="shadow-none form-control" value="Yes" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="No" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Exist in Alfagift Platform</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="alfagift_platforms === 1" disabled class="shadow-none form-control" value="Yes" style="border-radius: 0 10px 10px 0;"/>                                
                                        <input v-else disabled class="shadow-none form-control" value="No" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Is Product Pickup Available</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="product_pickup_availabilitys === 1" disabled class="shadow-none form-control" value="Yes" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="No" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Is Product Groceries</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="product_is_groceriess === 1" disabled class="shadow-none form-control" value="Yes" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="No" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product Visibility PDP</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input disabled class="shadow-none form-control" v-model="product_visibility_pdps" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product Category</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="product_categorys === '1'" disabled class="shadow-none form-control" value="Foods" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="Beverages" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>

                                <b-input-group class="mb-3">            
                                    <label class="w-100 ml-2 mr-2" style="font-family: 'Lato', 'sans-serif';">Product Sub Category</label>
                                    <b-input-group-prepend class="w-100 ml-2 mr-2">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input v-if="product_sub_categorys" disabled class="shadow-none form-control" v-model="product_sub_categorys" style="border-radius: 0 10px 10px 0;"/>
                                        <input v-else disabled class="shadow-none form-control" value="-" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import { ref, getCurrentInstance, computed, onMounted } from "vue";
    import NavbarUsersPage from "../components/NavbarUsersPage.vue";
    import SlotForProductDetail from "../components/Product/SlotForProductDetail.vue";
    
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