<template>

    <NuxtLoadingIndicator :color="loadingColor" error-color="red" />
    <meta property="og:image" content="/OG_General.png">

    <SchemaOrgWebPage />
    <div class="flex flex-col items-center gap-4 justify-center fixed backdrop-blur-xl p-4 left-0 right-0 top-0 z-50">
        <h1>Jacob Miller</h1>
        <ul class="menu">

            <li class="btn"><button
                    onclick="window.open('https://www.linkedin.com/in/jacob-miller-715b222ba', '_blank')">
                    <font-awesome-icon icon="fa-brands fa-linkedin-in" />
                </button></li>

            <li class="btn"><button onclick="window.open('https://github.com/jcm10x1', '_blank')">
                    <font-awesome-icon icon="fa-brands fa-github" />
                </button></li>
            <li class="btn"><button onclick="window.open('https://x.com/jcm10x1', '_blank')">
                    <font-awesome-icon icon="fa-brands fa-x-twitter" />
                </button></li>
            <ClientOnly>
                <li class="btn">
                    <button :onclick="generateContentPdf">
                        <font-awesome-icon icon="fa-solid fa-print" />
                    </button>
                </li>
            </ClientOnly>

            <li class="btn"><button onclick="window.open('mailto:jmiller@1x1.dev', '_blank')">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                </button></li>


        </ul>

    </div>


    <slot />
    <div class="fixed  right-4 bottom-4">

        <ThemeSwitch :class="{}" />

    </div>


</template>

<script setup lang="ts">
import { generateContentPdf } from '../utils/generate_resume';
const loadingColor = computed(() => {
    return useColorMode().value === 'dark' ? 'white' : 'black';
});



</script>

<style>
:root.dark {
    --background-color: #031600;


}

:root.light {
    --background-color: #FFFFFF;

}

/* ::-webkit-scrollbar {
    width: 0;
    height: 0;
}
 */


body {
    background-color: var(--background-color);
    text-align: center
}

.dark body {
    @apply text-secondary;

}

.menu {
    @apply flex justify-center gap-4 items-center;
}

.menu * {
    z-index: 51;
}





.light body {
    @apply text-primary;
}

.section {

    @apply p-4;
}

.section,
.input {
    @apply rounded-xl;

    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);



}





.light .section,
.light .input,
.dark .warning .section,
.dark .warning .input {
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25), -1px -1px 4px 0px rgba(255, 255, 255, 0.25);

}


.dark .section,
.dark .input {


    box-shadow: 0px 0px 7px rgba(242, 235, 235, 0.70);
}


.inverse {
    @apply bg-secondary text-primary;
}

.btn {
    @apply section font-semibold text-lg;
}

.shrink {
    @apply mx-auto;
    width: fit-content;
}

.secondary-btn {
    @apply text-sm text-blue-500;
}

.btn,
.input {
    @apply px-4 py-2;
}

.btn:hover,
.selected {
    @apply backlit;
}

.light .btn:hover,
.selected {
    @apply text-secondary;
    background-color: black;
}

.btn:disabled {
    @apply bg-gray-400 text-gray-200;
}

.backlit {

    text-shadow: 0px 0px 7px rgba(242, 235, 235, 0.70);
    filter: drop-shadow(0px 0px 7px rgba(242, 235, 235, 0.70));
}

h1,
h2,
h3,
label {
    @apply font-bold;
}

h4 {
    @apply font-medium;
}

h1 {
    @apply text-4xl;
}

h2,
.waitlist-title {
    @apply text-2xl;
}

h3 {
    @apply text-xl;
}

h4 {
    @apply text-lg;
}

.warning {
    @apply text-black bg-warning rounded-xl p-2;
}

select {
    appearance: none;
    -webkit-appearance: none;
    /* For Safari and Chrome */
    -moz-appearance: none;
    /* For Firefox */
    border-right: 8px solid transparent;
    text-align-last: center;
    /* Ensures text is centered in dropdown */
    text-align: center;
    font-size: 1.25rem;
    /* Equivalent to text-xl */
    font-weight: 600;
    /* Equivalent to font-semibold */
    padding: 0.5rem;
    /* Adjust padding as needed */
    width: 100%;
    /* Ensures select takes full width */
    background: transparent;
    border: none;
    /* Optional: adjust border as needed */
    border-radius: 0.5rem;
    /* Optional: adjust border radius as needed */
    line-height: 1.5;
    /* Ensures proper line height */
}


.input {
    @apply focus:outline-none ring-secondary bg-transparent text-center text-xl font-semibold;

}



.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus,
.input:-webkit-autofill:active {

    -webkit-text-fill-color: black !important;

    /* Use a large inset shadow to change background color */
    color: black !important;
    caret-color: black;
    background-color: white !important;

}

.checkbox-wrapper {
    @apply flex justify-center gap-4;
}

.checkbox {
    @apply appearance-none w-8 h-8 rounded-xl flex items-center justify-center;

}

.checkbox:checked::before {
    content: '✓';
    display: flex;
    padding: 4px 0 2px 0;

}

@keyframes flickerAnimation {
    0% {
        opacity: 1;
    }

    10% {
        opacity: 0.3;
    }

    20% {
        opacity: 1;
    }

    30% {
        opacity: 0.5;
    }

    40% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }

    60% {
        opacity: 0.9;
    }

    70% {
        opacity: 0.6;
    }

    80% {
        opacity: 1;
    }

    90% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
}

.flicker {
    animation: flickerAnimation 1s infinite;
}

.page {
    @apply flex flex-col mt-[7.5rem] gap-4 p-4 max-w-7xl mx-auto md:w-5/6 lg:w-4/6;
}

.form {
    @apply flex flex-col gap-4 mx-auto max-w-[30rem] w-full;
}

.formatted-json {
    @apply text-sm font-normal text-left;
    font-family: 'Courier New', Courier, monospace;

    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    white-space: pre;
    /* Allows line wrapping */
    word-wrap: break-word;
    /* Breaks long words */
    overflow-x: auto;
    /* Adds horizontal scroll if needed */
    margin: 6px;
    /* Match existing margins */
}

.dark .formatted-json {
    background-color: rgb(62, 62, 62);
}
</style>
