<template>
    <fragment>
        <b-overlay :show="notFinish">
            <NavbarUsersPage />

            <div class="mt-4 mb-4" style="width: 80%; display: flex; justify-content: center; align-items: center; margin: auto">
                <ValidationObserver ref="form" v-slot="{ validate }">
                    <b-form id="productForm" name="productForm" class="px-2" @submit.prevent="validate().then(onSubmit())">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <b-input-group class="mb-3">            
                                <label for="product_id" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product ID</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_id" name="product_id" id="product_id" style="border-radius: 0 10px 10px 0;"/>
                                    <!-- <b-form-input class="shadow-none form-control" name="product_id" id="product_id" v-model="product_id"></b-form-input> -->
                                </b-input-group-prepend>
                                <span v-if="errors && errors.length > 0">{{ errors[0] }}</span>
                            </b-input-group>
                        </ValidationProvider>
                    </b-form>
                </ValidationObserver>
            </div>

                    <!-- <form id="productForm" class="px-2" @submit.prevent="onSubmit" method="post">
                        <b-input-group class="mb-2">              
                            <b-input-group class="mb-3">            
                                <label for="product_id" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product ID</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_id" name="product_id" id="product_id" type="number" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product SKU</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_sku" name="product_sku" id="product_sku" type="text" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_name" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Name</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_name" name="product_name" id="product_name" type="text" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>  

                            <b-input-group class="mb-3">            
                                <label for="product_desc" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Description</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <textarea v-model="product_desc" id="product_desc" name="product_desc" style="border-radius: 0 10px 10px 0; width: 100%; outline-color: blue;"></textarea>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Status</label>
                                <b-input-group-prepend class="w-100">
                                    <div class="row" style="width: 100%">
                                        <ul style="list-style-type: none;">
                                            <li>
                                                <input type="radio" id="sOne" value="Active" v-model="status" />
                                                <label for="sOne">Active</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sTwo" value="Inactive" v-model="status" />
                                            <label for="sTwo">Inactive</label>
                                            </li>
                                        </ul>
                                    </div>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_sku" class="w-100" style="font-family: 'Lato', 'sans-serif';">Is Alfa Product</label>
                                <b-input-group-prepend class="w-100">
                                    <div class="row" style="width: 100%">
                                        <ul style="list-style-type: none;">
                                            <li>
                                                <input type="radio" id="sOne" value="Active" v-model="is_alfa_product" />
                                                <label for="sOne">Yes</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sTwo" value="Inactive" v-model="is_alfa_product" />
                                            <label for="sTwo">No</label>
                                            </li>
                                        </ul>
                                    </div>
                                </b-input-group-prepend>
                            </b-input-group>
                            
                            <b-input-group class="mb-3">            
                                <label for="price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Price</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="price" name="price" id="price" type="number" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_special_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Special Price</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_special_price" name="product_special_price" id="product_special_price" type="number" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_special_price_to" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount Start Date</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_special_price_to" name="product_special_price_to" id="product_special_price_to" type="date" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_special_price_from" class="w-100" style="font-family: 'Lato', 'sans-serif';">Discount End Date</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_special_price_from" name="product_special_price_from" id="product_special_price_from" type="date" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_alfagift_price" class="w-100" style="font-family: 'Lato', 'sans-serif';">Alfagift Price</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_alfagift_price" name="product_alfagift_price" id="product_alfagift_price" type="number" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="product_images" class="w-100" style="font-family: 'Lato', 'sans-serif';">Product Image (CDN)</label>
                                <b-input-group-prepend class="w-100">
                                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><b-icon icon="tags-fill"></b-icon></span>
                                    <input class="shadow-none form-control" v-model="product_images" name="product_images" id="product_alfagift_price" type="text" style="border-radius: 0 10px 10px 0;"/>
                                </b-input-group-prepend>
                            </b-input-group>

                            <b-input-group class="mb-3">            
                                <label for="alfagift_platform" class="w-100" style="font-family: 'Lato', 'sans-serif';">Exist In Alfagift Platform</label>
                                <b-input-group-prepend class="w-100">
                                    <div class="row" style="width: 100%">
                                        <ul style="list-style-type: none;">
                                            <li>
                                                <input type="radio" id="sOne" value="Active" v-model="alfagift_platform" />
                                                <label for="sOne">Yes</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sTwo" value="Inactive" v-model="alfagift_platform" />
                                            <label for="sTwo">No</label>
                                            </li>
                                        </ul>
                                    </div>
                                </b-input-group-prepend>
                            </b-input-group>
                            
                            <b-input-group class="mb-3">            
                                <label for="product_pickup_availability" class="w-100" style="font-family: 'Lato', 'sans-serif';">Pickup Availability</label>
                                <b-input-group-prepend class="w-100">
                                    <div class="row" style="width: 100%">
                                        <ul style="list-style-type: none;">
                                            <li>
                                                <input type="radio" id="sOne" value="Active" v-model="product_pickup_availability" />
                                                <label for="sOne">Yes</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sTwo" value="Inactive" v-model="product_pickup_availability" />
                                            <label for="sTwo">No</label>
                                            </li>
                                        </ul>
                                    </div>
                                </b-input-group-prepend>
                            </b-input-group>
                            
                            <b-input-group class="mb-3">            
                                <label for="product_is_groceries" class="w-100" style="font-family: 'Lato', 'sans-serif';">Is Groceries</label>
                                <b-input-group-prepend class="w-100">
                                    <div class="row" style="width: 100%">
                                        <ul style="list-style-type: none;">
                                            <li>
                                                <input type="radio" id="sOne" value="Active" v-model="product_is_groceries" />
                                                <label for="sOne">Yes</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sTwo" value="Inactive" v-model="product_is_groceries" />
                                            <label for="sTwo">No</label>
                                            </li>
                                        </ul>
                                    </div>
                                </b-input-group-prepend>
                            </b-input-group>

                            <input type="hidden" v-model="product_visibility_pdp" value="296" />
                            <input type="hidden" v-model="product_category" value="null" />
                            <input type="hidden" v-model="product_sub_category" value="null" />
                        </b-input-group>

                        <input id="btnSubmit" type="submit" class="btn btn-outline-info" value="Submit" style="width: 100%; margin-top: 1%; border-radius: 10px" />
                    </form> -->

                <!-- <ValidationObserver ref="form" v-slot="{ validate }"> <-- invalid --
                    <b-form name="form" @submit.prevent="validate().then(onSubmit2())">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <b-form-group class='form-group'>
                                <label for="product_id">Product ID</label>
                            </b-form-group>
                            <b-form-input id="product_id" v-model="product_id">
                            </b-form-input>
                            <span v-if="errors && errors.length > 0">
                                {{ errors[0] }}
                            </span>
                        </ValidationProvider>
                    </b-form>
                </ValidationObserver> -->
        </b-overlay>
    </fragment>
</template>

<script setup>
    import NavbarUsersPage from "../components/NavbarUsersPage.vue";
    import { ref, getCurrentInstance } from "vue";

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

    const notFinish = ref(false);
    
    const $root = getCurrentInstance().proxy.$root;
    const $store = $root.$store;
    const $axios = $root.$axios;

    const onSubmit2 = () => {
        alert("test");
    }

    const onSubmit = async () => {
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
                    product_visibility_pdp: product_visibility_pdp.value,
                    product_category: product_category.value,
                    product_sub_category: product_sub_category.value
                }
            });
        notFinish.value = false;
    }
</script>