<template>
    <div class="text-start mt-5 mb-4 col-md-6 mx-auto" id="alertsDiv">
    </div>
    <div class="col-md-8 mx-auto pt-5">
        <h1 class="text-center">Créer un nouveau groupe</h1>
        <br><br>
        <div class="form-floating mx-auto col-md-8 mb-3 has-validation">
            <input ref="groupName" type="text" class="form-control" id="groupName" placeholder="Mon super groupe">
            <label for="groupName">Nom du groupe</label>
            <div class="invalid-feedback">
                Veuillez entrer un nom de groupe valide, constitué d'au moins 3 caractères.
            </div>
        </div>

        <div class="d-block h-25 mt-5">
            <div class="row">
                <div class="col px-5">
                    <h3 class="text-center mb-3">Membres actuels</h3>
                    <p ref="emptyText" class="text-muted text-center align-bottom">Vous n'avez pour l'instant ajouté personne au groupe. Utilisez la liste de droite pour ajouter des amis !</p>
                    <ul ref="addedList" class="list-group list-group-flush overflow-y-auto h-50 mt-4">
                    </ul>
                </div>
                <div class="col px-5">
                    <h3 class="text-center">Ajouter des membres</h3>
                    <div class="list-group overflow-y-auto h-50 d-inline-block mt-4" ref="userlist">

                    </div>
                </div>
            </div>
        </div>
        
        <div class="mx-auto col-md-2 mb-5">
            <input name="" @click="creategroup" id="" class="btn btn-success" type="button" value="Créer le groupe">
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import API from "../scripts/API.js"
    import User from '../scripts/User';

    let users = [];
    let addedUsers = [];

    export default defineComponent({
        name: 'GetUsers',
        methods: {
            async get_users() {
                try {
                    users = await API.requestLogged(API.METHOD.GET, "/users/", undefined, undefined);
                    const userlist = this.$refs.userlist;
                    users.forEach(user => {
                        if(user.mail != User.currentUser.mail) {
                            let btn = document.createElement("button");
                            btn.classList.add("list-group-item");
                            btn.classList.add("list-group-item-action");
                            btn.textContent = user.firstname + " " + user.lastname + " (" + user.mail + ")";
                            btn.addEventListener("click", () => this.adduser(user.id));
                            userlist.appendChild(btn);
                        }
                        
                    });
                    
                } catch (error) {
                    console.log(error);
                }
                
            },
            async adduser (id) {

                // On cache le texte disant que personne n'est ajouté
                let emptyText = this.$refs.emptyText;
                emptyText.classList.add("d-none");
                
                // On cherche l'utilisateur à ajouter dans la liste récupérées sur la BDD
                let addeduser;
                users.forEach(user => {
                    if(user.id == id) {
                        addeduser = user;
                    }
                });

                addedUsers.push(addeduser);

                // On crée l'élement à ajouter dans la liste de gauche
                let list = this.$refs.addedList;
                let elem = document.createElement("li");
                elem.classList.add("list-group-item");
                elem.classList.add("fade");
                elem.classList.add("show");
                elem.classList.add("d-flex");
                elem.textContent = addeduser.firstname + " " + addeduser.lastname + " (" + addeduser.mail + ")";

                // On crée le bouton pour supprimer la personne de la liste de gauche
                let closeBtn = document.createElement("button");
                closeBtn.classList.add("btn-close");
                closeBtn.classList.add("ms-auto");
                closeBtn.type = "button";
                closeBtn.addEventListener("click", () => {this.removeuser(addeduser.id)});

                elem.appendChild(closeBtn);
                list.appendChild(elem);
                
                // On trouve et supprime la personne de la liste de droite
                const userlist = this.$refs.userlist;
                let childToDelete;
                let array = Array.from(userlist.children);
                array.forEach (child => {
                    if(child.textContent.includes(addeduser.firstname) && child.textContent.includes(addeduser.lastname) && child.textContent.includes(addeduser.mail)){
                        childToDelete = child;
                    }
                });
                userlist.removeChild(childToDelete);

            },

            async removeuser (id) {

                // On cherche l'utilisateur à ajouter dans la liste récupérées sur la BDD
                let addeduser;
                users.forEach(user => {
                    if(user.id == id) {
                        addeduser = user;
                    }
                });

                addedUsers = addedUsers.filter(item => item !== addeduser);

                // On affiche le texte disant que personne n'est ajouté si tel est le cas
                if(addedUsers.length == 0) {
                    let emptyText = this.$refs.emptyText;
                    emptyText.classList.remove("d-none");
                }
                

                // On crée l'élement à ajouter dans la liste de droite
                let userList = this.$refs.userlist;
                let btn = document.createElement("button");
                btn.classList.add("list-group-item");
                btn.classList.add("list-group-item-action");
                btn.textContent = addeduser.firstname + " " + addeduser.lastname + " (" + addeduser.mail + ")";
                btn.addEventListener("click", () => this.adduser(addeduser.id));
                userList.appendChild(btn);

                // On trouve et supprime la personne de la liste de gauche
                const addedList = this.$refs.addedList;
                let childToDelete;
                let array = Array.from(addedList.children);
                array.forEach (child => {
                    if(child.textContent.includes(addeduser.firstname) && child.textContent.includes(addeduser.lastname) && child.textContent.includes(addeduser.mail)){
                        childToDelete = child;
                    }
                });
                addedList.removeChild(childToDelete);

            },
            async creategroup() {

                const groupname = this.$refs.groupName;
                groupname.classList.remove("is-invalid");

                if(groupname.value.length < 3){
                    groupname.classList.add("is-invalid");
                }

                try {
                    
                    let createRequest = {
                        name : groupname.value
                    }
                    
                    const res = await API.requestLogged(
                        API.METHOD.POST,
                        '/groups/',
                        JSON.stringify(createRequest),
                        API.CONTENT_TYPE.JSON
                    );
                    console.log("OK");
                    let groupId = res.id;

                    let friendsRequest = [];
                    addedUsers.forEach(user => {
                        friendsRequest.push(user.id);
                    });
                    await API.requestLogged(API.METHOD.POST, '/groups/' + groupId + '/friends/', JSON.stringify(friendsRequest), API.CONTENT_TYPE.JSON);
                    
                    
                    //this.$router.push({ path: '/findgroups' });

                    document.querySelector("#alertsDiv").innerHTML="<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><div><strong>Création réussie !</strong> Vous pouvez maintenant ajouter ce groupe à un trajet. <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>";
                } catch (error) {
                    //document.querySelector("#alertsDiv").innerHTML="<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><div><strong>Oups !</strong> Une erreur est survenue lors de votre inscription. (Code " + error.status + " : " + error.statusText + ")<br><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>"
                    console.log(error);
                }
            }
        },
        mounted() {
            this.get_users();
        }
    
    })
</script>