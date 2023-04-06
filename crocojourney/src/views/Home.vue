<template>
    <div class="container my-3">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
                <h3 class="font-weight-bold mb-3">Argent. Ami. Rejoins CrocoJourney</h3>
                <p class="mb-4">Deviens un de nos membres pour proposer ou rejoindre un trajet.</p>
                <div v-if="!User.isLoggedIn()">
                    <RouterLink class="btn btn-success btn-lg mb-4" style="border-radius: 5px" to="register">
                        S'inscrire maintenant
                    </RouterLink>
                </div>
            </div>
            <div class="col-md-4">
                <img src="../assets/img/favicon.ico" alt="Description de l'image" class="w-100 h-auto" />
            </div>
            <div v-if="User.isLoggedIn()">
                <SearchBar />
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import User from '../scripts/User.js';
import SearchBar from '../components/SearchBar.vue';
export default defineComponent({
    name: 'Home',
    components: {
        SearchBar,
    },
    setup() {
        return {
            User,
        };
    },
});
</script>
