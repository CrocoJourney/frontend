<template>
    <div class="d-flex flex-column align-items-center">
        <div class="d-flex align-items-center">
            <div class="mr-3">
                <h3 class="font-weight-bold">Argent. Ami. Rejoins CrocoJourney</h3>
                <p>Deviens un de nos membres pour proposer ou rejoindre un trajet.</p>

                <div v-if="!User.isLoggedIn()">
                    <RouterLink to="register">
                        <button class="btn btn-success" style="border-radius: 5px">S'inscrire maintenant</button>
                    </RouterLink>
                </div>

            </div>
            <img src="../assets/img/favicon.ico" alt="Description de l'image" class="w-50 h-auto" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import User from "../scripts/User.js"
export default defineComponent({
    name: 'Home',
    setup() {
        return {
          User
        };
    },
});
</script>
