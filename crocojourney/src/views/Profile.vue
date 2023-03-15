<template>
    <!--Formulaire-->
    <div class="col-md-5 mx-auto text-center">
        <br><h1>Mon Compte</h1><br><br>
        <form action="">

            <!--Nom/Prenom-->
            <div class="mt-5 mb-3">
                <label for="formNom" class="form-label">Nom*:</label>
                <input :value="lastName" ref="lastName" type="text" class="form-control" id="formNom">
            </div>
            <div class="mb-5">
                <label for="formPrenom" class="form-label">Prénom*:</label>
                <input :value="firstName" ref="firstName" type="text" class="form-control" id="formPrenom">
            </div>

            <!--Genre-->
            <fieldset class="mb-5">
                <legend class="col-form-label col-sm-1 pt-0">Genre:</legend>
                <div class="col-sm-4">
                  <div class="form-check">
                    <input :value="genre" ref="genre" class="form-check-input" type="radio" name="genreRadios" id="RadioFemme" checked>
                    <label class="form-check-label" for="RadioFemme">
                      Femme
                    </label>
                  </div>
                  <div class="form-check">
                    <input :value="genre" ref="genre" class="form-check-input" type="radio" name="genreRadios" id="Radiohomme">
                    <label class="form-check-label" for="Radiohomme">
                      Homme
                    </label>
                  </div>
                </div>
            </fieldset>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Photo-->
            <div class="mt-5 mb-3">
              <label for="formPhoto" class="form-label">Photo :</label>
              <img src="" class="img-thumbnail" alt="PHOTO" id="formPhoto">
            </div>
            <div class="mb-5">
                <label for="formFileSm" class="form-label"></label>
                <input :value="profilePic" ref="profilePic" class="form-control form-control-sm" id="formFileSm" type="file">
            </div>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Email/Telephone-->
            <div class="mt-5 mb-3">
                <label for="formEmail" class="form-label">Email*:</label>
                <input :value="email" ref="email" type="text" class="form-control" id="formEmail">
            </div>
            <div class="mb-5">
                <label for="formTelephone" class="form-label">Numéro de Téléphone*:</label>
                <input :value="phone" ref="phone" type="text" class="form-control" id="formTelephone" >
            </div>


            <!--Notifs-->

            <div class="mb-4 form-check form-switch">
              <input :value="notif" ref="notif" class="form-check-input" type="checkbox" role="switch" id="switchNotifs">
              <label class="form-check-label" for="switchNotifs">Voulez-vous activer les notifications ?</label>
            </div>

            <!--Voiture-->
            <div class="mb-4 form-check form-switch">
              <input :value="vehicle" ref="vehicle" class="form-check-input" type="checkbox" role="switch" id="switchVoiture">
              <label class="form-check-label" for="switchVoiture">Possédez-vous un véhicule ?</label>
            </div>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Mot de passe-->
            <div class="mt-5 mb-4">
                <label for="pass" class="form-label">Mot de Passe*: (Entrez votre mot de passe pour modifier)</label>
                <input ref="password" type="password" class="form-control" id="pass" name="password"  minlength="8" required>
            </div>

            <!--Bouton Valider-->
            <button type="submit" class="btn btn-success col-md-3 mb-4">Modifier</button>

        </form>

        <!-- <Profile firstName="Lyon" departure="Paris"  date="2023-04-10"  name="Bob"  rate="4.5"   price="10"></Profile> -->
    </div>

    <p>* champs obligatoires</p>

    <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

    <div class="col-md-5 mx-auto text-center">
        <h1>Modifier mon Mot de Passe</h1>

        <div class="mt-5 mb-3">
            <RouterLink class="btn btn-success" to="/resetpassword">Modifier</RouterLink>
        </div>
    </div>


    <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

    <div class="col-md-5 mx-auto text-center">
        <h1>Supprimer mon Compte</h1>

        <div class="mt-5 mb-3">
            <RouterLink class="btn btn-success" to="/deleteaccount">Supprimer</RouterLink>
        </div>
    </div>
    

    
</template>




<script>
import { defineComponent } from 'vue';
import API from "../scripts/API.js"
import emitter from "../scripts/emitter.js"
import User from '../scripts/User';
export default defineComponent({
    name: 'Profile',

    /*Affiche les données de l'utilisateur*/
    data(){
        return {
            lastName : User.currentUser.lastname,
            firstName : User.currentUser.firstname,
            phone : User.currentUser.phonenumber,
            email : User.currentUser.mail,
            genre : User.currentUser.sex,
            notif : User.currentUser.notif,
            vehicle : User.currentUser.vehicle,
            profilePic : User.currentUser.profilePic
            
        }
        
    },  
    
    methods:{
    
    async profile(){
            const firstName = this.$refs.firstName;
            const lastName = this.$refs.lastName;
            const genre = this.$refs.genre;
            const email = this.$refs.email;
            const phone = this.$refs.phone;
            const vehicle = this.$refs.vehicle;
            const notif = this.$refs.notif;
            const profilePic = this.$refs.profilePic;
            const password = this.$refs.password;
            const passwordConfirm = this.$refs.passwordConfirm;

        }
    }
})
</script>