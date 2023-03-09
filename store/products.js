export const state = () => ({
    data: [], //tdinya {} salah
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
    // create
    // update
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
    }
})

export const getters = ({
    fetchProduct: state => {
        return state.data;
    }
})