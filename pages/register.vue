<template>
    <fragment>
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Registration Page</title>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>

        <body>
            <RegistrationForm />
        </body>
    </fragment>
</template>

<style lang="css" scoped>
    @import '~/style2.css';
</style>

<script setup>
    import RegistrationForm from '~/components/Register/RegistrationForm.vue';
</script>

<!--
    json-server --watch db.json --port 8080
    json-server-auth --watch db.json
-->