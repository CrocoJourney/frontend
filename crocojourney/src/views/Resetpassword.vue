<template>
    <div class="container text-center">
        
        <div class="row" style="padding-top: 10%;"> 
            <div class="border border-primary border-3 rounded" style="border-width: thick; border: solid ; border-color: #008c46;">
                <div class="recup">
                    <div style="padding-top: 3%; padding-bottom: 7%;">
                            <h2>Réinitialiser le mot de passe</h2>
                            <img src="../assets/img/crocojourney_moins_haut.png" alt="" style="width: 40%;">
                    </div>

                    <form class="form-group was-validated">
                        <div class="col-md-8  mx-auto form-floating" >
                            <div class="mb-3 col-md-6 mx-auto">
                                <label for="ResetPassword">Mot de passe</label>
                                <input type="password" class="form-control" id="ResetPassword" placeholder="Mot de passe">
                                <small id="helpPassword" class="form-text">Le mot de passe doit contenir au moins 8 caractères</small>
                            </div>
                            
                            <div class="col-md-6" style="padding-top: 3%; padding-bottom: 7%;">
                                <label for="ConfirmPassword">Confirmer le mot de passe</label>
                                <input type="password" class="form-control" id="ConfirmPassword" placeholder="Mot de passe">
                            </div>  
                        </div>
                        
                        <div style="padding-top: 3%; padding-bottom: 7%;">
                            <button type="submit" class="btn btn-primary">Réinitialiser le mot de passe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { defineComponent } from 'vue';
import API from "../scripts/API.js"
export default defineComponent({
    name: "Resetpassword",
    mounted() {
        // si on a pas de token dans l'url, on redirige vers la page de login
        if (!this.$route.query.token) {
            // dire qu'il y a un probleme et rediriger vers la page de recuperation de mot de passe
            this.$router.push("/recovery");
        }
    },
    data() {
        return {};
    },
    methods: {},
    components: {  }
})
</script>