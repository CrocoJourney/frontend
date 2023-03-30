<template>
        <div v-if="showSuccess" class="alert alert-success">Votre demande à été envoyé.</div>
    <div v-if="showError" class="alert alert-danger">Erreur, le trajet est déjà complet ou vous avez déjà demandé à rejoindre le trajet.</div>
    <div class="d-flex justify-content-center align-items-center vh-75 p-4">
      
  <div class="card border-success">
    
    <div class="card-header bg-transparent border-success text-center">
      
      Details du trajet {{ title }}
    </div>
    <div class="card-body text">
      
      <div class="text-center">
        <img :src="photoPath" class="rounded-circle" width="50" height="50" id="formPhoto">
        <br>
        {{ driver.firstname }} {{ driver.lastname }}
        <br>
        {{ rate }}/5
      </div>
      <hr>
      <h5 class="card-title text-center">{{ new Date(date).toLocaleDateString('fr-FR') }}</h5>
      <p class="card-text">
        <strong>Heure de départ :</strong>
        {{ new Date(date).getHours() + ':' + new Date(date).getMinutes().toString().padStart(2, '0') }}
        <br>
        <strong>Départ :</strong> {{ departure.name }}
        <br>

        <ul>
          <li v-for="(step, index) in steps" :key="index">{{ step.name }}</li>
        </ul>
        <strong>Arrivée :</strong> {{ arrival.name }}
        <br>
        <strong>Prix :</strong> {{ price }}€
        <br>
        <strong>Nombre de places :</strong> {{ size }}
        <br>
        <strong>Contraintes :</strong> {{ constraints }}
        <br>
        <strong>Précisions :</strong> {{ precisions }}
      </p>
    </div>
    <div class="card-footer bg-transparent border-success text-center">
      <button class="btn btn-success" @click="joinTrip()">Réserver une place</button>
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
          successMessage: '',
      errorMessage: '',
      showSuccess: false,
      showError: false,
          message: '',
      error: '',
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
                this.photoPath = `${API.API_URL}/static/pictures/`+ (this.driver.photoPath ?? 'default.png');
            })
            .catch((error) => console.log(error));
    },
    methods: {
      joinTrip() {
      API.requestLogged(API.METHOD.POST, '/trips/' + this.id + '/join')
        .then((data) => {
          this.successMessage = data.message;
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 2000);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 2000);
        });
}

    },
};
</script>
