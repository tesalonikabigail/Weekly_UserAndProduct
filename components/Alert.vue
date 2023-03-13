<template>
    <fragment>
        <div class="fixed-top mt-5">
            <b-navbar>
                <b-alert :show="dismissCountDown" dismissible fade variant="warning">
                    {{ outMsg }}
                </b-alert>
            </b-navbar>
        </div>
    </fragment>
</template>

<script setup>
    import { forAlert } from "../utils/regisValidation";
    import { ref, getCurrentInstance } from "vue";

    const outMsg = ref("");
    const dismissCountDown = ref(1);
    const props = defineProps(['aType']);
    const router = getCurrentInstance().proxy.$router;

    if(props.aType == 1){
        outMsg.value = forAlert(1, "Updated");
        dismissCountDown.value = 1;
    }
    else if(props.aType == 2){
        outMsg.value = forAlert(1, "Deleted");
        dismissCountDown.value = 3;
    }
    else if(props.aType == 3){
        outMsg.value = forAlert(1, "Added");
        dismissCountDown.value = 2;
    }
    else if(props.aType == 4){
        outMsg.value = forAlert(2, "Inserting");
        dismissCountDown.value = 3;
    }
    else if(props.aType == 5){
        outMsg.value = forAlert(1, "Updated");
        dismissCountDown.value = 3;
        router.push({ name: "product" });
    }
    else if(props.aType == 6){
        outMsg.value = forAlert(2, "Updating");
        dismissCountDown.value = 3;
    }

</script>