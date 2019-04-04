import { environment } from '../config/index'
import Home from '@/app/views/Home.vue'
import NotFound from '@/app/views/NotFound.vue'

const routes = {
    mode: 'history',
    base: environment.url.subdirectory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '*',
            name: '404',
            component: NotFound,
        },
    ],
}

export default routes
