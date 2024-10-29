<template>
    <div
        class="dark:bg-primary bg-secondary dark:text-secondary text-primary h-screen justify-center items-center text-center flex flex-col gap-2 ">
        <img class="h-1/6 mx-auto" src="" alt="Headshot">
        <h1>Error</h1>
        <h2>Error Code: {{ error.statusCode }}</h2>
        <h3>{{ error.message }}</h3>

        <button class="btn" @click="handleError">Back to Home</button>


    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    error: {
        type: Object,
        required: true
    }
})
const handleError = () => clearError({ redirect: '/' })

</script>

<style scoped>
@import url("https://use.typekit.net/stg1llr.css");

h1,
h2,
h3,
h4 {
    @apply font-bold;
}

h1 {
    @apply text-4xl;
}

h2 {
    @apply text-2xl;
}

h3 {
    @apply text-xl;
}

h4 {
    @apply text-lg;
}

.btn {
    @apply px-4 py-2 rounded-xl text-xl font-semibold;


    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25), -1px -1px 4px 0px rgba(255, 255, 255, 0.25);


}

@media (prefers-color-scheme: dark) {
    .btn {


        box-shadow: 0px 0px 7px rgba(242, 235, 235, 0.70);



    }
}

.btn:hover {
    @apply backlit;
}

.backlit {

    text-shadow: 0px 0px 7px rgba(242, 235, 235, 0.70);
    filter: drop-shadow(0px 0px 7px rgba(242, 235, 235, 0.70));
}
</style>