<template>
  <div class="d-flex justify-content-center align-items-center vh-100 p-3">
  <div class="card border-success">
    <div class="card-header bg-transparent border-success text-center">
          <h3>Details du trajet {{ title }}</h3>

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
        <strong v-if="this.steps.length>0">Etapes :</strong>
        <ul>
          <li v-for="(step, index) in steps" :key="index">{{ step.name }}</li>
        </ul>
        <strong>Arrivée :</strong> {{ arrival.name }}
        <br>
        <strong>Prix :</strong> {{ price }}€
        <br>
        <strong>Nombre de places :</strong> {{ size }}
        <br>
        <strong v-if="this.constraints!==''">Contraintes :</strong> {{ constraints }}
        <br>
        <strong v-if="this.precisions!==''">Précisions :</strong> {{ precisions }}
        <br>
        <strong v-if="this.group!==null">Groupe :</strong> {{ group }}

      </p>
    </div>
    <div class="card-footer bg-transparent border-success text-center">
      <button v-if="driver.id === user.id" type="button" class="btn btn-outline-success me-2" @click="editTrip()">Modifier</button>
      <button v-if="driver.id === user.id" type="button" class="btn btn-outline-danger me-2" @click="deleteTrip()">Supprimer</button>
      <button v-if="this.passengers.map(p => p.id).includes(user.id)" class="btn btn-danger" @click="leaveTrip()">Quitter</button>
      <button v-else-if="this.candidates.map(c => c.id).includes(user.id)" class="btn btn-danger" @click="cancelRequest()">Annuler la demande</button>
      <button v-else-if="this.user.id !== driver.id" class="btn btn-success" @click="joinTrip()">Demander à rejoindre le trajet</button>
    </div>
  </div>
</div>

<div class="container my-3 mt-3 mb-3">
  <div class="row">
    <div class="col-md-6">
      <h3>Candidats</h3>
      <div v-for="candidate in candidates" :key="candidate.id">
        <Candidats :id="candidate.id" :firstname="candidate.firstname" :lastname="candidate.lastname" :photoPath="candidate.photoPath" :tripId="id" :driver="this.driver.id"/>
      </div>
    </div>
    <div class="col-md-6">
      <h3>Passagers</h3>
      <div v-for="passenger in passengers" :key="passenger.id">
        <Passagers :id="passenger.id" :firstname="passenger.firstname" :lastname="passenger.lastname" :photoPath="passenger.photoPath" :tripId="id" />
      </div>
    </div>
  </div>
</div>

</template>

<script>
import API from '../scripts/API';
import User from '../scripts/User';
import Candidats from '../components/Candidats.vue';
import Passagers from '../components/Passagers.vue';

export default {
  name: 'DetailTrip',
  components: {
    Candidats,
    Passagers,
  },
  data() {
    return {
      user: User.currentUser,
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
        this.photoPath = `${API.API_URL}/static/pictures/` + (this.driver.photoPath ?? 'default.png');        
      })
      .catch((error) => console.log(error));

  },
  methods: {
    async joinTrip() {
      try {
        await API.requestLogged(API.METHOD.POST, '/trips/' + this.id + '/join');
        alert('Votre demande à été envoyé !');
        window.location.reload();
      } catch (error) {
        alert('Erreur lors de la demande de trajet.');
      }
    },

    async leaveTrip() {
      try {
        await API.requestLogged(API.METHOD.DELETE, '/trips/' + this.id + '/passengers/' + this.user.id);
        alert('Vous avez quitté le trajet avec succès !');
        window.location.reload();
      } catch (error) {
        alert('Erreur lors de la tentative de quitter le trajet.');
      }
    },

    async deleteTrip() {
      try {
        await API.requestLogged(API.METHOD.DELETE, '/trips/' + this.id);

        // réinitialiser les données du composant
        this.trips = [];

        // rediriger l'utilisateur vers la page précédente
        window.history.back();
        alert('Le trajet a été supprimé avec succès !');
      } catch (error) {
        alert('Erreur lors de la tentative de supprimer le trajet.');
      }
    },

    async cancelRequest() {
      try {
        await API.requestLogged(API.METHOD.DELETE, '/trips/' + this.id + '/candidates/' + this.user.id);
        alert('Votre demande a été annulée avec succès !');
        window.location.reload();
      } catch (error) {
        alert('Erreur lors de la tentative d\'annulation de votre demande.');
      }
    },

    async editTrip() {
      try {
        await API.requestLogged(API.METHOD.PATCH, '/trips/' + this.id);
        alert('Le trajet a été modifié avec succès !');
      } catch (error) {
        alert('Erreur lors de la tentative de modification du trajet.');
      }
    },

  },
};
</script>
