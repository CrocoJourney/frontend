<template>
        <div class="col-md-5 mx-auto text-center">
            <h1>Compte de {{ this.user.firstname  }} {{ this.user.lastname }} </h1>
            <img :src="this.source" class="img-thumbnail rounded w-25 h-25" alt="Photo de profil" />
            <a v-if="this.user.car">
                <h3>détient une voiture</h3>
            </a>
            <a v-else>
                <h3>ne détient pas de voiture</h3>
            </a>
            <div><h4> moyenne de l'individu : {{ this.moyenne.avg }} / 5</h4></div>

        </div>
</template>

<script>
import { defineComponent } from 'vue'
import API from "../scripts/API.js"
export default defineComponent({
    name: 'History',
    async mounted() {
        this.getUser();
    },
    data() {
        return {
            user:"",
            moyenne:"",
            source:""
        }
    },
    methods: {
        async getUser() {
            this.user = await API.requestLogged(API.METHOD.GET, '/users/'+this.$route.params.id, undefined, undefined);
            this.moyenne = await API.requestLogged(API.METHOD.GET, '/reviews/'+this.$route.params.id, undefined, undefined);
            this.source = API.API_URL + '/static/pictures/' + (this.user.photoPath ?? 'default.png')
        }
    }
})
</script>