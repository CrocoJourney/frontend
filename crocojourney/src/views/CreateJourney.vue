<template>
    <div class="w-auto">
        <div  style="margin: 3%; float: none;">
            <h1>Créer un nouveau trajet</h1>
        </div>
        <div class="row col-md-12">
        <!-- Partie gauche de l'écran -->
            <!-- Partie haute -->
            <div class="col">
                <div style="margin-left: 10%;  height: 20%;">
                    <h4>Votre trajet est <span class="text-danger">*</span></h4>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="typeRadio" id="typeRadioPublique" checked>
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
                <div style="margin-top: 4%; margin-left: 1%;">
                    <div  style="margin-left: 8%;">
                        <h3>Trajet</h3>
                    </div>
                    
                    <!-- Partie moyenne Gauche (dessin) -->
                    <div class="">
                        <div class="col overflow-auto" style="width: 25%; float: left; margin-top: 5%;">
                            <p style="text-align: center;">Départ <br> <br>|<br>|<br>|<br>|<br>|<br>|<br>|<br><br>Destination </p>
                        </div>
                        <!-- Partie moyenne droite (destination et étapes) -->
                        <div class="overflow-auto" style="overflow-y: scroll; max-height: 200px;">
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
                        </div>
                    </div>   
                    
                    </div>
                    <div class="form-check" style="width: 25%; float: none;">
                        <input class="form-control" type="date">
                    </div>
            </div>

            <!-- Partie droite de l'écran -->
            <div class="col">
                <div class="mx-5 ">
                    <h4>Précisions sur le lieu de rendez-vous</h4>
                    <textarea class="form-control mb-4" rows="3" name="" id="" style="resize: none;"></textarea>
                    <h4>Contraintes et commentaires</h4>
                    <textarea class="form-control mb-4" rows="3" style="resize: none;"></textarea>
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

                    <div >
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
export default defineComponent({
    name: 'Login',
    methods: {
        async login() {
            const login = this.$refs.login.value;
            const password = this.$refs.password.value;
            if(!login || !password) return window.alert("Veuillez remplir tous les champs");
            try {
                await API.login(login, password);
                // on envoie un event pour dire que l'utilisateur s'est connecté pour mettre à jour la navbar
                emitter.emit('userUpdated');
                this.$router.push({ path: '/' });
            } catch (error) {
                const json = await error.json();
                console.log(json);
                window.alert(json.detail);
            }
        }
    }
})

</script>