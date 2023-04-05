<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <span class="navbar-brand mb-0 h1">
          <img src="../assets/img/crocojourney.png" width="40" height="40" class="d-inline-block align-text-center"
            alt="logo">
          CrocoJourney
        </span>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-list-4"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div v-if="User.isLoggedIn()" class="collapse navbar-collapse" id="navbar-list-4">
        <ul class="navbar-nav me-auto mb-1">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdownTrajet" role="button"
              data-bs-toggle="dropdown" aria-expanded="false" style="color:white; font-size: medium;">
              Trajets
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <RouterLink class="dropdown-item" to="/createjourney">Créer un trajet</RouterLink>
              <RouterLink class="dropdown-item" to="/currenttrips">Mes trajets en cours</RouterLink>
              <RouterLink class="dropdown-item" to="/history">Historique de mes trajets</RouterLink>
            </ul>
          </li>
          <li class="nav-item dropdown" style="padding-left: 4px;">
            <a class="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdownGroupes" role="button"
              data-bs-toggle="dropdown" aria-expanded="false" style="color:white; font-size: medium;">
              Groupes
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <RouterLink class="dropdown-item" to="/creategroup">Créer un groupe</RouterLink>
              <RouterLink class="dropdown-item" to="/listgroup">Liste de mes groupes</RouterLink>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">

          <li class="nav-item dropdown" style="padding-right: 4px;">
            <a @click="this.getNotifications"
              class="nav-link dropdown-toggle d-flex align-items-center custom-dropdown-toggle" id="navbarBellNotif"
              role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:white;">
              <i class="bi bi-bell icon-size-bell"></i>
              <sup>
                <span class="badge bg-danger" v-if="count > 0">{{ count }}</span>
              </sup>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <span v-for="notification in notifications">
                <li v-if="notification.action" class="dropdown-item" style="position: relative;">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column">
                      <h5 class="mb-1" style="margin-top: 1%;">Nouveau participant</h5>
                      <p class="mb-1" style="font-size: .9rem;">{{ notification.content }}</p>
                      <div class="d-flex justify-content-between align-items-center" style="margin-top: 2%;">
                        <button @click="acceptNotif(notification.ressourceUrl, notification.sender_id, notification.id)"
                          class="btn btn-success btn-sm" style="margin-left: 10%;">Accepter</button>
                        <button @click="refuseNotif(notification.ressourceUrl, notification.sender_id, notification.id)"
                          class="btn btn-danger btn-sm" style="margin-right: 10%;">Refuser</button>
                      </div>
                      <button @click="deleteNotif(notification.id)" class="btn p-0">
                        <i class="bi bi-x-square-fill text-danger icon-size-x"
                          style="position: absolute; top: 0; right: 4%;"></i>
                      </button>
                    </div>
                  </div>
                <li class="dropdown-divider"></li>
                </li>
                <li v-else class="dropdown-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column">
                      <h5 class="mb-1 text-center">{{notification.subject}}</h5>
                      <p class="mb-1" style="font-size: .9rem;">{{ notification.content }}</p>
                      <button class="btn p-0">
                        <i class="bi bi-x-square-fill text-danger icon-size-x"
                          style="position: absolute; top: 0; right: 4%;"></i>
                      </button>
                    </div>
                  </div>
                <li class="dropdown-divider"></li>
                </li>
              </span>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center custom-dropdown-toggle" id="navbarDropdownProfil"
              role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:white;">
              <img :src="photoPath" width="40" height="40" class="rounded-circle" alt="profil">
            </a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <RouterLink class="dropdown-item" to="/profile">Profil</RouterLink>
              <button @click="logout" class="dropdown-item">Déconnexion</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="collapse navbar-collapse" id="navbar-list-4">
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

let intervalID;
export default defineComponent({
  name: "Navbar",
  async mounted() {
    emitter.on("userUpdated", () => {
      this.photoPath = API.API_URL + "/static/pictures/" + (User.currentUser?.photoPath ?? "default.png");
      this.$forceUpdate();
      clearInterval(intervalID);
      intervalID = setInterval(this.refreshCount, 15000);
    });
    if (User.isLoggedIn() == true) {
      this.refreshCount();
      intervalID = setInterval(this.refreshCount, 15000);
    }
  },
  data() {
    // si l'utilisateur n'a pas de photo de profil, on affiche l'image par défaut
    return {
      photoPath: API.API_URL + "/static/pictures/" + (User.currentUser?.photoPath ?? "default.png"),
      User,
      count: "",
      notifications: []
    };
  },
  methods: {
    //Permet de mettre a jour le nombre notifications dans le badge
    async refreshCount() {
      try {
        const res = await API.requestLogged(API.METHOD.GET, "/users/me/notifications/count", undefined, undefined);
        this.count = res.count;
      } catch (error) {
        clearInterval(intervalID);
      }
    },
    async getNotifications() {
      this.notifications = await API.requestLogged(API.METHOD.GET, "/users/me/notifications", undefined, undefined);
      this.refreshCount();
    },
    async logout() {
      try {
        await User.logout();
        this.$forceUpdate();
        clearInterval(intervalID)
        this.$router.push("/");
      }
      catch (error) {
        window.alert("Erreur lors de la deconnexion");
      }
    },
    deleteNotif(idNotif) {
      API.requestLogged(API.METHOD.DELETE, '/users/me/notifications/' + idNotif, undefined, undefined);
      this.refreshCount();
    },
    acceptNotif(idTrip, idPassenger, idNotif) {
      API.requestLogged(API.METHOD.POST, idTrip + '/accept/' + idPassenger, undefined, undefined);
      this.deleteNotif(idNotif);
      this.refreshCount();
    },
    refuseNotif(idTrip, idPassenger, idNotif) {
      API.requestLogged(API.METHOD.POST, idTrip + '/refuse/' + idPassenger, undefined, undefined);
      this.deleteNotif(idNotif);
      this.refreshCount();
    }
  }
})
</script>


<style>
.icon-size-bell {
  font-size: 25px;
}

.icon-size-x {
  font-size: 20px;
}

.dropdown-menu {
  max-height: 35vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.custom-dropdown-toggle::after {
  display: none;
}

.dropdown-item {
  width: 18rem;
  overflow: visible;
  white-space: normal;
}

.dropdown-item:focus,
.dropdown-item:active {
  outline: none !important;
  box-shadow: none !important;
  background-color: white;
  color: black;
}
</style>