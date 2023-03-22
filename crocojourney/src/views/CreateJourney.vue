<template>
    <div class="w-auto px-5 vh-90">
        <div class="mt-5 ms-4">
            <h1>Creer un nouveau trajet</h1>
        </div>
        <div class="row col-md-12">
        <!-- Partie gauche de l'écran -->
            <!-- Partie haute -->
            <div class="col mt-5">
                <div class="ms-5">
                    <h4>Votre trajet est <span class="text-danger">*</span></h4>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="typeRadio" ref="typeRadioPublique" checked>
                        <label class="form-check-label" for="typeRadioPublique">
                            Publique
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input " type="radio" name="typeRadio" id="typeRadioPrive">
                        <label class="form-check-label" for="typeRadioPrive">
                            Privé
                        </label>
                    </div>
                </div>
                <!-- Partie moyenne -->
                <div class="border">
                    <div class="ms-5 mt-5">
                        <h3>Trajet</h3>
                    </div>
                    
                    <!-- Partie moyenne Gauche (dessin) -->
                    <div>
                        <div class="row">
                        <div class="col-md-2 overflow-auto mt-2">
                            <p style="text-align: center;">Depart <br> <br>|<br>|<br>|<br>|<br>|<br>|<br>|<br><br>Destination </p>
                        </div>
                        <!-- Partie moyenne droite (destination et étapes) -->
                        <ListEtape></ListEtape>
                        <!--<ListEtape ref="etapes"/>-->
                        <!--<div ref="trajet" class="col-md-9 overflow-auto mt-2 border border-danger" style="overflow-y: scroll; height: 256px;">
                            <SearchBar />
                            <p class="">Paris</p>
                            <p class="">Nancy</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                            <p class="">Marseille</p>
                        </div>-->
                    </div>   
                    </div>
                    <div>
                        <button class="col ms-3" @click="ajouterEtape">Ajouter Etape</button>
                    </div>
                </div>
                    <div class="form-check mt-5" style="width: 25%; float: none;">
                        <input class="form-control" type="date">
                    </div>
            </div>

            <!-- Partie droite de l'écran -->
            <div class="col">
                <div class="mx-5 ">
                    <h4>Précisions sur le lieu de rendez-vous</h4>
                    <textarea class="form-control mb-4" rows="3" name="" ref="precisionsRDV" style="resize: none;"></textarea>
                    <h4>Contraintes et commentaires</h4>
                    <textarea class="form-control mb-4" rows="3" name="" ref="contraintes" style="resize: none;"></textarea>
                    <div >

                        <!-- Places -->
                        <span class="col" style="float:left;width:50%;">
                            <h4>Places</h4>
                            <div class="form-floating" style="width: 80%;">
                                <input ref="login" class="form-control" type="text" id="login" name="login" placeholder="Login">
                            </div>
                        </span>
                    

                        <!-- Prix -->
                        <span class="col" style="float:left;width:50%;">
                            <h4>Prix</h4>
                            <div class="form-floating" style="width: 80%;">
                                <input ref="login" class="form-control" type="text" id="login" name="login" placeholder="Login">
                            </div>
                        </span>

                    </div>

                    <div>
                        <!-- bouton Gerer le départ -->
                        <div class="col" style="float:left;width:50%; margin-top: 10%;">
                            <button class="btn btn-success">Créer le trajet</button>
                        </div>
                        <!-- bouton Retour -->
                        <div class="col" style="float:left;width:50%; margin-top: 10%;">
                            <button class="btn btn-danger">Retour</button>
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

            const typeRadioPublique = this.$refs.typeRadioPublique;
            const precisionsRDV = this.$refs.precisionsRDV;
            const contraintes = this.$refs.contraintes;
            const places = this.$refs.places;
            const prix = this.$refs.prix;
            const date = this.$refs.date;
            
            let valid = true;

            typeRadioPublique.classList.remove("is-invalid");
            precisionsRDV.classList.remove("is-invalid");
            contraintes.classList.remove("is-invalid");
            places.classList.remove("is-invalid");
            prix.classList.remove("is-invalid");
            date.classList.remove("is-invalid");

            let group

            if(typeRadioPublique == "Publique"){
                group = 0;
            }else{
                //à changer plus tard
                group = 0; 
            }
                
            


            var jsonAEnvoyer = {
                "title": "string",
                "size": 0,
                "constraints": contraintes,
                "precisions": precisionsRDV,
                "price": prix,
                "private": typeRadioPublique,
                "steps": [
                    {
                    "city_id": "string",
                    "order": 0
                    }
                ],
                "departure": "string",
                "group": group,
                "arrival": "string",
                "date": "2023-03-21T21:55:04.916Z"
            }



            try{
                const res = await API.requestLogged(
                    API.METHOD.POST,

                )
            }catch (e){

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
            console.log("Trajet attempted, as " + typeRadioPublique.value + " " + precisionsRDV.value + " (" + contraintes.value + ")\n" + places.value + "\n" + prix.value + "\nDate : " + date.value );
            if(valid){
                try {
                    await API.createJourney(typeRadioPublique.value, precisionsRDV.value, contraintes.value, places.value, prix.value, date.value);
                    this.$router.push({ path: '/register' });
                    document.querySelector("#alertsDiv").innerHTML="<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><div><strong>Inscription réussie !</strong> Vous pouvez désormais vous <RouterLink to=\"/login\" class=\"text-decoration-none\">connecter</RouterLink> pour commencer à utiliser CrocoJourney.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>";
                } catch (error) {
                    const json = await error.json();
                    console.log(json);
                    window.alert(json.detail);
                }
            }
        },
         ajouterEtape(){
            this.$refs.etapes.addItem();
        }
    }
})

console.log("t")


</script>