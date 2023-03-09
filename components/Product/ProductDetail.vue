<template>
    <fragment>
        <p><b>{{ data.product_name }}</b></p>
        <div class="row">
            <div class="col-4">
                <section style="display: flex; jusitfy-content: center; align-items: center; ">
                    <img :src="data.product_images.url[0]" style="width: 100%; height: 100%"/>
                </section>
            </div>
            <div class="col-8">
                <p>ID: {{ data.product_id }}</p>
                <p>SKU: {{ data.product_sku }}</p>
            </div>
        </div>
            
        
    </fragment>
</template>

<script setup>
    import { ref } from "vue";

    const props = defineProps(['prodData']);
    const data = ref(props.prodData);
    console.log(data.value)
</script>