<template>
    <div $attrs class="flex justify-center">
        <button v-if="!showThemePopup" @click="showThemePopup = true" class="btn">
            <font-awesome-icon icon="fa-solid fa-palette" />
        </button>
        <div v-else class="flex flex-col gap-4 section">
            <h2>Theme</h2>
            <button @click="setTheme('system')" class="btn">System</button>
            <button @click="setTheme('dark')" class="btn">Dark</button>
            <button @click="setTheme('light')" class="btn">Light</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LOCAL_STORAGE_KEYS } from '~/constants/local_storage_keys';
import { LocalStorageManager } from '~/utils/local_storage';

const colorMode = useColorMode();
const showThemePopup = ref(false);

onMounted(() => {
    // Check local storage for saved theme preference
    LocalStorageManager.getItem(LOCAL_STORAGE_KEYS.THEME, (savedTheme: string | null) => {
        if (savedTheme) {
            colorMode.preference = savedTheme;
        } else {
            // If no saved preference, use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            colorMode.preference = prefersDark ? 'dark' : 'light';
        }
    });

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (colorMode.preference === 'system') {
            colorMode.preference = e.matches ? 'dark' : 'light';
        }
    });
});

const setTheme = (theme: 'system' | 'dark' | 'light') => {
    colorMode.preference = theme;
    LocalStorageManager.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
    showThemePopup.value = false;
};
</script>

<style scoped></style>
