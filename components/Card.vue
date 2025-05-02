<template>
    <div class="section flex flex-col gap-3">
        <h3>{{ title }}</h3>
        <h4>{{ description }}</h4>
        <transition name="fade-slide">
            <span v-if="expanded" v-html="displayContent"></span>
        </transition>
        <div class="buttons" v-if="links.length && expanded">
            <button class="btn" v-for="(link, index) in links" :key="index" @click="openLink(link.url)">
                <font-awesome-icon :icon="getLinkIcon(link.label)" class="mr-2" />
                {{ capitalizeFirstLetter(link.label) }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    title: string;
    description: string;
    content: string;
    expanded: boolean;
}>();

const links = ref<{ label: string; url: string }[]>([]);
const displayContent = ref(props.content);

const extractLinks = () => {
    const linkPatterns = {
        website: /[*]website:\s*(https?:\/\/[^\s]+?)(?=\s|$|\<\/p\>)/,
        github: /[*]gh:\s*(https?:\/\/[^\s]+?)(?=\s|$|\<\/p\>)/,
    };

    let contentCopy = props.content;
    for (const [label, pattern] of Object.entries(linkPatterns)) {
        const match = contentCopy.match(pattern);
        if (match) {
            links.value.push({ label, url: match[1] });
            // Remove the matched link from content
            contentCopy = contentCopy.replace(match[0], '');
        }
    }
    displayContent.value = contentCopy;
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getLinkIcon = (label: string) => {
    switch (label) {
        case 'website':
            return 'fa-solid fa-link';
        case 'github':
            return 'fa-brands fa-github';
        default:
            return 'fa-solid fa-link';
    }
};

const openLink = (url: string) => {
    console.log(url);
    window.open(url, '_blank', 'noopener,noreferrer');
};

onMounted(() => {
    extractLinks();
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>