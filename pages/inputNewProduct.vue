<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />

            <section v-if="dismissCountDown > 0">
                <Alert :aType="3"/>
            </section>
            <section v-else-if="dismissCountDown < 0">
                <Alert :aType="4"/>
            </section>

            <div class="mt-4 mb-4" style="width: 80%; justify-content: center; align-items: center; margin: auto">
                <ValidationObserver ref="form" v-slot="{ invalid, validate }">
                    <b-form id="productForm" name="productForm" class="px-2" @submit.prevent="validate().then(onSubmit())">
                        <div class="row">
                            <ValidationProvider class="col-lg-4 col-md-6 col-sm-12" rules="required|numeric" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="product_id" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product ID</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="product_id" name="product_id" id="product_id" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-lg-4 col-md-6 col-sm-12" rules="required|alpha_num" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product SKU</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="product_sku" name="product_sku" id="product_sku" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-lg-4 col-md-12 col-sm-12" rules="required|min:5|max:100" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="product_name" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Name</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="product_name" name="product_name" id="product_name" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-12" rules="required|url" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="product_images" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Image (CDN)</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="product_images" name="product_images" id="product_images" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-12" rules="required|min:250|max:1000" v-slot="{ errors }">
                                <b-input-group class="mb-4">            
                                    <label for="product_desc" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Description</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <textarea rows="4" v-model="product_desc" id="product_desc" name="product_desc" style="border-radius: 0 10px 10px 0; width: 100%; outline-color: blue;"></textarea>
                                    </b-input-group-prepend>
                                    <span class="red" v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-lg-4 col-md-4 col-sm-12" rules="required|numeric" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Price</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="price" name="price" id="price" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-lg-4 col-md-4 col-sm-12" rules="required|numeric" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="product_special_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Price Special Price</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="product_special_price" name="product_special_price" id="product_special_price" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <ValidationProvider class="col-lg-4 col-md-4 col-sm-12" rules="required|numeric" v-slot="{ errors }">
                                <b-input-group class="mb-3">            
                                    <label for="product_alfagift_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Alfagift Price</label>
                                    <b-input-group-prepend class="w-100">
                                        <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                        <input class="shadow-none form-control" v-model="product_alfagift_price" name="product_alfagift_price" id="product_alfagift_price" style="border-radius: 0 10px 10px 0;"/>
                                    </b-input-group-prepend>
                                    <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                </b-input-group>
                            </ValidationProvider>

                            <section class="col-lg-6 col-md-6 col-sm-12" v-if="product_special_price < price">
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <b-input-group class="mb-3">            
                                        <label for="product_special_price_from" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount Start Date</label>
                                        <b-input-group-prepend class="w-100">
                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                            <input class="shadow-none form-control" v-model="product_special_price_from" name="product_special_price_from" id="product_special_price_from" type="date" style="border-radius: 0 10px 10px 0;"/>
                                        </b-input-group-prepend>
                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                    </b-input-group>
                                </ValidationProvider>

                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <b-input-group class="mb-3">            
                                        <label for="product_special_price_to" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount End Date</label>
                                        <b-input-group-prepend class="w-100">
                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                            <input class="shadow-none form-control" v-model="product_special_price_to" name="product_special_price_to" id="product_special_price_to" type="date" style="border-radius: 0 10px 10px 0;"/>
                                        </b-input-group-prepend>
                                        <span v-if="errors && errors.length > 0" style="color: red">{{ errors[0] }}</span>
                                    </b-input-group>
                                </ValidationProvider>
                            </section>
                            <section class="col-lg-6 col-md-6 col-sm-12" v-else>
                                <ValidationProvider>
                                    <b-input-group class="mb-3">            
                                        <label for="product_special_price_from" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount Start Date</label>
                                        <b-input-group-prepend class="w-100">
                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                            <input class="shadow-none form-control" v-model="product_special_price_from" name="product_special_price_from" id="product_special_price_from" type="date" style="border-radius: 0 10px 10px 0;"/>
                                        </b-input-group-prepend>
                                    </b-input-group>
                                </ValidationProvider>

                                <ValidationProvider>
                                    <b-input-group class="mb-3">            
                                        <label for="product_special_price_to" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount End Date</label>
                                        <b-input-group-prepend class="w-100">
                                            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                            <input class="shadow-none form-control" v-model="product_special_price_to" name="product_special_price_to" id="product_special_price_to" type="date" style="border-radius: 0 10px 10px 0;"/>
                                        </b-input-group-prepend>
                                    </b-input-group>
                                </ValidationProvider>
                            </section>
                            
                            <section class="col-lg-6 col-md-6 col-sm-12">
                                <ValidationProvider rules="required">
                                    <b-input-group class="mb-3">   
                                        <label for="product_category" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Category</label>
                                        <b-form-select v-model="product_category" :options="catOptions" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                    </b-input-group>
                                </ValidationProvider>

                                <ValidationProvider rules="required">
                                    <b-input-group class="mb-3">   
                                        <label for="product_sub_category" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Sub Category</label>
                                        <b-form-select v-if="temp === '1'" v-model="product_sub_category" :options="subCatOptions1" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                        <b-form-select v-else-if="temp === '2'" v-model="product_sub_category" :options="subCatOptions2" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                        <b-form-select v-else disabled v-model="product_sub_category" :options="subCatOptions2" style="box-shadow: none; border-radius: 10px"></b-form-select>
                                    </b-input-group>
                                </ValidationProvider>
                            </section>
                            
                            <ValidationProvider class="col-lg-2 col-md-3 col-sm-6" rules="required">
                                <b-input-group class="mb-3">   
                                    <b-form-group for="status" label="Status" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                        <b-form-radio-group v-model="status" :options="statusOptions" :aria-describedby="status" id="status" name="status" stacked></b-form-radio-group>
                                    </b-form-group>
                                </b-input-group>
                            </ValidationProvider>
                            
                            <ValidationProvider class="col-lg-2 col-md-3 col-sm-6" rules="required">
                                <b-input-group class="mb-3">   
                                    <b-form-group for="is_alfa_product" label="Alfa Product" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                        <b-form-radio-group v-model="is_alfa_product" :options="ynOptions" :aria-describedby="is_alfa_product" id="is_alfa_product" name="is_alfa_product" stacked></b-form-radio-group>
                                    </b-form-group>
                                </b-input-group>
                            </ValidationProvider>
                            
                            <ValidationProvider class="col-lg-2 col-md-3 col-sm-6" rules="required">
                                <b-input-group class="mb-3">   
                                    <b-form-group for="alfagift_platform" label="Exists In Alfagift" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                        <b-form-radio-group v-model="alfagift_platform" :options="ynOptions" :aria-describedby="alfagift_platform" id="alfagift_platform" name="alfagift_platform" stacked></b-form-radio-group>
                                    </b-form-group>
                                </b-input-group>
                            </ValidationProvider>
                            
                            <ValidationProvider class="col-lg-2 col-md-3 col-sm-6" rules="required">
                                <b-input-group class="mb-3">   
                                    <b-form-group for="product_pickup_availability" label="Pickup Availability" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                        <b-form-radio-group v-model="product_pickup_availability" :options="ynOptions" :aria-describedby="product_pickup_availability" id="product_pickup_availability" name="product_pickup_availability" stacked></b-form-radio-group>
                                    </b-form-group>
                                </b-input-group>
                            </ValidationProvider>
                            
                            <ValidationProvider class="col-lg-2 col-md-3 col-sm-6" rules="required">
                                <b-input-group class="mb-3">   
                                    <b-form-group for="product_is_groceries" label="Is Groceries" class="w-100" style="font-family: 'Lato', 'sans-serif';">
                                        <b-form-radio-group v-model="product_is_groceries" :options="ynOptions" :aria-describedby="product_is_groceries" id="product_is_groceries" name="product_is_groceries" stacked></b-form-radio-group>
                                    </b-form-group>
                                </b-input-group>
                            </ValidationProvider>
                            
                            <input type="hidden" v-model="product_visibility_pdp" value="296" />

                            <!-- <input type="hidden" v-model="product_sub_category" value="null" /> -->
                            
                            <b-button v-if="!invalid" block type="submit" class="mt-3" variant="outline-info" style="border-radius: 10px; margin: auto">Submit New Product</b-button>
                            <b-button v-else disabled block type="submit" class="mt-3" variant="outline-info" style="border-radius: 10px; margin: auto">Submit New Product</b-button>
                        </div>
                    </b-form>
                </ValidationObserver>
            </div>
        </b-overlay>
    </fragment>
