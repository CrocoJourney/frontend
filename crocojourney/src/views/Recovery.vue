<template>
    <div class="container text-center">
        <div class="row" style="padding-top: 10%">
            <div class="rounded" style="border-width: thick; border: solid; border-color: #008c46">
                <div class="recup">
                    <div style="padding-top: 3%; padding-bottom: 7%">
                        <h2>Récuperation du mot de passe</h2>
                        <img src="../assets/img/crocojourney_moins_haut.png" alt="" style="width: 40%" />
                    </div>

                    <form class="form-group was-validated">
                        <div class="col-md-8 mx-auto form-floating">
                            <div class="mb-3 col-md-6 mx-auto">
                                <label class="form-label" for="email">Email</label>
                                <input
                                    class="form-control"
                                    type="email"
                                    id="email"
                                    ref="email"
                                    aria-describedby="email"
                                    placeholder="Entrez votre mail"
                                    required
                                />
                            </div>

                            <div class="invalid-feedback">Entrez votre adresse mail svp!</div>
                        </div>

                        <div style="padding-top: 3%; padding-bottom: 7%">
                            <button @click="reset" class="btn-success" to="/reset">Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../scripts/API.js';
import emitter from '../scripts/emitter.js';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Reset',
    methods: {
        async reset(e){
            e.preventDefault()
            const email=this.$refs.email.value;
            if(!email) return window.alert("Veuillez remplir ce champ");
            try {
                await API.reset(email);
                //this.$router.push({ path: '/reset' });
            } catch (error) {
                //const json = await error.json();
                console.log(error);
                //window.alert(json.detail);
            }
        }
    },
});
</script>
