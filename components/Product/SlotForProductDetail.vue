<template>
    <fragment>
        <template #product_details>
            <!-- <div class="row">
                <div class="col-6">
                    <img class="img-fluid" :src="img"/>
                </div>
                <div class="col-6">
                    <ul>
                        <li>{{ pID }}</li>
                        <li>{{ pSKU }}</li>
                        <li>{{ pName }}</li>
                    </ul>
                </div>
            </div>
            <p>{{ pDesc }}</p> -->
            <p>Testing</p>
        </template>
    </fragment>
</template>

<script setup>
    const props = defineProps(['img', 'pID', 'pSKU', 'pName', 'pDesc'])
</script>