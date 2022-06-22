import VueOptionsList from "./components/VueOptionsList.vue";

const VueOptionsListPlugin = {
	install(app) {
		app.component("VueOptionsList", VueOptionsList);
	},
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue)
	window.Vue.use(VueOptionsListPlugin);

export default VueOptionsListPlugin;
