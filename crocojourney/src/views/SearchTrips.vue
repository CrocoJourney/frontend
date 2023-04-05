<template>
    <!--Place Holder Trouvé-->

    <div class="container my-3 mt-3 mb-3">
        <SearchBar />
    </div>

    <div class="container my-3 mt-3 mb-3">
        <!-- number of trip -->
        <div class="row">
            <div class="col-12 text-center">
                <h4>{{ trips.length }} trajets trouvés</h4>
            </div>
        </div>
    </div>

    <div class="container my-3 mt-3 mb-3">
        <select
            class="dropdown"
            aria-label=".form-select-lg example"
            v-model="sortBy"
            @change="changeSortOrder($event)"
        >
            <!-- placeholder tag -->
            <option selected hidden>Trier par :</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="rate_asc">Note croissant</option>
            <option value="rate_desc">Note décroissant</option>
            <option value="date_asc">Date croissant</option>
            <option value="date_desc">Date décroissant</option>
        </select>
    </div>

    <div class="container my-3 mt-3 mb-3">
        <div v-for="trip of sortedTrips">
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

    <!--Place Holder Vide-->
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import API from '../scripts/API';
import SearchResults from '../components/SearchResults.vue';

export default defineComponent({
    name: 'SearchTrips',
    components: {
        SearchBar,
        SearchResults,
    },
    data() {
        return {
            departure: '',
            arrival: '',
            date: '',
            trips: [],
            sortBy: '',
            tripType: '',
        };
    },
    computed: {
        sortedTrips() {
            let sortedTrips = [...this.trips];

            switch (this.sortBy) {
                case 'price_asc':
                    sortedTrips.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                    break;
                case 'price_desc':
                    sortedTrips.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                    break;
                case 'rate_asc':
                    sortedTrips.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
                    break;
                case 'rate_desc':
                    sortedTrips.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
                    break;
                case 'date_asc':
                    sortedTrips.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                    break;
                case 'date_desc':
                    sortedTrips.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    break;
                default:
            }

            return sortedTrips;
        },
    },
    mounted() {
        const route = useRoute();
        this.departure = route.query.departure || '';
        this.arrival = route.query.arrival || '';
        this.date = route.query.date || '';

        if (this.departure.length > 0 && this.arrival.length > 0) {
            this.searchTrips(this.departure, this.arrival, this.date);
        }
    },

    methods: {
        async searchTrips(departure, arrival, date) {
            let url = `/trips?departure=${departure}&arrival=${arrival}`;
            if (date) {
                url += `&date=${date}`;
            }
            try {
                const res = await API.requestLogged(API.METHOD.GET, url, undefined);
                // refresh component
                this.trips = [];
                for await (const element of res) {
                    const driver = await API.requestLogged(API.METHOD.GET, `/users/${element.driver_id}`, undefined);
                    const date = new Date(element.date);
                    const now = new Date();
                    if (date.getTime() - now.getTime() > 24) {
                        this.trips.push({
                            id: element.id,
                            departure: element.departure_name,
                            arrival: element.arrival_name,
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
            } catch (error) {}
        },
        changeSortOrder(event) {
            this.sortBy = event.target.value;
        },
    },
    watch: {
        $route: {
            handler: function (to, from) {
                this.departure = to.query.departure;
                this.arrival = to.query.arrival;
                this.date = to.query.date;

                if (this.departure.length > 0 && this.arrival.length > 0) {
                    this.searchTrips(this.departure, this.arrival, this.date || null);
                }
            },
            deep: true,
        },
    },
});
</script>
