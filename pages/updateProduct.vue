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

            <b-modal class="font-title" v-model="seeImgPreview" hide-footer>
                <img :src="imgPreview" style="width: 60%; display: flex; justify-content: center; align-items: center; margin: auto"/>
            </b-modal>

            <b-modal class="font-title" v-model="cekUpdate" hide-footer no-close-on-backdrop>
                <template #modal-header="{ close }">
                    <h4 style="color: grey">Confirm Updating Data</h4>
                </template>
                <img src="../aset/confirmDel.png" style="width: 90%; display: flex; justify-content: center; margin-left: 5%"/>
                <b-overlay :show="notFinish" style="display: flex; justify-content: flex-end; width: 100%">
                    <b-button id="noDelete" size="sm" variant="outline-info" style="margin-right: 2%" @click="onSubmit(2)">Cancel</b-button>
                    <b-button id="doDelete" size="sm" variant="danger" @click="onSubmit(1)">Update</b-button>
                </b-overlay>
            </b-modal>
            
            <div class="mt-4 mx-auto" style="width: 80%; height: 80%; display: flex; justify-content: left;">
                <button @click="toPrev" class="mb-2 btn btn-info"><b-icon icon="arrow-left-short" class="mr-1 ml-0"></b-icon>Back</button>
            </div>

            <div class="mb-4 mx-auto" style="width: 81%; height: 81%; justify-content: center;">
                <ValidationObserver ref="form" v-slot="{ invalid, validate }">
                    <b-form id="productForm" name="productForm" class="px-2" @submit.prevent="validate().then(toUpdateProductData())">                      
                        <b-card no-body>
                            <b-tabs v-model="tabIndex" active-nav-item-class="font-weight-bold" pills card vertical>
                                <b-tab title="Product Details" title-link-class="bg-light text-info" active>
                                    <b-card-text>
                                        <div class="row">
                                            <ValidationProvider class="col-lg-4 col-md-6 col-sm-12"  rules="required|numeric" v-slot="{ errors }">
                                                <b-input-group class="mb-3">            
                                                    <label for="product_id" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product ID</label>
                                                    <b-input-group-prepend class="w-100">
                                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                        <input disabled class="shadow-none form-control" v-model="product_ids" name="product_id" id="product_id" style="border-radius: 0 10px 10px 0;"/>
                                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    </b-input-group-prepend>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-lg-4 col-md-6 col-sm-12"  rules="required|alpha_num" v-slot="{ errors }">
                                                <b-input-group class="mb-3">            
                                                    <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product SKU</label>
                                                    <b-input-group-prepend class="w-100">
                                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                        <input disabled class="shadow-none form-control" v-model="product_skus" name="product_sku" id="product_sku" style="border-radius: 0 10px 10px 0;"/>
                                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    </b-input-group-prepend>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-lg-4 col-md-6 col-sm-12"  rules="required|min:5|max:100" v-slot="{ errors }">
                                                <b-input-group class="mb-3">            
                                                    <label for="product_name" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Name</label>
                                                    <b-input-group-prepend class="w-100">
                                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                        <input class="shadow-none form-control" v-model="product_names" name="product_name" id="product_name" style="border-radius: 0 10px 10px 0;"/>
                                                    </b-input-group-prepend>
                                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                </b-input-group>
                                            </ValidationProvider>
                            
                                            <ValidationProvider class="col-lg-6 col-md-6 col-sm-12" rules="required|url" v-slot="{ errors }">
                                                <b-input-group class="mb-3">            
                                                    <label for="product_images" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Image (CDN)</label>
                                                    <b-input-group-prepend class="w-100">
                                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                        <input class="shadow-none form-control" v-model="product_imagess" name="product_images" id="product_images" style="border-radius: 0 10px 10px 0;"/>
                                                    </b-input-group-prepend>
                                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    <p v-else-if="cekImg" style="color: gray; font-size: 10pt; cursor: pointer" @click="toImgPreview">Click Here to See the Picture Preview</p>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-lg-6 col-md-6 col-sm-12" rules="required|numeric" v-slot="{ errors }">
                                                <b-input-group class="mb-3">            
                                                    <label for="product_stocks" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Stock</label>
                                                    <b-input-group-prepend class="w-100">
                                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                        <input class="shadow-none form-control" v-model="product_stocks" name="product_stocks" id="product_stocks" style="border-radius: 0 10px 10px 0;"/>
                                                    </b-input-group-prepend>
                                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-12" rules="required|min:250|max:1000" v-slot="{ errors }">
                                                <b-input-group class="mb-3">            
                                                    <label for="product_desc" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Description</label>
                                                    <b-input-group-prepend class="w-100">
                                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                        <textarea rows="4" v-model="product_descs" id="product_desc" name="product_desc" style="border-radius: 0 10px 10px 0; width: 100%; outline-color: blue;"></textarea>
                                                    </b-input-group-prepend>
                                                    <span class="red" v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    <span v-else style="color: gray; font-size: 10pt">{{ cekLength }}/1000 Characters</span>
                                                </b-input-group>
                                            </ValidationProvider>
                                        </div>
                                    </b-card-text>
                                </b-tab>

                                <b-tab title="Product Prices" title-link-class="bg-light text-info">
                                    <b-card-text>
                                        <div class="row">
                                            <div class="col-6">
                                                <ValidationProvider class="col-lg-4 col-md-4 col-sm-12 p-0" rules="required|numeric" v-slot="{ errors }">
                                                    <b-input-group class="mb-3">            
                                                        <label for="price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Price</label>
                                                        <b-input-group-prepend class="w-100">
                                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                            <input class="shadow-none form-control" v-model="prices" name="price" id="price" style="border-radius: 0 10px 10px 0;"/>
                                                        </b-input-group-prepend>
                                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    </b-input-group>
                                                </ValidationProvider>

                                                <ValidationProvider class="col-lg-4 col-md-4 col-sm-12 p-0" rules="required|numeric" v-slot="{ errors }">
                                                    <b-input-group class="mb-3">            
                                                        <label for="product_special_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Special Price</label>
                                                        <b-input-group-prepend class="w-100">
                                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                            <input class="shadow-none form-control" v-model="product_special_prices" name="product_special_price" id="product_special_price" style="border-radius: 0 10px 10px 0;"/>
                                                        </b-input-group-prepend>
                                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    </b-input-group>
                                                </ValidationProvider>

                                                <ValidationProvider class="col-lg-4 col-md-4 col-sm-12 p-0" rules="required|numeric" v-slot="{ errors }">
                                                    <b-input-group class="mb-3">            
                                                        <label for="product_alfagift_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Alfagift Price</label>
                                                        <b-input-group-prepend class="w-100">
                                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                                            <input class="shadow-none form-control" v-model="product_alfagift_prices" name="product_alfagift_price" id="product_alfagift_price" style="border-radius: 0 10px 10px 0;"/>
                                                        </b-input-group-prepend>
                                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                    </b-input-group>
                                                </ValidationProvider>
                                            </div>
                                            <div class="col-6">
                                                <section v-if="product_special_prices < prices">
                                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                                        <label for="product_special_price_froms" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount Start Date</label>
                                                        <b-form-datepicker id="dateFrom" :min="date" :max="dateMax" v-model="product_special_price_froms" style="border-radius: 10px;">
                                                            <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                        </b-form-datepicker>
                                                    </ValidationProvider>

                                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                                        <label for="product_special_price_tos" class="w-100 mt-3" style="font-family: 'Lato', 'sans-serif';">Discount End Date</label>
                                                        <b-form-datepicker id="dateTo" :min="date" v-model="product_special_price_tos" style="border-radius: 10px;">
                                                            <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                                        </b-form-datepicker>
                                                    </ValidationProvider>
                                                </section>
                                            </div>
                                        </div>
                                    </b-card-text>
                                </b-tab>

                                <b-tab title="Other Informations" title-link-class="bg-light text-info">
                                    <b-card-text>
                                        <div class="row">
                                            <ValidationProvider class="col-lg-6 col-md-6 col-sm-12" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <label for="product_category" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Category</label>
                                                    <b-form-select v-model="product_categorys" :options="catOptions" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-lg-6 col-md-6 col-sm-12" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <label for="product_sub_categorys" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Sub Category</label>
                                                    <b-form-select v-if="product_categorys === '1'" v-model="product_sub_categorys" :options="subCatOptions1" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                                    <b-form-select v-else-if="product_categorys === '2'" v-model="product_sub_categorys" :options="subCatOptions2" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-lg-3 col-md-4 col-sm-6" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <b-form-group for="statuss" label="Status" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                                        <b-form-radio-group v-model="statuss" :options="statusOptions" :aria-describedby="statuss" id="statuss" name="statuss" stacked></b-form-radio-group>
                                                    </b-form-group>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <ValidationProvider class="col-lg-3 col-md-4 col-sm-6" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <b-form-group for="is_alfa_products" label="Alfa Product" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                                        <b-form-radio-group v-model="is_alfa_products" :options="ynOptions" :aria-describedby="is_alfa_products" id="is_alfa_products" name="is_alfa_products" stacked></b-form-radio-group>
                                                    </b-form-group>
                                                </b-input-group>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider class="col-lg-3 col-md-4 col-sm-6" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <b-form-group for="alfagift_platforms" label="Exists In Alfagift" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                                        <b-form-radio-group v-model="alfagift_platforms" :options="ynOptions" :aria-describedby="alfagift_platforms" id="alfagift_platforms" name="alfagift_platforms" stacked></b-form-radio-group>
                                                    </b-form-group>
                                                </b-input-group>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider class="col-lg-3 col-md-4 col-sm-6" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <b-form-group for="product_pickup_availabilitys" label="Pickup Availability" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                                        <b-form-radio-group v-model="product_pickup_availabilitys" :options="ynOptions" :aria-describedby="product_pickup_availabilitys" id="product_pickup_availabilitys" name="product_pickup_availabilitys" stacked></b-form-radio-group>
                                                    </b-form-group>
                                                </b-input-group>
                                            </ValidationProvider>
                                            
                                            <ValidationProvider class="col-lg-3 col-md-4 col-sm-6" rules="required">
                                                <b-input-group class="mb-3">   
                                                    <b-form-group for="product_is_groceriess" label="Is Groceries" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                                        <b-form-radio-group v-model="product_is_groceriess" :options="ynOptions" :aria-describedby="product_is_groceriess" id="product_is_groceriess" name="product_is_groceriess" stacked></b-form-radio-group>
                                                    </b-form-group>
                                                </b-input-group>
                                            </ValidationProvider>

                                            <input type="hidden" v-model="product_visibility_pdps" value="296" />

                                            <b-button v-if="!invalid" block type="submit" class="mt-3" variant="outline-info" style="border-radius: 10px; margin: auto">Update Product</b-button>
                                            <b-button v-else disabled block type="submit" class="mt-3" variant="outline-info" style="border-radius: 10px; margin: auto">Update Product</b-button>
                                        </div>
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                        
                        <b-button-group class="mt-2" style="width: 100%;">
                            <div class="col-6 ml-0" style="padding-left: 0pt">
                                <b-button v-if="tabIndex !== 0" @click="tabIndex--">Previous</b-button>
                            </div>
                            <div class="col-6" style="display: flex; justify-content: right; align-items: right; padding-right: 0pt">
                                <b-button v-if="tabIndex !== 2" @click="tabIndex++">Next</b-button>
                            </div>
                        </b-button-group>
                    </b-form>
                </ValidationObserver>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import { ref, getCurrentInstance, computed, onMounted, watch } from 'vue';
    import NavbarUsersPage from '../components/NavbarUsersPage.vue';
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const router = getCurrentInstance().proxy.$router;
    const route = getCurrentInstance().proxy.$route;
    const notFinish = ref(false);
    const dismissCountDown = ref(0);
    const cekUpdate = ref(false);
    const tabIndex = ref(0);
    const cekImg = ref(true);
    const seeImgPreview = ref(false);
    
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
    const product_stocks = ref(ambilData.value.product_stock);
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
    const date = new Date();
    const cekLength = ref(product_descs.value.length);
    const imgPreview = ref(product_imagess.value);

    const dateMax = computed(() => {
        if(product_special_price_tos.value !== ""){
            const t = new Date(product_special_price_tos.value);
            t.setDate(t.getDate());
            return t;
        }
    })

    const catOptions = ref([
        { value: null, text: 'Choose Product Category' },
        { value: '1', text: 'Foods' },
        { value: '2', text: 'Beverages' }
    ])

    const subCatOptions1 = ref([
        { value: null, text: 'Choose Product Sub Category' },
        { value: '1', text: 'Ready Meals' },
        { value: '2', text: 'Snacks' }
    ])
    const subCatOptions2 = ref([
        { value: null, text: 'Choose Product Sub Category' },
        { value: '3', text: 'Milk/ Yogurt' },
        { value: '4', text: 'Coffee/ Tea' },
        { value: '5', text: 'Energy Booster' }
    ])

    const statusOptions = ref([
        { text: 'Active', value: '1' },
        { text: 'Inactive', value: '0' }
    ])

    const ynOptions = ref([
          { text: 'Yes', value: '1' },
          { text: 'No', value: '0' }
    ])

    const toImgPreview = () => {
        seeImgPreview.value = true;
    }

    const toUpdateProductData = () => {
        cekUpdate.value = true;
    }
    const onSubmit = async (type) => {
        if(type == 1){
            notFinish.value = true;

            if(product_special_prices.value >= prices.value){
                product_special_price_froms.value = "";
                product_special_price_tos.value = "";
            }

            await $store.dispatch("products/updateProductData", {
                axiosInstance: $axios,
                val: {
                    id: id.value,
                    product_id: product_ids.value,
                    product_sku: product_skus.value,
                    product_name: product_names.value,
                    product_desc: product_descs.value,
                    product_stock: product_stocks.value,
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
            }
            else
                dismissCountDown.value = -1;
        }
        else
            cekUpdate.value = false;
    }
    const requestStatus = computed(() => $store.getters['products/updateStatus']);

    onMounted(async () => {
        notFinish.value = true;
        await $store.dispatch('products/fetchProductData', {
            axiosInstance: $axios
        });
        notFinish.value = false;
    })

    const toPrev = () => {
        router.push({ name: 'product' });
    }

    watch(product_descs, (val) => {
        cekLength.value = val.length;
    })

    watch(product_imagess, (val) => {
        if(val){
            cekImg.value = true;
            imgPreview.value = val;
        }
        else{
            cekImg.value = false;
            imgPreview.value = "";
        }
    })
</script>