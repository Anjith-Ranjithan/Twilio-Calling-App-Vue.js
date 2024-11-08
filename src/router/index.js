import Vue from 'vue';
import Router from 'vue-router';
import App from '../App.vue';
import CallingPage from '../components/CallingPage.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: App,
    },
    {
        path: '/calling',
        name: 'CallingPage',
        component: CallingPage,
    },
];

const router = new Router({
    routes,
});

export default router;
