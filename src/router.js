import {createRouter, createWebHistory} from "vue-router";
import jokesRoutes from "./jokes/presentation/jokes-routes.js";

const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');


const routes = [
    { path: '/', redirect: '/jokes' },
    { path: '/jokes', name:'jokes', children: jokesRoutes },
    { path: '/:pathMatch(.*)*', name: 'not-found',      component: pageNotFound, meta: { title: 'Page not found' } }
]


/**
 * Vue Router instance for the application.
 * Configures routes for IAM, Publishing, and Shared bounded contexts.
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

router.beforeEach((to) => {
    let baseTitle = 'Chuck Norris Test';
    document.title = `${to.meta["title"]} | ${baseTitle}`;
});

export default router;