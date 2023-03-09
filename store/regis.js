import axios from 'axios';

export const state = () => ({
    data: [], //tdinya {} salah
    
    err: "",
    reqStatus: false,
    cekLogin: false,
    modal: false,

    isAuth: localStorage.getItem('isAuth')? JSON.parse(localStorage.getItem('isAuth')) : "",
    token: localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : "",
    dataLogin: localStorage.getItem('dataLogin')? JSON.parse(localStorage.getItem('dataLogin')) : {}
})

const API_URL = 'http://localhost:8080';
const API_URL_AUTH = 'http://localhost:8080/660' // buat semua kecuali login dan regis

export const actions = ({
    // setRegis({ commit }, { fName, lName, email, noHP, pass, conPass }) {
    //     commit('SET_REGIS', { fName, lName, email, noHP, pass, conPass })
    // },
    setErr({ commit },  err ) {
        commit('SET_ERR', err)
    },
    async fetchUserData ({ commit }, { axiosInstance }){
        try{
            const res = await axiosInstance.$get(API_URL_AUTH + '/users');
            commit('GET_DATA', res);`                                                                                                   `
        } catch(err){
            console.log(err);
        }
    },
    // async fetchUserData ({ commit }){
    //     try{
    //         const res = await axios.get(API_URL + '/users');
    //         commit('GET_DATA', res.data);
    //     } catch(err){
    //         console.log(err);
    //     }
    // },
    async inputNewUserData({ commit }, { axiosInstance, val }){
        try{
            const res = await axiosInstance.$post(API_URL + '/register', val);
            commit('SET_REGIS', res);
        } catch(err){
            commit('ERR_MSG', err.response.data);
        }
    },
    async updateUserData({ commit }, { axiosInstance, val }) {
        try {
            const res = await axiosInstance.$put(`${ API_URL }/users/${ val.id }`, val);
            commit('UPDATING_USER', res);
            commit('REQUEST_STATUS', true);
            commit('MODAL_STATUS', true);
        } catch (err) {
            console.log(err);
        }
    },
    async deleteUserData ({ commit }, { axiosInstance, val }) {
        try{
            await axiosInstance.$delete(API_URL_AUTH + `/users/${ val }`, val);
        } catch(err){
            console.log(err);
        }
    },
    async loginUser({ commit }, { axiosInstance, val }){ // interceptors
        try{
            const res = await axiosInstance.$post(API_URL + '/login', val);
            commit('CEK_LOGIN', true);
            commit('LOGIN_SESSION', res.user);
            commit('LOGIN_TOKEN', res.accessToken);
        } catch(err){
            commit('ERR_MSG', err.response.data);
            commit('CEK_LOGIN', false);
        }
    },
    logoutUser({ commit }){
        commit('LOGOUT_USER', false);
    }
})

export const mutations = ({
    SET_REGIS(state, data) {
        state.data = data.user
    },
    GET_DATA(state, data) {
        state.data = data
    },
    SET_ERR(state, err) {
        state.err = err
    },
    UPDATING_USER(state, data) {
        const idx = state.data.findIndex(user => user.id === data.id); // yg user => user.id, si "user" nya itu nama variable nya bebas 
        
        state.data[idx].id = data.id;
        state.data[idx].fName = data.fName;
        state.data[idx].lName = data.lName;
        state.data[idx].email = data.email;
        state.data[idx].noHP = data.noHP;
        state.data[idx].password = data.password;
    },
    REQUEST_STATUS(state, status) {
        state.reqStatus = status;
    },
    ERR_MSG(state, msg){
        state.err = msg;
    },
    CEK_LOGIN(state, cek){
        state.cekLogin = cek;
    },
    LOGIN_SESSION(state, dataUser){
        state.dataLogin = dataUser;
        state.isAuth = true;

        localStorage.setItem('isAuth', true);
        localStorage.setItem('dataLogin', JSON.stringify(dataUser));
    },
    LOGIN_TOKEN(state, token){
        state.token = token;

        localStorage.setItem('token', JSON.stringify(token));
    },
    MODAL_STATUS(state, status){
        state.modal = status;
    },
    LOGOUT_USER(state, status){
        state.isAuth = status;
    }
})

export const getters = ({
    errStg: state => {
        return state.err; 
    },
    fetchUser: state => {
        return state.data;
    },
    status: state => {
        return state.reqStatus;
    },
    errMsgLogin: state => {
        return state.err;
    },
    cekLogin: state => {
        return state.cekLogin;
    },
    modalStatus: state => {
        return state.modal;
    },
    dataLogin: state => {
        return state.dataLogin;
    },
    loginToken: state => {
        return state.token;
    }
})