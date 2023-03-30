<template>
    <div class="w-auto px-5 vh-90">
        <div class="mt-5 ms-4">
            <h1>Créer un nouveau trajet</h1>
        </div>
        <div class="row container-fluid">
        <!-- Partie gauche de l'écran -->
            <!-- Partie haute -->
            <div class="col mt-5">
                <div class="ms-5">

                    <span class="col" style="float:left;width:50%;">
                            <h4>Titre</h4>
                            <div class="form-floating" style="width: 80%;">
                                <input ref="titre" class="form-control">
                            </div>
                    </span>

                    <h4>Votre trajet est <span class="text-danger">*</span></h4>
                    <div class="form-check">
                    <input ref="sex" class="form-check-input" type="radio" name="sexRadio" id="sexRadioHomme" value="H" v-model="selectedOption" checked>
                    <label class="form-check-label" for="sexRadioHomme">
                        Public
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sexRadio" id="sexRadioFemme" v-model="selectedOption" value="F">
                    <label class="form-check-label" for="sexRadioFemme">
                        Prive
                    </label>
                    <select v-if="selectedOption === 'F'">
                        <option value="option1-1">Option 1.1</option>
                        <option value="option1-2">Option 1.2</option>
                        <option value="option1-3">Option 1.3</option>
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
                    <div>
                        <button class="col ms-3 btn btn-secondary" @click="ajouterEtape">Ajouter une étape</button>
                    </div>
                </div>
                    <!--La date-->
                    <div class="form-check mt-5" style="width: 25%; float: none;">
                        <input class="form-control" id="date" type="date" v-model="selectedDate">
                    </div>
                    <!--L'heure-->
                    <div class="form-check mt-5" style="width: 25%; float: none;">
                        <input class="form-control" id="time" type="time" v-model="selectedTime">
                    </div>
            </div>

            <!-- Partie droite de l'écran -->
            <div class="col">
                <div class="mx-5">
                    <h4>Précisions sur le lieu de rendez-vous</h4>
                    <textarea class="form-control mb-4" rows="3" name="" ref="precisionsRDV" style="resize: none;"></textarea>
                    <h4>Contraintes et commentaires</h4>
                    <textarea class="form-control mb-4" rows="3" name="" ref="contraintes" style="resize: none;"></textarea>
                    <div class="row">

                        <!-- Places -->
                        <div class="col">
                            <h4>Places</h4>
                            <div class="form-floating">
                                <input ref="places" class="form-control" type="number">
                            </div>
                        </div>
                    
                        <!-- Prix -->
                        <div class="col">
                            <h4>Prix</h4>
                            <div class="form-floating input-group">
                                <input ref="prix" class="form-control" type="number">
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
                            <RouterLink class="btn btn-danger mt-4" to="/">Retour</RouterLink>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


import { defineComponent } from 'vue';
import API from "../scripts/API.js"
import emitter from "../scripts/emitter.js"
import SearchBar from '../components/SearchBar.vue';
import ListEtape from '../components/ListEtape.vue';
export default defineComponent({
    name: 'Login',
    data() {
    return {
      selectedOption: 'option1',
      selectedDate: '',
      selectedTime: '',
      combinedDateTime: ''
    }
  },
    components:{
        SearchBar,
        ListEtape,
    },
    methods: {
        async createJourney() {

            var jsonAEnvoyer = {
                "title": "string",
                "size": 0,
                "constraints": "string",
                "precisions": "string",
                "price": 0,
                "private": true,
                "steps": [
                    {
                    "city_id": "string",
                    "order": 0
                    }
                ],
                "departure": "string",
                "group": 0,
                "arrival": "string",
                "date": "2023-03-21T21:55:04.916Z"
            }

            //const typeRadioPublique = this.$refs.typeRadioPublique.value;
            const precisionsRDV = this.$refs.precisionsRDV.value;
            const contraintes = this.$refs.contraintes.value;
            const places = this.$refs.places.value;
            const prix = this.$refs.prix.value;
            const titre = this.$refs.titre.value;

            //const date = this.$refs.date.value;
            //const time = this.$refs.time.value;

            const listeEtape = this.$refs.listeEtape
            listeEtape.afficherListeEtape()
            const listeDesEtapes = listeEtape.listeEtapes
            const depart = listeEtape.choice.depart
            const arrivee = listeEtape.choice.arrivee

            let valid = true;

            /**typeRadioPublique.classList.remove("is-invalid");
            precisionsRDV.classList.remove("is-invalid");
            contraintes.classList.remove("is-invalid");
            places.classList.remove("is-invalid");
            prix.classList.remove("is-invalid");
            date.classList.remove("is-invalid");
            **/
            let group

            /**if(typeRadioPublique == "Publique"){
                group = 0;
            }else{
                //à changer plus tard
                group = 0; 
            }**/
                
            

            //let dateFusion = date+time
            const combined = new Date(`${this.selectedDate}T${this.selectedTime}:00.000Z`);
            combined.toISOString();
            console.log(combined);

            const male = this.$refs.sex;
            const prive = male.checked ? false : true;

            console.log(prive);


            let groupe;
            if(prive){
                groupe = 1;
            }else{
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
                date: combined
                }
            
            let resEnvoie = JSON.stringify(jsonAEnvoyer)
            console.log("la bete :")
            console.log(resEnvoie)

            try{
                const res = await API.requestLogged(
                    API.METHOD.POST,
                    '/trips/',
                    resEnvoie,
                    API.CONTENT_TYPE.JSON

                )
                console.log(res)
            }catch (e){
                console.log(e) 
            }
            
            /**if(firstName.value.length < 1) {
                firstName.classList.add("is-invalid");
                valid = false;
            }
            if(lastName.value.length < 1) {
                lastName.classList.add("is-invalid");
                valid = false;
            }
            if(email.value.length < 3) {
                email.classList.add("is-invalid");
                valid = false;
            }
            if(phone.value.length < 10 || phone.value.length > 12) {
                phone.classList.add("is-invalid");
                valid = false;
            }
            if(password.value.length < 6) {
                password.classList.add("is-invalid");
                valid = false;
            }
            if(password.value != passwordConfirm.value || passwordConfirm.value == "") {
                passwordConfirm.classList.add("is-invalid");
                valid = false;
            }

            const hasVehicle = vehicle.checked;
            const sex = male.checked ? "H" : "F";

            **/
            //console.log("Trajet attempted, as " + typeRadioPublique.value + " " + precisionsRDV.value + " (" + contraintes.value + ")\n" + places.value + "\n" + prix.value + "\nDate : " + date.value );
        },
         ajouterEtape(){
            this.$refs.etapes.addItem();
        }
    }
})
</script>