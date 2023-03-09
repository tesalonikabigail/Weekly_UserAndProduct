<template>
    <div>
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
            <b-carousel-slide caption="Welcome to Products Page" img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"></b-carousel-slide>
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
    
            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide>
                <template #img>
                    <img class="d-block img-fluid w-100" width="1024" height="480" src="https://picsum.photos/1024/480/?image=55" alt="image slot">
                </template>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>
  
<script setup>
    import { ref } from "vue";

    const slide = ref(0);
    const sliding = ref(null);

    const onSlideStart = (slide) => {
          sliding.value = true;
    }
    
    const onSlideEnd = (slide) => {
        sliding.value = false;
    }
</script>