</template>

<script setup>
    import NavbarUsersPage from "../components/NavbarUsersPage.vue";
    import { ref, getCurrentInstance, computed, watch } from "vue";
    import Alert from "../components/Alert.vue";

    const product_id = ref("");
    const product_sku = ref("");
    const product_name = ref("");
    const product_desc = ref("");
    const status = ref("");
    const is_alfa_product = ref("");
    const price = ref("");
    const product_special_price = ref("");
    const product_special_price_to = ref("");
    const product_special_price_from = ref("");
    const product_alfagift_price = ref("");
    const product_images = ref("");
    const alfagift_platform = ref(false);
    const product_pickup_availability = ref("");
    const product_is_groceries = ref("");
    const product_visibility_pdp = ref("");
    const product_category = ref(null);
    const product_sub_category = ref(null);
    const temp = ref("");

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

    const notFinish = ref(false);
    const dismissCountDown = ref(0);
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;
    const router = getCurrentInstance().proxy.$router;

    const onSubmit = async (e) => {
        if(product_special_price.value >= price.value){
            product_special_price_from.value = "";
            product_special_price_to.value = "";
        }
        
        notFinish.value = true;
        await $store.dispatch("products/addProductData", { 
            axiosInstance: $axios,
            val: {
                product_id: product_id.value,
                product_sku: product_sku.value,
                product_name: product_name.value,
                product_desc: product_desc.value,
                status: status.value,
                is_alfa_product: is_alfa_product.value,
                price: price.value,
                product_special_price: product_special_price.value,
                product_special_price_to: product_special_price_to.value,
                product_special_price_from: product_special_price_from.value,
                product_alfagift_price: product_alfagift_price.value,
                product_images: {
                    type: "Base Image",
                    url: [
                        product_images.value
                    ]
                },
                alfagift_platform: alfagift_platform.value,
                product_pickup_availability: product_pickup_availability.value,
                product_is_groceries: product_is_groceries.value,
                product_visibility_pdp: 296, // product_visibility_pdp.value
                product_category: product_category.value,
                product_sub_category: product_sub_category.value
            }
        });
        notFinish.value = false;

        if(requestStatus){
            dismissCountDown.value = 1;
            router.push({ name: "product" });
            // setTimeout(() => window.location.reload(), 1);
        }
        else
            dismissCountDown.value = -1;
    }
    const requestStatus = computed(() => $store.getters['regis/status']);

    watch(product_category, (val) => {
        if(val === "1")
            temp.value = "1";
        else if(val === "2")
            temp.value = "2";
    })
</script>

<!-- 
    <ValidationProvider rules="required">
        <b-input-group class="mb-3">            
            <label for="product_is_groceries" class="w-100" style="font-family: 'Lato', 'sans-serif';">Is Groceries</label>
            <b-input-group class="w-100 row">
                <div class="col-6">
                    <input type="radio" id="sOne" value="1" v-model="product_is_groceries" />
                    <label for="sOne">Yes</label>
                </div>
                <div class="col-6">
                    <input type="radio" id="sTwo" value="0" v-model="product_is_groceries" />
                    <label for="sTwo">No</label>
                </div>
            </b-input-group>
        </b-input-group>
    </ValidationProvider>
-->