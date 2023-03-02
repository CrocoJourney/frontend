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
    <div v-if="User?.isLoggedIn()" class="collapse navbar-collapse" id="navbar-list-4">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle" alt="profil">
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
            <RouterLink class="dropdown-item" to="/profile">Profil</RouterLink>
            <RouterLink class="dropdown-item" to="/logout">Déconnexion</RouterLink>
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
export default defineComponent({
    name: 'Navbar',
    setup() {
        return {
        }
    }
})
</script>