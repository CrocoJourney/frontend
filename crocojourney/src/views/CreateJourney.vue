<template>
    <!-- if the user doesn't have a car show him an error page -->
    <div class="text-start mt-5 mb-4 col-md-6 mx-auto" id="alertsDiv">
        <!--<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <div>
                <strong>Oups !</strong> Une erreur est survenue lors de votre inscription.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>-->
    </div>

    <div v-if="user.car == false">
        <div class="d-flex align-items-center justify-content-center vh-100">
            Vous ne possédez pas de voiture, vous ne pouvez donc pas créer de trajet.
        </div>
    </div>
    <div v-else class="w-auto px-5 vh-90">
        <div class="mt-5 ms-4">
            <h1>Créer un nouveau trajet</h1>
        </div>
        <div class="row container-fluid">
            <!-- Partie gauche de l'écran -->
            <!-- Partie haute -->
            <div class="col mt-5">
                <div class="ms-5">
                    <span class="col" style="float: left; width: 50%">
                        <h4>Titre</h4>
                        <div class="form-floating" style="width: 80%">
                            <input ref="titre" class="form-control" />
                        </div>
                    </span>

                    <h4>Votre trajet est <span class="text-danger">*</span></h4>
                    <div class="form-check">
                        <input
                            ref="sex"
                            class="form-check-input"
                            type="radio"
                            name="sexRadio"
                            id="sexRadioHomme"
                            value="H"
                            v-model="selectedOption"
                            checked
                        />
                        <label class="form-check-label" for="sexRadioHomme"> Public </label>
                    </div>
                    <div class="form-check">
                        <input
                            @click="searchTrips"
                            class="form-check-input"
                            type="radio"
                            name="sexRadio"
                            id="sexRadioFemme"
                            v-model="selectedOption"
                            value="F"
                        />
                        <label class="form-check-label" for="sexRadioFemme"> Prive </label>
                        <select
                            ref="listeGroupe"
                            v-model="selectedItem"
                            @change="onItemSelected"
                            v-if="selectedOption === 'F'"
                        >
                            <option v-for="option in groups" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                </div>
                <!-- Partie moyenne -->
                <div class="">
                    <div class="ms-5 mt-5">
                        <h4>Trajet</h4>
                    </div>

                    <!-- Partie moyenne Gauche (dessin) -->
                    <div>
                        <!-- Partie moyenne droite (destination et étapes) -->
                        <ListEtape ref="listeEtape"></ListEtape>
                    </div>
                </div>
                <span>
                    <span class="form-check mt-5" style="width: 25%; float: left">
                        <input class="form-control" id="date" ref="date" type="date" v-model="selectedDate" />
                    </span>
                    <!--L'heure-->
                    <span class="form-check mt-5" style="width: 25%; float: left">
                        <input class="form-control" id="time" ref="time" type="time" v-model="selectedTime" />
                    </span>
                </span>
            </div>

            <!-- Partie droite de l'écran -->
            <div class="col">
                <div class="mx-5">
                    <h4>Précisions sur le lieu de rendez-vous</h4>
                    <textarea
                        class="form-control mb-4"
                        rows="3"
                        name=""
                        ref="precisionsRDV"
                        style="resize: none"
                    ></textarea>
                    <h4>Contraintes et commentaires</h4>
                    <textarea
                        class="form-control mb-4"
                        rows="3"
                        name=""
                        ref="contraintes"
                        style="resize: none"
                    ></textarea>
                    <div class="row">
                        <!-- Places -->
                        <div class="col">
                            <h4>Places</h4>
                            <div class="form-floating">
                                <input ref="places" class="form-control" type="number" />
                            </div>
                        </div>

                        <!-- Prix -->
                        <div class="col">
                            <h4>Prix</h4>
                            <div class="form-floating input-group">
                                <input ref="prix" class="form-control" type="number" />
                                <span class="input-group-text" id="eur">€</span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <!-- bouton Gerer le départ -->
                        <div class="col">
                            <button class="btn btn-success mt-4" @click="createJourney">Créer le trajet</button>
                        </div>

                        <!-- bouton Retour -->
                        <div class="col">
                            <button class="btn btn-danger mt-4" @click="$router.go(-1)">back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../scripts/User';
