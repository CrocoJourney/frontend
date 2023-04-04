<template>
    <div class="container-fluid">
        <div class="row" style="margin-top: 2%;">
            <figure class="text-center">
                <p class="h1">Les membres du groupe</p>
            </figure>
        </div>

        <div class="row">
            <div class="container-fluid d-flex justify-content-center align-items-center" style="margin-top: 3%;">
                <div class="col-md-8" style="width: 55%; margin-left: 1%; margin-right: 1%;">
                    <div class="scrollable">

                        <div v-if="membres.length == 0" class="card border-success">
                            <h4 class="card-title" style="margin: auto;">Vous n'avez pas encore de membre!</h4>
                        </div>

                        <a v-else>
                            
                            <div>
                                <a v-for="group in this.membres">
                                <div class="card border-success">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-10">
                                                            <div class="col-md-12">
                                                                <h4 class="card-title text-center" style="margin-top: 2%">Nom du membre:
                                                                    {{ group.firstname }}  {{ group.lastname }}</h4>
                                                            </div>
                                                            <div class="container-fluid">

                                                                <div style="margin-top: 3%; margin-bottom: 4%;">
                                                                    <p class="card-text"
                                                                        style="font-size: large;">
                                                                        <span class="fw-bold me-2">•</span>
                                                                        {{ group.mail }}
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="col d-flex justify-content-center align-items-center">
                                                            <button class="btn btn-danger" id="{{group.id}}" @click="supprimer(group.id)">retirer</button>
                                                            <!--<RouterLink to="/login" class="text-decoration-none">Voir</RouterLink>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue'
import API from "../scripts/API.js"
export default defineComponent({
    name: 'History',
    async mounted() {
        this.chercherMembre();
    },
    data() {
        return {
            membres: []
        }
    },
    methods: {
        printId(){
            console.log(this.$route.params.id);
        },
        async chercherMembre(){
            console.log("salut")
            let tmp = await API.requestLogged(API.METHOD.GET, '/groups/'+this.$route.params.id, undefined, undefined);
            this.membres = tmp.friends[0];
            console.log(tmp.friends[0])
            //console.log(tmp.friends[1])
        },
        async supprimer(personne){
            await API.requestLogged(API.METHOD.DELETE, '/groups/'+this.$route.params.id+'/friends/'+personne, undefined, undefined);
            this.chercherMembre();
        }

    }
})
</script>