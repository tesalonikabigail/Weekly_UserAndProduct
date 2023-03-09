<template>
    <fragment>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Information</title>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>

        <div style="width: 100%; background-color: black; overflow-x: hidden;">
            <Navbar />
            <Introduction />
            <ProfDetail />

            <div id="experience">
                <div class = "center">
                    <h2 class="pt-3">Experiences</h2>
                    <div class = "img-hover-zoom col-lg-12"> 
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/gli.png"/> 
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/hmif.png">
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/umn.png">
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/puskesmas.jpg"/> 
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/umn.png">
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/maxima.jpg">
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/bios.jpg">
                        <img class="img-responsive2" style="width: 256px; height: 256px" src="../aset/perprod.jpg">
                    </div>
                </div>
            </div>

            <ExpDetail />
            <Footer />    
        </div>
    </fragment>
</template>

<style lang="css" scoped>
    @import '~/style.css';
</style>

<script setup>
    import Navbar from '~/components/HomeProfile/Navbar.vue'
    import Introduction from '~/components/HomeProfile/Introduction.vue'
    import ProfDetail from '~/components/HomeProfile/ProfDetail.vue'
    import ExpDetail from '~/components/HomeProfile/ExpDetail.vue'
    import Footer from '~/components/HomeProfile/Footer.vue'
</script>

