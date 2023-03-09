<template>
    <fragment>
        <form id="regisForm" class="px-2" @submit.prevent="onSubmit" method="post" style="padding-top: 2%">
            <b-input-group class="mb-3">            
                <label :for="id" class="w-100" style="font-family: 'Lato', 'sans-serif';">{{ judul }}</label>
                <b-input-group-prepend class="w-100">
                    <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><i :class="iconPict"></i></span>
                    <input class="shadow-none form-control" :name="id" :id="id" :type="types" style="border-radius: 0 10px 10px 0;" :value="value" 
                    @input="updateVal($event.target.value)"/>
                </b-input-group-prepend>
            </b-input-group>

            <p v-if="cekErrMsg" style="color: red; text-align: center;">{{ errMsgLogin }}</p>

            <input id="btnSubmit" type="submit" class="btn btn-outline-info" value="Submit" style="width: 100%; margin-top: 1%; border-radius: 10px" />
        </form>
    </fragment>
</template>

<script setup>
    const onSubmit = () => {

    }
</script>