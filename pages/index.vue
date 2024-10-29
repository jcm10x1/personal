<template>

    <div class="page">
        <h2>About</h2>
        <div v-if="about && about.data" v-for="entry in about.data">
            <h3>{{ entry.description }}</h3>
            <div v-html="entry.content"></div>
        </div>
        <h2>Projects</h2>
        <h2>Organizations</h2>
        <h2>Contact</h2>
    </div>



</template>

<script setup lang="ts">
const { data: projects } = await useFetch<any>(
    "https://getcontent-kf6xfyi63a-uc.a.run.app/",
    {
        method: "GET",
        query: {
            websiteId: "e2Wdq5afxqCzvl0lGX3g",
            contentGroupId: "VISQ67cdXcB9rh8IQqL6",
        },
        key: Date.now().toString() + "projects",

    }
);
const { data: about } = await useFetch<any>(
    "https://getcontent-kf6xfyi63a-uc.a.run.app/",
    {
        method: "GET",
        query: {
            websiteId: "e2Wdq5afxqCzvl0lGX3g",
            contentGroupId: "pTwrUFDK3BFd3mi9Hr9f",
        },
        key: Date.now().toString() + "about",

    }
);
const { data: organizations } = await useFetch<any>(
    "https://getcontent-kf6xfyi63a-uc.a.run.app/",
    {
        method: "GET",
        query: {
            websiteId: "e2Wdq5afxqCzvl0lGX3g",
            contentGroupId: "VISQ67cdXcB9rh8IQqL6",
        },
        key: Date.now().toString() + "organizations",

    }
);

</script>

<style scoped></style>