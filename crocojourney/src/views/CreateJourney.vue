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
                        <div class="col-md-9 overflow-auto mt-2 border border-danger" style="overflow-y: scroll; height: 256px;">
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
                    <div>
                        <button class="col ms-3">Ajouter Etape</button>
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