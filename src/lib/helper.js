import { drawerChecked } from '../stores/drawerStore';

export const handleDrawerChecked = (args) => {
    drawerChecked.set(args)
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