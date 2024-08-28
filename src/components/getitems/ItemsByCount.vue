<template v-if="itemsByCount.length" >
    <div class="container">
        <h3>Show Items By Count {{ userCount }}</h3>
        <div>
            <v-container>
                <v-row>
                    <v-col v-for="item in itemsByCount" :key="item.id">
                        <ItemCard :item="item" />
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import axiosInstance from "../../../services/axios";

    export default {
        name: 'ItemsByCount',
        props: ['userCount'],
        data() {
            return  {
                itemsByCount: [],
            }
        },
        methods: {
            //запит на безкоштовний API 
            getItemsByCount() {
                let count = this.userCount;
                const API_KEY = "4ZOCEAdAoacmoaJHdEnQeIMDwsxFYAR8V7qYMddQ";
                const API_URL = `planetary/apod?api_key=${API_KEY}&count=${count}&thumbs=True`;

                axiosInstance.get(`/${API_URL}/`)
                .then(response => {
                    this.itemsByCount = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        //щоб цей запит спрацював коли компонент буде загружатися треба звернутися до хукі життєвого циклу
        mounted() {
            this.getItemsByCount();
        }
    }
</script>