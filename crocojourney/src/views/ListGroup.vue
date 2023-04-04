<template>
    <div class="container-fluid">
        <div class="row" style="margin-top: 2%;">
            <figure class="text-center">
                <p class="h1">Mes groupes</p>
            </figure>
        </div>

        <div class="row">
            <div class="container-fluid d-flex justify-content-center align-items-center" style="margin-top: 3%;">
                <div class="col-md-8" style="width: 55%; margin-left: 1%; margin-right: 1%;">
                    <div class="scrollable">

                        <div v-if="groups.length == 0" class="card border-success">
                            <h4 class="card-title" style="margin: auto;">Vous n'avez pas encore de groupes!</h4>
                        </div>

                        <a v-else>
                            <a v-for="group in groups">
                                <div class="card border-success">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-10">
                                                            <div class="col-md-12">
                                                                <h4 class="card-title text-center" style="margin-top: 2%">Nom du groupe:
                                                                    {{ group.name }}</h4>
                                                            </div>
                                                            <div class="container-fluid">

                                                                <div style="margin-top: 3%; margin-bottom: 4%;">
                                                                    <p class="card-text"
                                                                        style="font-size: large;">
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="col d-flex justify-content-center align-items-center">
                                                            <button class="btn btn-danger" id="{{group.id}}" @click="annihilerGroupe(group.id)">Detruire Groupe</button>
                                                            <button class="btn btn-success mx-5" id="{{group.id}}" @click="allerModifier(group.id)">Voir</button>
                                                            <!--<RouterLink to="/login" class="text-decoration-none">Voir</RouterLink>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
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
        this.getGroups();
    },
    data() {
        return {
            groups: [],
        }
    },
    methods: {
        async getGroups() {
            this.groups = await API.requestLogged(API.METHOD.GET, '/groups/', undefined, undefined);
        },
        allerModifier(mimir){
            console.log(mimir);
            this.$router.push({ path: '/modifGroup/'+mimir });
        },
        async annihilerGroupe(mimir){
            console.log(mimir);
            await API.requestLogged(API.METHOD.DELETE, '/groups/'+mimir, undefined, undefined);
            this.getGroups();
        }
    }
})
</script>

<style>
.scrollable {
    height: calc(61vh - 3.5rem);
    overflow-y: auto;
}
</style>
