<template>
    <div class="container-fluid">
        <div class="row" style="margin-top: 2%;">
            <figure class="text-center">
                <p class="h1">Mes trajets en cours</p>
            </figure>
        </div>

        <div class="row">
            <div class="container-fluid" style="margin-top: 3%;">
                <div class="col-md-8" style="width: auto; margin-left: 1%; margin-right: 1%;">
                    <div class="scrollable">

                        <div v-if="trips.length === 0" class="card border-success">
                            <h4 class="card-title" style="margin: auto;">Vous n'avez pas encore de trajets en cours!</h4>
                        </div>

                        <a v-else>
                            <a v-for="trip in trips">
                                <div v-if="new Date(trip.date) > currentDate" class="card border-success">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-10">
                                                            <div class="col-md-12">
                                                                <h4 class="card-title" style="margin-top: 1%">Titre:
                                                                    {{ trip.title }}</h4>
                                                            </div>
                                                            <div class="container-fluid">
                                                                <div style="display: flex; flex-wrap: wrap;">
                                                                    <div
                                                                        style="width: 60%; margin-top: 1%; margin-bottom: 1%;">
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Ville départ: {{ trip.departure__name }}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Ville d'arrivée: {{ trip.arrival__name }}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div style="width: 40%; margin-top: 1%;">
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Départ: {{ new
                                                                                    Date(trip.date).toLocaleDateString('fr-FR')
                                                                                }}
                                                                                à {{ new Date(time).getHours() + ':' + new
                                                                                    Date(time).getMinutes().toString().padStart(2,
                                                                                        '0') }}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p class="card-text" style="font-size: large;">
                                                                                <span class="fw-bold me-2">•</span>
                                                                                Conducteur:
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="trip.private"
                                                            class="col d-flex justify-content-center align-items-center">
                                                            <i class="bi bi-person-fill-lock" style="font-size: 2.5rem;"
                                                                title="Ce trajet est privé"></i>
                                                        </div>
                                                        <div v-else
                                                            class="col d-flex justify-content-center align-items-center">
                                                            <i class="bi bi-person-fill" style="font-size: 2.5rem;"
                                                                title="Ce trajet est public"></i>
                                                        </div>
                                                        <div class="col d-flex justify-content-center align-items-center">
                                                            <RouterLink
                                                                :to="{ name: 'DetailTrip', params: { id: trip.id } }"
                                                                class="btn btn-success align-middle">Voir</RouterLink>
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
        this.getCurrentDate();
    },
    data() {
        return {
            trips: [],
            currentDate: new Date()
        }
    },
    methods: {
        async getTrips() {
            const res = await API.requestLogged(API.METHOD.GET, '/trips/me', undefined, undefined);
            this.trips = res.tripsDriver;
        }
    }
})
</script>

<style>
.scrollable {
    height: calc(60vh - 3.5rem);
    overflow-y: auto;
}
</style>