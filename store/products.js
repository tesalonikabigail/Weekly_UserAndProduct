export const state = () => ({
    data: [], //tdinya {} salah

    inputStatus: false,
    updateStatus: false
})

const API_URL = 'http://localhost:8080';
const API_URL_AUTH = 'http://localhost:8080/660'

export const actions = ({
    async fetchProductData ({ commit }, { axiosInstance }){
        try{
            const res = await axiosInstance.$get(API_URL_AUTH + '/products');
            commit('GET_PRODUCT', res);
        } catch(err){
            console.log(err)
        }
    },
    async addProductData({ commit }, { axiosInstance, val }){
        try{
            await axiosInstance.$post(API_URL_AUTH + '/products', val);
            commit('ADD_PRODUCT', val);
            commit('INPUT_STATUS', true);
        } catch(err){
            console.log(err)
        }
    },
    async updateProductData({ commit }, { axiosInstance, val }){
        try {
            const res = await axiosInstance.$put(`${ API_URL_AUTH }/products/${ val.id }`, val);
            commit('UPDATING_PRODUCT', res);
            commit('UPDATE_STATUS', true);
        } catch (err) {
            commit('UPDATE_STATUS', false);
            console.log(err);
        }
    },
    async deleteProductData({ commit }, { axiosInstance, val }){
        try{
            await axiosInstance.$delete(API_URL_AUTH + `/products/${ val }`, val);
        } catch(err){
            console.log(err)
        }
    }
})

export const mutations = ({
    GET_PRODUCT(state, data){
        state.data = data;
    },
    ADD_PRODUCT(state, data){
        state.data = data;
    },
    INPUT_STATUS(state, data){
        state.inputStatus = data;
    },
    UPDATING_PRODUCT(state, data){
        const idx = state.data.findIndex(item => item.product_id === data.product_id); 
        
        state.data[idx].id = data.id;
        state.data[idx].product_id = data.product_id;
        state.data[idx].product_sku = data.product_sku;
        state.data[idx].product_name = data.product_name;
        state.data[idx].product_desc = data.product_desc;
        state.data[idx].status = data.status;
        state.data[idx].is_alfa_product = data.is_alfa_product;
        state.data[idx].price = data.price;
        state.data[idx].product_special_price = data.product_special_price;
        state.data[idx].product_special_price_to = data.product_special_price_to;
        state.data[idx].product_special_price_from = data.product_special_price_from;
        state.data[idx].product_alfagift_price = data.product_alfagift_price;
        state.data[idx].product_images = {
            type: "Base Image",
            url: [
                data.product_images
            ]
        };
        state.data[idx].alfagift_platform = data.alfagift_platform;
        state.data[idx].product_pickup_availability = data.product_pickup_availability;
        state.data[idx].product_is_groceries = data.product_is_groceries;
        state.data[idx].product_visibility_pdp = data.product_visibility_pdp;
        state.data[idx].product_category = data.product_category;
        state.data[idx].product_sub_category = data.product_sub_category;
    },
    UPDATE_STATUS(state, data){
        state.updateStatus = data;
    }
})

export const getters = ({
    fetchProduct: state => {
        return state.data;
    },
    inputStatus: state => {
        return state.inputStatus;
    },
    updateStatus: state => {
        return state.updateStatus;
    }
})