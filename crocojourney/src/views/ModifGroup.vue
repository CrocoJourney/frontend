<template>
    <div class="container-fluid">
        <div class="row" style="margin-top: 2%;">
            <figure class="text-center">
                <p class="h1">Les membres du groupe</p>
            </figure>
        </div>
        
        <!-- Button trigger modal -->
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="open">
            Ajouter Membre
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ajout de membre</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input ref="rechercheAmis" type="text" @keyup="completer"> 


                    <div>
                                <a v-for="group in this.rechercheTMP">
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
                                                            <button class="btn btn-success" id="{{group.id}}" @click="ajouter(group.id)">ajouter</button>
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

                            
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                </div>
                </div>
            </div>
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
        <button class="btn btn-danger" @click="$router.go(-1)">back</button>

    </div>
</template>

<script>

import { defineComponent } from 'vue'
import API from "../scripts/API.js"
import { RESOLVE_FILTER } from '@vue/compiler-core';
export default defineComponent({
    name: 'History',
    async mounted() {
        this.chercherMembre();
        this.chercherUsers();
    },  
    data() {
        return {
            membreCourant:"",
            membres: [],
            recherche: [],
            rechercheTMP: []
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
        async chercherUsers(){
            this.recherche = await API.requestLogged(API.METHOD.GET, '/users/', undefined, undefined);
            //this.recherche = this.recherche[0];
        },
        async chargerUser(){
            this.membreCourant = await API.requestLogged(API.METHOD.GET, '/users/me', undefined, undefined);
            console.log(this.membreCourant);
        },
        async supprimer(personne){
            await API.requestLogged(API.METHOD.DELETE, '/groups/'+this.$route.params.id+'/friends/'+personne, undefined, undefined);
            this.chercherMembre();
        },
        async ajouter(personne){
            let res = new Array();
            res.push(personne);
            let ui = JSON.stringify(res)
            console.log(res);
            await API.requestLogged(API.METHOD.POST, '/groups/'+this.$route.params.id+'/friends', ui, API.CONTENT_TYPE.JSON);
            this.open();
            this.chercherMembre();
        },
        open(){
            this.rechercheTMP = [];
            this.$refs.rechercheAmis.value='';
        },
        completer(){
            console.log(this.recherche)

            var res = this.recherche.filter(x=>{
                var reg = new RegExp(this.$refs.rechercheAmis.value);
                return x.mail.match(reg) || x.firstname.match(reg) || x.lastname.match(reg);

            })
            res = res.filter( ( element ) => !this.membres.some(obj => obj.mail === element.mail) );
            res = res.filter( ( element ) => element.mail !== User.currentUser.mail );
            this.rechercheTMP = res;
            console.log(this.rechercheTMP);
        }

    }
})
</script>