import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import {
    required,
    numeric,
    alpha_num
} from 'vee-validate/dist/rules'

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

extend('required', {
    ...required,
    message: 'This field is required'
});

extend('numeric', {
    ...numeric,
    message: 'Input can only be numeric'
})

extend('alpha_num', {
    ...alpha_num,
    message: 'Input can only be alphanumeric'
})

extend('min', {
    params: ['length'],
    validate(value, { length }) {
        return value.length >= length;
    },
    message: 'Input must be at minimum of {length} characters'
})

extend('max', {
    params: ['length'],
    validate(value, { length }) {
        return value.length <= length;
    },
    message: 'Input can only be at maximum of {length} characters'
})

extend('url', {
    validate(value) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value);
    },
    message: 'Input must be a valid URL'
})