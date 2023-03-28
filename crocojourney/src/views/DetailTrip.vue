<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card border-success">
            <div class="card-header bg-transparent border-success text-center">Details du trajet {{ title }}</div>
            <div class="card-body text">
                <h5 class="card-title text-center">{{ new Date(date).toLocaleDateString('fr-FR') }}</h5>
                <p class="card-text">
                    Heure de départ : {{ new Date(date).getHours() + ':' + new Date(date).getMinutes().toString().padStart(2, '0') }}
                    <br />
                    De {{ departure.name }}
                    <br />
                    <div v-for="(step, index) in steps" :key="index">
                    -{{ step.name }}
                    </div>
                    à {{ arrival.name }}
                    <br />
                    Prix : {{ price }}€
                    <br />
                    Nombre de places : {{ size }}
                    <br />
                    Contraintes : {{ constraints }}
                    <br />
                    Précisions : {{ precisions }}
                    <br />

                    <img :src="photoPath" class="img-thumbnail" id="formPhoto" />
                    <br />
                    {{ driver.firstname }} {{ driver.lastname }}
                    <br />
                    {{ rate }}/5
                </p>
            </div>
            <div class="card-footer bg-transparent border-success text-center">
                <button class="btn btn-success">Réserver une place</button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../scripts/API';
export default {
    name: 'DetailTrip',
    data() {
        return {
            id: '',
            departure: '',
            arrival: '',
            date: '',
            title: '',
            rate: '',
            price: '',
            size: '',
            constraints: '',
            precisions: '',
            private: '',
            steps: [
                {
                    city_id: '',
                    order: '',
                },
            ],
            driver: {
                id: '',
                mail: '',
                firstname: '',
                lastname: '',
                sex: '',
                photoPath: '',
            },
            group: '',
            passengers: [],
            candidates: [],
            photoPath: '',
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        API.requestLogged(API.METHOD.GET, '/trips/' + this.id)
            .then((data) => {
                const trip = data;
                this.departure = trip.departure;
                this.arrival = trip.arrival;
                this.date = trip.date;
                this.title = trip.title;
                this.rate = trip.rate;
                this.price = trip.price;
                this.size = trip.size;
                this.constraints = trip.constraints;
                this.precisions = trip.precisions;
                this.private = trip.private;
                this.steps = trip.steps;
                this.driver = trip.driver;
                this.group = trip.group;
                this.passengers = trip.passengers;
                this.candidates = trip.candidates;

                this.photoPath = `${API.API_URL}/static/pictures/${this.photoPath}`;
            })
            .catch((error) => console.log(error));
    },
};
</script>
