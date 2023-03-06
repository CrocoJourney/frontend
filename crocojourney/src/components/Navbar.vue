<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="../assets/img/crocojourney.png" width="30" height="30" class="d-inline-block align-top" alt="logo">
      CrocoJourney
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar-list-4">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img :src="photoPath" width="40" height="40" class="rounded-circle" alt="profil">
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
            <RouterLink class="dropdown-item" to="/profile">Profil</RouterLink>
            <button @click="logout" class="dropdown-item">Déconnexion</button>
          </div>
        </li>   
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { defineComponent } from 'vue'
import API from "../scripts/API.js"
export default defineComponent({
  name: 'Navbar',
  data() {
    // si l'utilisateur n'a pas de photo de profil, on affiche l'image par défaut
    return {  
      photoPath: API.API_URL + "/static/pictures/" + (User.currentUser?.photoPath ?? "default.png")
    }
  },
  methods: {
    async logout() {
      const JSONbody = JSON.stringify(
        {
          refresh_token: User.currentUser.refreshToken
        });
      const res = await API.requestLogged(API.METHOD.POST, "/auth/logout", JSONbody);
      if (res.status === 200) {
        User.currentUser = null;
        this.$router.push("/login"); // TODO : vérifier dans le cahier des charges si on doit rediriger vers la page de login ou la page d'accueil
      }
    }
  }
})
</script>