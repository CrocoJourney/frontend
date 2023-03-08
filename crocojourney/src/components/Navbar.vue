<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">
      <img src="../assets/img/crocojourney.png" width="40" height="40" class="d-inline-block align-text-top" alt="logo">
      CrocoJourney
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div v-if="User.isLoggedIn()" class="collapse navbar-collapse" id="navbar-list-4">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img :src="photoPath" width="40" height="40" class="rounded-circle" alt="profil">
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
            <RouterLink class="dropdown-item" to="/profile">Profil</RouterLink>
            <RouterLink class="dropdown-item" to="/history">Historique des trajets</RouterLink>
            <button @click="logout" class="dropdown-item">Déconnexion</button>
          </div>
        </li>   
      </ul>
    </div>
    <div v-else class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <RouterLink class="nav-link active" to="/register">Inscription</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link active" to="/login">Connexion</RouterLink>
            </li>
        </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { defineComponent } from 'vue'
import API from "../scripts/API.js"
import User from "../scripts/User.js"
import emitter from "../scripts/emitter.js"
export default defineComponent({
  name: 'Navbar',
  mounted() {
    emitter.on('userUpdated', () => {
      this.photoPath = API.API_URL + "/static/pictures/" + (User.currentUser?.photoPath ?? "default.png");
      this.$forceUpdate();
    })
  },
  data() {
    // si l'utilisateur n'a pas de photo de profil, on affiche l'image par défaut
    return {  
      photoPath: API.API_URL + "/static/pictures/" + (User.currentUser?.photoPath ?? "default.png"),
      User
    }
  },
  methods: {
    async logout() {
      const JSONbody = JSON.stringify(
        {
          refresh_token: User.currentUser.refreshToken
        });
      const res = await API.requestLogged(API.METHOD.POST, "/auth/logout", JSONbody);
      // TODO : refacto dans User.js
      if (res.message === "ok") {
        User.currentUser = undefined;
        localStorage.removeItem('user');
        this.$forceUpdate();
        this.$router.push("/login"); // TODO : vérifier dans le cahier des charges si on doit rediriger vers la page de login ou la page d'accueil
      }
    }
  }
})
</script>