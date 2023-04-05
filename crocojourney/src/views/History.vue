<template>
    <div class="container-fluid vh-100">
        <div class="row" style="margin-top: 2%;">
            <figure class="text-center">
                <p class="h1">Historique des trajets</p>
            </figure>
        </div>

        <div class="row">
            <div class="container-fluid" style="margin-top: 3%; margin-bottom: 2%;">
                <figure class="text-center">
                    <p class="h2" style="text-decoration: underline;">Mes trajets en tant que passager</p>
                </figure>
                <div class="col-md-8" style="width: auto; margin-left: 1%; margin-right: 1%; margin-top: 2%;">
                    <div class="scrollable">
                        <div v-if="tripsPassenger.length === 0" class="card border-success">
                            <h5 class="card-title" style="margin: auto;">Vous n'avez pas encore fait de trajets en tant que passager</h5>
                        </div>
                        <a v-else>
                            <a v-for="trip in tripsPassenger">
                                <div v-if="new Date(trip.date) < currentDate" class="card border-success">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-10">
                                                            <div class="col-md-12">
                                                                <h4 class="card-title" style="margin-top: 1%">Titre: {{trip.title}}</h4>
                                                            </div>
                                                            <div class="container-fluid">
                                                                <div style="display: flex; flex-wrap: wrap;">
                                                                    <div style="width: 65%; margin-top: 1%; margin-bottom: 1%;">
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Ville départ: {{trip.departure__name}}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Ville d'arrivée: {{trip.arrival__name}}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div style="width: 35%; margin-top: 1%;">
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Départ: {{new Date(trip.date).toLocaleDateString('fr-FR')}}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Conducteur: {{}}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="trip.private" class="col d-flex justify-content-center align-items-center">
                                                            <i class="bi bi-person-fill-lock" style="font-size: 2.5rem;" title="Ce trajet est privé"></i>
                                                        </div>
                                                        <div v-else class="col d-flex justify-content-center align-items-center">
                                                            <i class="bi bi-person-fill" style="font-size: 2.5rem;" title="Ce trajet est public"></i>
                                                        </div>
                                                        <div class="col d-flex justify-content-center align-items-center">
                                                            <button class="btn btn-success mx-5" id="{{trip.id}}" @click="allerDetail(trip.id)">Detail</button>
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

        <div class="row">
            <div class="container-fluid" style="margin-top: 3%; margin-bottom: 3%;">
                <figure class="text-center">
                    <p class="h2" style="text-decoration: underline;">Mes trajets en tant que conducteur</p>
                </figure>
                <div class="col-md-8" style="width: auto; margin-left: 1%; margin-right: 1%; margin-top: 2%;">
                    <div class="scrollable">
                        <div v-if="tripsDriver.length === 0" class="card">
                            <h5 class="card-title" style="margin: auto;">Vous n'avez pas encore fait de trajets en tant que conducteur</h5>
                        </div>
                            <a v-else>
                                <a v-for="trip in tripsDriver">
                                    <div v-if="new Date(trip.date) < currentDate" class="card border-success">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-10">
                                                            <div class="col-md-12">
                                                                <h4 class="card-title" style="margin-top: 1%">Titre: {{trip.title}}</h4>
                                                            </div>
                                                            <div class="container-fluid">
                                                                <div style="display: flex; flex-wrap: wrap;">
                                                                    <div style="width: 65%; margin-top: 1%; margin-bottom: 1%;">
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Ville départ: {{trip.departure__name}}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Ville d'arrivée: {{trip.arrival__name}}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div style="width: 35%; margin-top: 1%;">
                                                                        <p class="card-text" style="font-size: large;">
                                                                            <span class="fw-bold me-2">•</span>
                                                                            Date départ: {{new Date(trip.date).toLocaleDateString('fr-FR')}}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="trip.private" class="col d-flex justify-content-center align-items-center">
                                                            <i class="bi bi-person-fill-lock" style="font-size: 2.5rem;" title="Ce trajet est privé"></i>
                                                        </div>
                                                        <div v-else class="col d-flex justify-content-center align-items-center">
                                                            <i class="bi bi-person-fill" style="font-size: 2.5rem;" title="Ce trajet est public"></i>
                                                        </div>
                                                        <div class="col d-flex justify-content-center align-items-center">
                                                            <button class="btn btn-success mx-5" id="{{trip.id}}" @click="allerDetail(trip.id)">Detail</button>
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
    this.getTrips();
    //this.getCurrentDate();
  },
  data() {
    return {
        tripsDriver: [],
        tripsPassenger: [],
        currentDate: new Date()
    }
  },
  methods: {
    async getTrips(){
        const res = await API.requestLogged(API.METHOD.GET,'/trips/me',undefined,undefined);
        this.tripsDriver = res.tripsDriver;
        this.tripsPassenger = res.tripsPassenger;
    },
    allerDetail(mimir){
            console.log(mimir);
            this.$router.push({ path: '/detail-trip/'+mimir });
    },
  }
})
</script>

<style>
.scrollable{
    height: calc(50vh - 3.5rem);
    overflow-y: auto;
}
</style>