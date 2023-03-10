import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import {
    required, 
    email,
    alpha_spaces,
    numeric,
    alpha_num
} from 'vee-validate/dist/rules'

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

extend('required', {
    ...required,
    message: 'This field is required'
});