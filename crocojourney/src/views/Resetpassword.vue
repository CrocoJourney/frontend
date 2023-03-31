<template>
    <div class="container text-center">

        <div class="row" style="padding-top: 10%;">
            <div class="border border-primary border-3 rounded"
                style="border-width: thick; border: solid ; border-color: #008c46;">
                <div class="recup">
                    <div style="padding-top: 3%; padding-bottom: 7%;">
                        <h2>Réinitialiser le mot de passe</h2>
                        <img src="../assets/img/crocojourney_moins_haut.png" alt="" style="width: 40%;">
                    </div>

                    <form ref="form" class="form-group">

                        <div class="col-md-8  mx-auto form-floating">
                            <div class="mb-3 col-md-6 mx-auto">
                                <label for="ResetPassword">Mot de passe</label>
                                <input @input="verif" ref="password" type="password" class="form-control" id="ResetPassword"
                                    placeholder="Mot de passe">
                                <small id="helpPassword" class="form-text">Le mot de passe doit contenir au moins 8
                                    caractères</small>
                            </div>

                            <div class="col-md-6 mx-auto" style="padding-top: 3%; padding-bottom: 7%;">
                                <label for="ConfirmPassword">Confirmer le mot de passe</label>
                                <input @input="confirmation" ref="confirmation" type="password" class="form-control"
                                    id="ConfirmPassword" placeholder="Mot de passe">
                            </div>
                        </div>
                        <div class="text-start mt-5 mb-4 col-md-11 mx-auto" id="alertsDiv"></div>

                        <div style="padding-top: 3%; padding-bottom: 3%;">
                            <button @click="send" class="btn btn-primary">Réinitialiser le mot de passe</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';
import API from "../scripts/API.js"
export default defineComponent({
    name: "Resetpassword",
    mounted() {
        const route = useRoute();
        this.token = route.query.token;
        // si on a pas de token dans l'url, on redirige vers la page de login
        if (!this.$route.query.token) {
            // dire qu'il y a un probleme et rediriger vers la page de recuperation de mot de passe
            this.$router.push("/recovery");
        }
    },
    data() {
        return {};
    },
    methods: {
        async send(e) {
            e.preventDefault();
            if (this.verif() && this.confirmation()) {
                e.target.disabled = true;
                try {
                    const body = {
                        "password": this.$refs.password.value,
                        "token": this.token
                    }
                    await API.request(API.METHOD.PATCH, "/auth/reset", JSON.stringify(body))
                    // go to login
                    this.$router.push("/login");
                } catch (error) {
                    const res = await error.json()
                    const detail = res.detail;
                    if (detail == 'Invalid token') {
                        const div = document.querySelector("#alertsDiv");
                        // max two alet size on y axis
                        div.style.maxHeight = "8em";
                        div.style.overflow = "auto";
                        const alert = document.createElement("div");
                        alert.innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><div><strong>Oups !</strong> Le token n'est pas valide ! Veuillez recommencer la procédure. <br><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>";
                        div.appendChild(alert);

                        // delete this node in 5 seconds with an animation
                        setTimeout(() => {
                            // div.removeChild(alert);
                            alert.classList.add("fade");
                            alert.classList.add("out");
                            // delete after animation
                            setTimeout(() => {
                                div.removeChild(alert);
                            }, 500);
                        }, 3000);
                    }
                }
                e.target.disabled = false;
            }
        },
        verif() {
            // verifier que le mot de passe est assez long
            if (this.$refs.password.value.length < 8) {
                this.$refs.password.classList.add("is-invalid");
            } else {
                this.$refs.password.classList.remove("is-invalid");
                this.$refs.password.classList.add("is-valid");
                return true;
            }
        },
        confirmation() {
            if (this.$refs.password.value !== this.$refs.confirmation.value) {
                this.$refs.confirmation.classList.add("is-invalid");
            } else {
                this.$refs.confirmation.classList.remove("is-invalid");
                this.$refs.confirmation.classList.add("is-valid");
                return true;
            }
        }
    },
    components: {}
})
</script>