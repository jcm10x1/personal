<template>
    <div class="page">
        <h2>About</h2>
        <div v-if="about?.data" v-for="entry in about.data" :key="entry.title">
            <h3>{{ entry.description }}</h3>
            <div v-html="entry.content"></div>
        </div>

        <h2>Projects</h2>
        <div v-if="projects?.data" class="flex flex-col gap-4" @mouseleave="onGroupLeave" @mouseenter="cancelCollapse">
            <Card v-for="(entry, i) in projects.data" :key="'project-' + i" :title="entry.title"
                :description="entry.description" :content="entry.content" :expanded="hoveredCardIndex === i"
                @mouseenter="onCardEnter(i)" @mouseleave="onCardLeave" :ref="el => registerCard(i, el)" />
        </div>

        <h2>Organizations</h2>
        <div v-if="organizations?.data" class="flex flex-col gap-4" @mouseleave="onGroupLeave"
            @mouseenter="cancelCollapse">
            <Card v-for="(entry, i) in organizations.data" :key="'org-' + i" :title="entry.title"
                :description="entry.description" :content="entry.content" :expanded="hoveredCardIndex === i"
                @mouseenter="onCardEnter(i)" @mouseleave="onCardLeave" :ref="el => registerCard(i + 1000, el)" />
        </div>

        <h2>Contact</h2>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const hoveredCardIndex = ref<number | null>(null);
const cardRefs = ref<Record<number, HTMLElement>>({});
let collapseTimeout: ReturnType<typeof setTimeout> | null = null;

// Mouse tracking
const mouse = reactive({ x: 0, y: 0 });

if (process.client) {
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}

const registerCard = (index: number, el: Element | ComponentPublicInstance | null) => {
    const dom = (el as any)?.$el ?? el;
    if (dom instanceof HTMLElement) cardRefs.value[index] = dom;
};

const onCardEnter = (index: number) => {
    if (collapseTimeout) clearTimeout(collapseTimeout);
    hoveredCardIndex.value = index;
};

const onCardLeave = () => {
    collapseTimeout = setTimeout(() => {
        const isHoveringCard = Object.values(cardRefs.value).some((el) => {
            const rect = el.getBoundingClientRect();
            return (
                mouse.x >= rect.left &&
                mouse.x <= rect.right &&
                mouse.y >= rect.top &&
                mouse.y <= rect.bottom
            );
        });

        if (!isHoveringCard) {
            hoveredCardIndex.value = null;
        }
    }, 50); // Short enough to allow next hover to register
};

const onGroupLeave = () => {
    // fallback in case @mouseleave fires but nothing else catches
    onCardLeave();
};

const cancelCollapse = () => {
    if (collapseTimeout) clearTimeout(collapseTimeout);
};

const { data: projects } = await useFetch<any>(
    'https://getcontent-kf6xfyi63a-uc.a.run.app/',
    {
        method: 'GET',
        query: {
            websiteId: 'e2Wdq5afxqCzvl0lGX3g',
            contentGroupId: 'VISQ67cdXcB9rh8IQqL6',
        },
        key: Date.now().toString() + 'projects',
    }
);

const { data: about } = await useFetch<any>(
    'https://getcontent-kf6xfyi63a-uc.a.run.app/',
    {
        method: 'GET',
        query: {
            websiteId: 'e2Wdq5afxqCzvl0lGX3g',
            contentGroupId: 'pTwrUFDK3BFd3mi9Hr9f',
        },
        key: Date.now().toString() + 'about',
    }
);

const { data: organizations } = await useFetch<any>(
    'https://getcontent-kf6xfyi63a-uc.a.run.app/',
    {
        method: 'GET',
        query: {
            websiteId: 'e2Wdq5afxqCzvl0lGX3g',
            contentGroupId: 'ejTrFXNB9ft8wMPGN4cB',
        },
        key: Date.now().toString() + 'organizations',
    }
);
</script>

<style scoped></style>
