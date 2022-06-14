import { drawerChecked } from '../stores/drawerStore';

export const handleDrawerChecked = (args) => {
	drawerChecked.set(args);
};

export function scrollTo(id) {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
}
export function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
