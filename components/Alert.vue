<template>
    <fragment>
        <b-alert :show="dismissCountDown" dismissible fade variant="warning">
            {{ outMsg }}
        </b-alert>
    </fragment>
</template>

<script setup>
    import { forAlert } from "../utils/regisValidation";
    import { ref } from "vue";

    const outMsg = ref("");
    const dismissCountDown = ref(1);
    const props = defineProps(['aType']);

    if(props.aType == 1){
        outMsg.value = forAlert(1);
        dismissCountDown.value = 1;
    }
    else if(props.aType == 2){
        outMsg.value = forAlert(2);
        dismissCountDown.value = 3;
    }

</script>