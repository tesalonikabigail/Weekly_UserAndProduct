<template>
    <fragment>
        <label :for="id" class="w-100" style="font-family: 'Lato', 'sans-serif';">{{ judul }}</label>
        <b-input-group-prepend>
            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><i :class="iconPict"></i></span>
        </b-input-group-prepend>
        <input class="shadow-none form-control" :name="id" :id="id" :type="types" style="border-radius: 0 10px 10px 0;" :value="value" @input="updateVal($event.target.value)"/>
    </fragment>
</template>

<script setup>
    const props = defineProps({
        value: {
            type: [String, Object] //String
        },
        judul : {
            type: String,
            required: true
        },
        iconPict : {
            type: String,
            required: true
        },
        id : {
            type: String,
            required: true
        },
        types: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(['input']); // file ini dipanggil dari RegistrationForm.vue, pke emit krna ngisi value nya di child parentnya ga bkl
    const updateVal = (value) => { // dpt datanya klo ga di emit jadi hrs di emit krna props cmn ngasih dari parent ke child, nah klo dri child
        emit('input', value); // ke parent itu pke nya emit jadi datanya bkl bisa dibalikin di ksh ke depan lgi
    }
</script>