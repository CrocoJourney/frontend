<template>
    <div class="container-fluid text-center">
        <div class="col-md-5 mx-auto">
            <div class="text-start mt-5 mb-4 col-md-11 mx-auto" id="alertsDiv">
                
            </div>
            <h2 class="my-5">Se connecter</h2>
            <img src="../assets/img/crocojourney_moins_haut.png" alt="" class="mx-auto" style="width: 40%;">

            <div class="col-md-8 mx-auto form-floating mt-5">
                <input ref="login" class="form-control" type="email" id="login" name="login" placeholder="Login" required>
                <label for="login" class="form-label">Email <span class="text-danger">*</span></label>
                <div id="loginInvalid" class="invalid-feedback text-start">
                    Veuillez entrer une adresse email valide.
                </div>
            </div>

            <div class="col-md-8 mx-auto form-floating mt-3">
                <input ref="password" class="form-control col-md-8" type="password" id="password"
                    name="password" placeholder="password" required>
                <label for="password" class="form-label">Mot de passe <span class="text-danger">*</span></label>
                <div id="loginInvalid" class="invalid-feedback text-start">
                    Veuillez entrer un mot de passe d'au moins 8 caractères.
                </div>
            </div>

            <div class="mt-4">
                <RouterLink class="text-decoration-none" to="/recovery">Mot de passe oublié ?</RouterLink>
            </div>
            <div class="mt-4">
                <button @click="login" class="btn btn-success">Se connecter</button>
            </div>
            <div class="mt-3">
                <RouterLink class="text-decoration-none" to="/register">S'inscrire</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import API from "../scripts/API.js"
import emitter from "../scripts/emitter.js"
export default defineComponent({
    name: "Login",
    methods: {
        async login() {
            const login = this.$refs.login;
            const password = this.$refs.password;
            login.classList.remove("is-invalid");
            password.classList.remove("is-invalid");
            let valid = true;

            if(login.value.length < 3) {
                login.classList.add("is-invalid");
                valid = false;
            }
            if(password.value.length < 8) {
                password.classList.add("is-invalid");
                valid = false;
            }
            if(!valid) return;
            try {
                await API.login(login, password);
                // on envoie un event pour dire que l'utilisateur s'est connecté pour mettre à jour la navbar
                emitter.emit("userUpdated");
                this.$router.go(-1);
            }
            catch (error) {
                
                document.querySelector("#alertsDiv").innerHTML="<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><div><strong>Oups !</strong> Une erreur est survenue lors de la connexion. (" + error + ")<br><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>"
            }
        }
    }
})

</script>