<template>
    <fragment>
        <label :for="id" class="w-100" style="font-family: 'Lato', 'sans-serif';">{{ judul }}</label>
        <b-input-group-prepend class="w-100">
            <span class="input-group-text" style="border-radius: 10px 0 0 10px; background-color: white;"><i :class="iconPict"></i></span>
            <input class="shadow-none form-control" :name="id" :id="id" :type="types" style="border-radius: 0 10px 10px 0;" :value="value" 
            @input="updateVal($event.target.value)"/>
        </b-input-group-prepend>
    </fragment>
</template>

<script setup>
    const props = defineProps({
        value: {
            type: String
        },
        judul: {
            type: String,
            required: true
        },
        types: {
            type: String,
            required: true
        },
        iconPict: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(['input']);
    const updateVal = (value) => {
        emit('input', value);
    };    

</script>