import { defineComponent } from 'vue';
import API from '../scripts/API.js';
import emitter from '../scripts/emitter.js';
import SearchBar from '../components/SearchBar.vue';
import ListEtape from '../components/ListEtape.vue';
export default defineComponent({
    name: 'Login',
    data() {
        return {
            selectedOption: 'option1',
            selectedDate: '',
            selectedTime: '',
            selectedItem: '',

            valuegroup: -1,
            combinedDateTime: '',
            groups: [],
            user: User.currentUser,
        };
    },
    components: {
        SearchBar,
        ListEtape,
    },
    methods: {
        async createJourney() {
            var jsonAEnvoyer = {
                title: 'string',
                size: 0,
                constraints: 'string',
                precisions: 'string',
                price: 0,
                private: true,
                steps: [
                    {
                        city_id: 'string',
                        order: 0,
                    },
                ],
                departure: 'string',
                group: 0,
                arrival: 'string',
                date: '2023-03-21T21:55:04.916Z',
            };

            //const typeRadioPublique = this.$refs.typeRadioPublique.value;
            const precisionsRDV = this.$refs.precisionsRDV.value;
            const contraintes = this.$refs.contraintes.value;
            const places = this.$refs.places.value;
            const prix = this.$refs.prix.value;
            const titre = this.$refs.titre.value;

            //const date = this.$refs.date.value;
            //const time = this.$refs.time.value;

            const listeEtape = this.$refs.listeEtape;
            listeEtape.afficherListeEtape();
            const listeDesEtapes = listeEtape.listeEtapes;
            const depart = listeEtape.choice.depart;
            const arrivee = listeEtape.choice.arrivee;

            let valid = true;

            /**typeRadioPublique.classList.remove("is-invalid");
            precisionsRDV.classList.remove("is-invalid");
            contraintes.classList.remove("is-invalid");
            places.classList.remove("is-invalid");
            prix.classList.remove("is-invalid");
            date.classList.remove("is-invalid");
            **/
            let group;

            /**if(typeRadioPublique == "Publique"){
                group = 0;
            }else{
                //à changer plus tard
                group = 0; 
            }**/

            //let dateFusion = date+time

            console.log(depart);

            this.$refs.date.classList.remove('is-invalid');
            this.$refs.time.classList.remove('is-invalid');
            this.$refs.titre.classList.remove('is-invalid');
            this.$refs.places.classList.remove('is-invalid');
            this.$refs.listeEtape.$refs.depart.classList.remove('is-invalid');
            this.$refs.listeEtape.$refs.arrivee.classList.remove('is-invalid');
            this.$refs.prix.classList.remove('is-invalid');

            if (this.selectedDate.length < 1) {
                this.$refs.date.classList.add('is-invalid');
                valid = false;
            }
            if (this.selectedTime.length < 1) {
                this.$refs.time.classList.add('is-invalid');
                valid = false;
            }
            if (titre.length < 1) {
                this.$refs.titre.classList.add('is-invalid');
                valid = false;
            }
            if (places.length < 1 || places < 1) {
                this.$refs.places.classList.add('is-invalid');
                valid = false;
            }
            if (depart.length < 1) {
                this.$refs.listeEtape.$refs.depart.classList.add('is-invalid');
                valid = false;
            }
            if (arrivee.length < 1) {
                this.$refs.listeEtape.$refs.arrivee.classList.add('is-invalid');
                valid = false;
            }
            if (prix.length < 1 || prix.value < 0) {
                this.$refs.prix.classList.add('is-invalid');
                valid = false;
            }

            //console.log("Trajet attempted, as " + typeRadioPublique.value + " " + precisionsRDV.value + " (" + contraintes.value + ")\n" + places.value + "\n" + prix.value + "\nDate : " + date.value );

            if (valid) {
                const combined = new Date(`${this.selectedDate}T${this.selectedTime}:00.000Z`);
                combined.toISOString();
                console.log(combined);

                const male = this.$refs.sex;
                const prive = male.checked ? false : true;

                console.log(prive);

                let groupe;
                if (prive) {
                    groupe = this.valuegroup;
                } else {
                    groupe = 0;
                }

                var jsonAEnvoyer = {
                    title: titre,
                    size: Number(places),
                    constraints: contraintes,
                    precisions: precisionsRDV,
                    price: Number(prix),
                    private: prive,
                    steps: listeDesEtapes,
                    departure: depart,
                    group: groupe,
                    arrival: arrivee,
                    date: combined,
                };

                let resEnvoie = JSON.stringify(jsonAEnvoyer);
                console.log('la bete :');
                console.log(resEnvoie);

                try {
                    const res = await API.requestLogged(API.METHOD.POST, '/trips/', resEnvoie, API.CONTENT_TYPE.JSON);

                    this.$refs.date.value = '';

                    this.$refs.time.value = '';

                    this.$refs.titre.value = '';

                    this.$refs.places.value = '';

                    this.$refs.listeEtape.$refs.depart.value = '';

                    this.$refs.listeEtape.$refs.arrivee.value = '';

                    this.$refs.prix.value = '';

                    listeEtape.choice.depart = '';

                    listeEtape.choice.arrivee = '';

                    this.$refs.contraintes.value = '';

                    this.$refs.precisionsRDV.value = '';

                    male.checked = true;

                    listeEtape.listeEtapes = [];

                    listeEtape.buttons = [];

                    listeEtape.etapesValue = '';

                    listeEtape.$refs.inputEtape.value = '';

                    document.querySelector('#alertsDiv').innerHTML =
                        '<div class="alert alert-success alert-dismissible fade show" role="alert"><div><strong>Creation du trajet !</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div>';
                } catch (error) {
                    document.querySelector('#alertsDiv').innerHTML =
                        '<div class="alert alert-danger alert-dismissible fade show" role="alert"><div><strong>Oups !</strong> Une erreur est survenue lors de la création du trajet. (Code ' +
                        error.status +
                        ' : ' +
                        error.statusText +
                        ')<br><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div>';
                }
            }
        },
        ajouterEtape() {
            this.$refs.etapes.addItem();
        },
        async searchTrips() {
            let url = `/groups/`;
            if (date) {
            }
            try {
                const res = await API.requestLogged(API.METHOD.GET, url, undefined);
                // refresh component
                this.groups = res;
                console.log(this.groups);
                /**for await (const element of res) {
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
                            rate: '4',
                        });
                    }
                }**/
            } catch (error) {}
        },
        onItemSelected(event) {
            const selectedValue = event.target.value;
            this.valuegroup = selectedValue;
        },
    },
});
</script>
