// Lazy-loaded components
import useJokesStore from "../application/jokes.store.js";

const homePage = () => import('./components/home-page.vue');
const testItem = () => import('./components/test-page.vue');

/**
 * Routes for the Jokes bounded context.
 * Includes home page and test management views.
 */

const jokesRoutes = [
    { path: '', name: 'jokes-home', component: homePage, meta: {title: "home"}},
    { path: 'test', name:'jokes-test', component: testItem, meta: { title: 'test' }, beforeEnter: (to, from) =>{
            const store = useJokesStore();

            if (!store.jokeTest) {
                return '/jokes';
            }
        }
    }
]

export default jokesRoutes;

