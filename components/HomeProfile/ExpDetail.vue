<template>
    <fragment>
        <div id="expDetail" class = "row black padding-32">
            <div class="center padding-32" style="color:white; text-align: left; margin: auto; width: 80%">
                <h2 class="col-12 center">Experience Details</h2>
                <table style="margin-top: 3%">
                    <thead>
                        <tr style="text-align: center;">
                            <th>No. </th>
                            <th>Work Places </th>
                            <th>Jobs </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in detailExp">
                            <td data-label = "No. " style="text-align: center;">{{ index+1 }}</td>
                            <td data-label = "Work Place " style="text-align: left; padding-left: 3%">{{ item.company }}</td>
                            <td data-label = "Job " style="text-align: left; padding-left: 3%">{{ item.title }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </fragment>
</template>

<style lang="css" scoped>
    @import '~/style.css';
</style>

<script setup>
    import { ref } from "vue";

    const detailExp = ref(
        [{
            title: 'Web Developer Intern',
            company: 'Global Loyalty Indonesia'
        }, {
            title: 'Sekretaris dan Bendahara 1',
            company: 'Himpunan Mahasiswa Informatika (HMIF) UMN',
        }, {
            title: 'System Analyst & Web Developer',
            company: 'PT Multimedia Digital Nusantara',
        }, {
            title: 'Back End Developer',
            company: 'Puskesmas Kelapa Dua',
        }, {
            title: 'Asisten Laboratorium',
            company: 'Program Studi Informatika UMN',
        }, {
            title: 'Malam Ekspresi Mahasiswa (MAXIMA) 2022',
            company: 'Anggota Divisi Back End Developer'
        }, {
            title: 'BIOS 2021',
            company: 'Wakil Koordinator Divisi Dana'
        }, {
            title: 'Perkenalan Program Studi Informatika UMN 2021',
            company: 'Anggota Divisi Person In Charge (PIC)',
        }]
    );
</script>