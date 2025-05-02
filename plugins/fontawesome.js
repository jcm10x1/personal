// For Nuxt 3
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faGithubAlt,
	faLinkedin,
	faLinkedinIn,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
	faCheck,
	faEnvelope,
	faLink,
	faMoon,
	faPalette,
	faPrint,
	faSun,
	faTrash,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
	faMoon,
	faSun,
	faXTwitter,
	faCheck,
	faX,
	faTrash,
	faPalette,
	faGithub,
	faLinkedin,
	faLinkedinIn,
	faGithubAlt,
	faEnvelope,
	faPrint,
	faLink
);

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
