<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />

            <section v-if="dismissCountDown > 0">
                <Alert :aType="5"/>
            </section>
            <section v-else-if="dismissCountDown < 0">
                <Alert :aType="6"/>
            </section>
            
            <div class="mt-4 mb-4" style="width: 80%; justify-content: center; align-items: center; margin: auto">
                <ValidationObserver ref="form" v-slot="{ invalid, validate }">
                    <b-form id="productForm" name="productForm" class="px-2" @submit.prevent="validate().then(onSubmit())">
                        <ValidationProvider rules="required|numeric" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_id" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product ID</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input disabled class="shadow-none form-control" v-model="product_ids" name="product_id" id="product_id" style="border-radius: 0 10px 10px 0;"/>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group-prepend>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required|alpha_num" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product SKU</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input disabled class="shadow-none form-control" v-model="product_skus" name="product_sku" id="product_sku" style="border-radius: 0 10px 10px 0;"/>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group-prepend>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_name" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Name</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_names" name="product_name" id="product_name" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required|max:1000" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_desc" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Description</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <textarea v-model="product_descs" id="product_desc" name="product_desc" style="border-radius: 0 10px 10px 0; width: 100%; outline-color: blue;"></textarea>
                                </b-input-group-prepend>
                                <span class="red" v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required">
                            <b-input-group class="mb-3">            
                                <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Status</label>
                                <b-input-group class="w-100 row">
                                    <div class="col-6">
                                        <input type="radio" id="sOne" value="1" v-model="statuss" />
                                        <label for="sOne">Active</label>
                                    </div>
                                    <div class="col-6">
                                        <input type="radio" id="sTwo" value="0" v-model="statuss" />
                                        <label for="sTwo">Inactive</label>
                                    </div>
                                </b-input-group>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required">
                            <b-input-group class="mb-3">            
                                <label for="is_alfa_product" class="w-100" style="font-family: 'Lato', 'sans-serif';">Is Alfa Product</label>
                                <b-input-group class="w-100 row">
                                    <div class="col-6">
                                        <input type="radio" id="sOne" value="1" v-model="is_alfa_products" />
                                        <label for="sOne">Yes</label>
                                    </div>
                                    <div class="col-6">
                                        <input type="radio" id="sTwo" value="0" v-model="is_alfa_products" />
                                        <label for="sTwo">No</label>
                                    </div>
                                </b-input-group>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required|numeric" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Price</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="prices" name="price" id="price" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required|numeric" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_special_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Price Special Price</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_special_prices" name="product_special_price" id="product_special_price" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_special_price_from" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount Start Date</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_special_price_froms" name="product_special_price_from" id="product_special_price_from" type="date" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_special_price_to" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount End Date</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_special_price_tos" name="product_special_price_to" id="product_special_price_to" type="date" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required|numeric" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_alfagift_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Alfagift Price</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_alfagift_prices" name="product_alfagift_price" id="product_alfagift_price" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required|url" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_images" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Image (CDN)</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_imagess" name="product_images" id="product_images" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required">
                            <b-input-group class="mb-3">            
                                <label for="alfagift_platform" class="w-100" style="font-family: 'Lato', 'sans-serif';">Exist In Alfagift Platform</label>
                                <b-input-group class="w-100 row">
                                    <div class="col-6">
                                        <input type="radio" id="sOne" value="1" v-model="alfagift_platforms" />
                                        <label for="sOne">Yes</label>
                                    </div>
                                    <div class="col-6">
                                        <input type="radio" id="sTwo" value="0" v-model="alfagift_platforms" />
                                        <label for="sTwo">No</label>
                                    </div>
                                </b-input-group>
                            </b-input-group>
                        </ValidationProvider>

                        <ValidationProvider rules="required">
                            <b-input-group class="mb-3">            
                                <label for="product_pickup_availability" class="w-100" style="font-family: 'Lato', 'sans-serif';">Is Pickup Available</label>
                                <b-input-group class="w-100 row">
                                    <div class="col-6">
                                        <input type="radio" id="sOne" value="1" v-model="product_pickup_availabilitys" />
                                        <label for="sOne">Yes</label>
                                    </div>
                                    <div class="col-6">
                                        <input type="radio" id="sTwo" value="0" v-model="product_pickup_availabilitys" />
                                        <label for="sTwo">No</label>
                                    </div>
                                </b-input-group>
                            </b-input-group>
                        </ValidationProvider>
                        
                        <ValidationProvider rules="required">
                            <b-input-group class="mb-3">            
                                <label for="product_is_groceries" class="w-100" style="font-family: 'Lato', 'sans-serif';">Is Groceries</label>
                                <b-input-group class="w-100 row">
                                    <div class="col-6">
                                        <input type="radio" id="sOne" value="1" v-model="product_is_groceriess" />
                                        <label for="sOne">Yes</label>
                                    </div>
                                    <div class="col-6">
                                        <input type="radio" id="sTwo" value="0" v-model="product_is_groceriess" />
                                        <label for="sTwo">No</label>
                                    </div>
                                </b-input-group>
                            </b-input-group>
                        </ValidationProvider>
                        
                        <input type="hidden" v-model="product_visibility_pdps" value="296" />

                        <ValidationProvider rules="required">
                            <label for="product_category" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Category</label>
                            <b-form-select v-model="product_categorys" :options="catOptions" style="box-shadow: none; border-radius: 10px"></b-form-select>
                        </ValidationProvider>

                        <input type="hidden" v-model="product_sub_categorys" value="null" />

                        <b-button v-if="!invalid" block type="submit" class="mt-3" variant="outline-info" style="border-radius: 10px; margin: auto">Update Product</b-button>
                        <b-button v-else disabled block type="submit" class="mt-3" variant="outline-info" style="border-radius: 10px; margin: auto">Update Product</b-button>
                    </b-form>
                </ValidationObserver>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import { ref, getCurrentInstance, computed, onMounted } from 'vue';
    import NavbarUsersPage from '../components/NavbarUsersPage.vue';
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const router = getCurrentInstance().proxy.$router;
    const route = getCurrentInstance().proxy.$route;
    const notFinish = ref(false);
    const dismissCountDown = ref(0);
    
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

    const catOptions = ref([
        { value: null, text: 'Choose Product Category' },
        { value: '1', text: 'Foods' },
        { value: '2', text: 'Beverages' }
    ])

    const onSubmit = async () => {
        notFinish.value = true;
        await $store.dispatch("products/updateProductData", {
            axiosInstance: $axios,
            val: {
                id: id.value,
                product_id: product_ids.value,
                product_sku: product_skus.value,
                product_name: product_names.value,
                product_desc: product_descs.value,
                status: statuss.value,
                is_alfa_product: is_alfa_products.value,
                price: prices.value,
                product_special_price: product_special_prices.value,
                product_special_price_to: product_special_price_tos.value,
                product_special_price_from: product_special_price_froms.value,
                product_alfagift_price: product_alfagift_prices.value,
                product_images: {
                    type: "Base Image",
                    url: [
                        product_imagess.value
                    ]
                },
                alfagift_platform: alfagift_platforms.value,
                product_pickup_availability: product_pickup_availabilitys.value,
                product_is_groceries: product_is_groceriess.value,
                product_visibility_pdp: product_visibility_pdps.value,
                product_category: product_categorys.value,
                product_sub_category: product_sub_categorys.value
            }
        })
        notFinish.value = false;

        if(requestStatus){
            dismissCountDown.value = 1;
            router.push({ name: "product" });
        }
        else
            dismissCountDown.value = -1;
    }
    const requestStatus = computed(() => $store.getters['products/updateStatus']);

    onMounted(async () => {
        notFinish.value = true;
        await $store.dispatch('products/fetchProductData', {
            axiosInstance: $axios
        });
        notFinish.value = false;
    })
</script>