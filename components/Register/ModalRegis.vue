<template>
    <fragment>
        <section v-if="cek">
            <div class="d-block text-center">
                <div class="row">
                    <div class="col-9">
                        <h3 style="color: rgba(144, 0, 0, 0.9); text-align: right; align-items: center;">Registration Failed!</h3> 
                    </div>
                    <div class="col-3">
                        <i class="fa fa-times-circle-o fa-lg" style="color: darkred; margin-top: 12%; margin-right: 75%;"></i>
                    </div>
                </div> <hr>
                <p v-for="e in errorList" style="text-align: left; padding-left: 5%;"> {{ e }} </p>
            </div>
        </section>

        <section v-else>
            <div class="d-block text-center">
                <div class="row">
                    <div class="col-9">
                        <h3 style="color: rgba(0, 143, 90, 0.9); text-align: right; align-items: center;">Registration Successful!</h3>
                    </div>
                    <div class="col-3">
                        <i class="fa fa-check-circle fa-lg" style="color: green; margin-top: 12%; margin-right: 75%;"></i>
                    </div>
                </div><hr>
                <div class="row" style="text-align: left;">
                    <div class="col-2">
                        <i class="fa fa-user fa-md" style="margin-left: 90%"></i>
                    </div>
                    <div class="col-4">
                        <p style="padding-left: 8%;">Full Name </p>
                    </div>
                    <div class="col-6">
                        <p style="padding-left: 2%; font-size: 13pt;">: {{ fName + " " + lName}}</p>
                    </div>
                </div>

                <div class="row" style="text-align: left;">
                    <div class="col-2">
                        <i class="fa fa-envelope fa-md" style="margin-left: 85%"></i>
                    </div>
                    <div class="col-4">
                        <p style="padding-left: 8%;">Email </p>
                    </div>
                    <div class="col-6">
                        <p style="padding-left: 2%; font-size: 13pt;">: {{ email }}</p>
                    </div>
                </div>

                <div class="row" style="text-align: left;">
                    <div class="col-2">
                        <i class="fa fa-phone fa-md" style="margin-left: 90%"></i>
                    </div>
                    <div class="col-4">
                        <p style="padding-left: 8%;">Phone Number </p>
                    </div>
                    <div class="col-6">
                        <p style="padding-left: 2%; font-size: 13pt;">: {{ noHP }}</p>
                    </div>
                </div>

                <RouterLink to='/login' style="text-decoration: none;">
                    <b-button block class="mt-3" variant="outline-success" style="border-radius: 10px; margin: auto">Proceed to Login Page</b-button>
                </RouterLink>
            </div>
        </section>
    </fragment>
</template>

<script setup>
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        cek: {
            type: Boolean,
            required: true
        },
        errorList: {
            type: [Array, String]
        },
        fName: {
            type: String,
            default: ''
        },
        lName: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        noHP: {
            type: String,
            default: ''
        }
    });
</script>