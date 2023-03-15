<template>
    <div>
        <div class="col-md-5 mx-auto text-center"></div>
        <h1>Voulez-vous vraiment Supprimer votre compte ?</h1>
        <p>Cette opération est irréversible.</p>

        <div class="row">
            <div class="btn btn-success" onclick="deleteAccount()">Supprimer</div>
            <RouterLink class="btn btn-success" to="/profile">Retour</RouterLink>

        </div>

    </div>

</template>

<script>
import { defineComponent } from 'vue';
import API from "../scripts/API.js"
import emitter from "../scripts/emitter.js"
import User from '../scripts/User';
export default defineComponent({
    name: 'DeleteAccount',

    deleteAccount(){
        //supprimer les datas
        User.currentUser.lastname= NULL ;
        User.currentUser.firstname= NULL ;
        User.currentUser.phonenumber= NULL ;
        User.currentUser.mail= NULL ;
        User.currentUser.sex= NULL ;
        User.currentUser.notif= NULL ;
        User.currentUser.vehicle = NULL ;
        User.currentUser.profilePic = NULL ;

        

        //deconnecte l'utilisateur
        User.currentUser.isLoggedIn(0);

        return;
    }
})

</script>