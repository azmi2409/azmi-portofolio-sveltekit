import { writable } from "svelte/store";
import Home from '../components/Home/Home.svelte';
import About from '../components/About/About.svelte';
import Portofolio from '../components/Portofolio/Portofolio.svelte';
import Contact from '../components/Contact/Contact.svelte';
import Blog from '../components/Blog/Blog.svelte';

const data = [
    //'Home', 'Biography', 'Portofolio', 'Contact Me', 'Blog'
    {
        name: 'Home',
        path: '/#home',
        component: Home,
        id: 'home',
        intersecting: false,
        element: ''
    },
    {
        name: 'About Me',
        path: '/#about-me',
        component: About,
        id: 'about-me',
        intersecting: false,
        element: ''
    },
    // {
    //     name: 'Portofolio',
    //     path: '/#portofolio',
    //     component: Portofolio,
    //     id: 'portofolio',
    //     intersecting: false,
    //     element: ''
    // },
    // {
    //     name: 'Contact Me',
    //     path: '/#contact',
    //     component: Contact,
    //     id: 'contact',
    //     intersecting: false,
    //     element: ''
    // },
    // {
    //     name: 'Blog',
    //     path: '/#blog',
    //     component: Blog,
    //     id: 'blog',
    //     intersecting: false,
    //     element: ''
    // },
];

export const menus = writable(data);