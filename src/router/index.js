import { createRouter, createWebHistory } from "vue-router";
import Hello from "@/components/Hello.vue";
import InputsContainer from "@/components/searchmethods/InputsContainer.vue";
import InputCountContainer from "@/components/searchmethods/InputCountContainer.vue";
import InputDateContainer from "@/components/searchmethods/InputDateContainer.vue";
import InputPeriodContainer from "@/components/searchmethods/InputPeriodContainer.vue";
import InputVideoContainer from "@/components/searchmethods/InputVideoContainer.vue";
import ItemDescription from "@/components/ItemDescription.vue";
import SignUpUser from "@/components/forms/SignUpUser.vue";
import LoginUser from "@/components/forms/LoginUser.vue";
import ProfileUser from "@/components/forms/ProfileUser.vue";


// 2. Визначення деяких маршрутів
// Кожен маршрут має бути прив'язаний до компонента.
const routes = [
    {
        path: '/', 
        component: Hello, 
        children: [
            {
                // InputsContainer буде відрендерений всередині <router-view> компонента Hello
                path: '',
                component: InputsContainer,
            },
        ]
    },
    {
        path: '/random', 
        name: 'random',
        component: InputCountContainer, 
    },
    {
        path: '/by-date', 
        name: 'by-date',
        component: InputDateContainer, 
    },
    {
        path: '/by-time-period', 
        name: 'by-time-period',
        component: InputPeriodContainer, 
    },
    {
        path: '/videos', 
        name: 'videos',
        component: InputVideoContainer, 
    },
    {
        //path: '/item-description',
        path: '/item-description/:title', 
        name: 'item-description',
        component: ItemDescription, 
        //щоб параметр шляху title передавався як props до компонента
        props: true,
    },
    {
        //буде зіставлятися всім маршрутам і буде розміщено в `route.params.pathMatch`
        //і позначаємо параметр pathMatch як опціонально повторюваний, це дозволяє за необхідності перейти прямо до цього маршруту
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: ()=>import('@/components/NotFound.vue')
    },
    {
        path: '/sign-up-user',
        name: 'sign-up-user',
        component: SignUpUser, 
    },
    {
        path: '/login-user',
        name: 'login-user',
        component: LoginUser, 
    },
    {
        path: '/profile-user',
        name: 'profile-user',
        component: ProfileUser, 
    },
]

// 3. Створення екземпляра маршрутизатора, передавши параметр `routes`.
const router = createRouter({
    // 4. Реалізація історії для подальшого використання. 
    history: createWebHistory(),
    routes, // скорочено від `routes: routes`
  })

  export default router;