<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center">Trajets privés</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-for="trip of trips">
                    <SearchResults
                        :id="trip.id"
                        :photo="trip.photo"
                        :departure="trip.departure"
                        :arrival="trip.arrival"
                        :date="trip.date"
                        :title="trip.title"
                        :rate="trip.rate"
                        :price="trip.price"
                        :time="trip.time"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import API from '../scripts/API';
import SearchResults from '../components/SearchResults.vue';

export default defineComponent({
    name: 'PrivateTrips',
    components: {
        SearchResults,
    },
    data() {
        return {
            departure: '',
            arrival: '',
            date: '',
            trips: [],
            sortBy: '',
        };
    },
    mounted() {
        this.showPrivateTrips();
    },
    methods: {
        async showPrivateTrips() {
            const res = await API.requestLogged(API.METHOD.GET, '/trips/private', undefined, undefined);
            console.log(res);
            // refresh component
            this.trips = [];
            for await (const element of res) {
                const driver = await API.requestLogged(API.METHOD.GET, `/users/${element.driver_id}`, undefined);
                const date = new Date(element.date);
                const now = new Date();
                if (date.getTime() - now.getTime() > 24) {
                    this.trips.push({
                        id: element.id,
                        departure: element.departure__name,
                        arrival: element.arrival__name,
                        date: element.date,
                        title: element.title,
                        price: element.price.toString(),
                        time: `${date}`,
                        driver: element.driver_id,
                        photo: driver.photoPath,
                        rate: driver.rate,
                    });
                }
            }
        },
    },
});
</script>
