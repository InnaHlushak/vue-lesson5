<template>
    <div class="container" >
        <!-- Створіть маршрут, який використовує динамічний параметр, і виводьте його в компоненті. -->
        <h3> Description: {{ $route.params.title }}</h3>
        <div>
            <v-row>
                <v-col> 
                    <v-btn  color="orange" variant="tonal" @click="redirectToPrevious">Go to the previous </v-btn>
                </v-col>
                <v-col> 
                    <v-btn  color="orange" variant="tonal" @click="redirectToExist">Redirection between routes</v-btn>
                </v-col> 
                <v-col>
                    <v-btn  color="orange" variant="tonal" @click="redirectToNonExist">Go to a non-existent page</v-btn>
                </v-col>
            </v-row>
        </div>
</div>
</template>

<script>
export default {
    name: 'ItemDescription',
    props: ['title'],  //щоб параметр шляху title передавався як props до компонента
    methods: {
        redirectToPrevious() {
            //повернутися до попереднього запису в історії маршрутів
            this.$router.back();
        },
        redirectToExist() {
            //програмне перенаправлення між маршрутами за допомогою this.$router.push.
            this.$router.push({ path: '/by-date', replace: true })
        },
        redirectToNonExist() {
            //перехід на неіснуючий маршрут
            this.$router.push({ path: '/home'})
        }
    }
}
</script>