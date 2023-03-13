<template>
    <div class="mx-auto" style="width: 70%; overflow-y: hidden">
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
            <b-carousel-slide caption="Welcome to Products Page" img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLl5XK7zQqreC6Z4AFX3RcN3QMTffeugrkCQ&usqp=CAU"></b-carousel-slide>
            <b-carousel-slide img-src="https://www.bca.co.id/-/media/Feature/Promo/Page/2021/09/20210930-alfagift-banner.jpeg"></b-carousel-slide>
            <b-carousel-slide img-src="https://alfamart.co.id/storage/page/September2022/HTtnfDCGOvSXH5MVlWl5.jpg"></b-carousel-slide>
    
            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide>
                <template #img>
                    <img class="d-block img-fluid w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5sooy3_sunKwhmILttXEKvCpX_lV8MokvXw&usqp=CAU" alt="image slot">
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