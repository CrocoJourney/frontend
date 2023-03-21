<template>
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

        <div class="row mt-5 mb-5">
            <div class="col px-5">
                <h3 class="text-center mb-3">Membres actuels</h3>
                <p class="text-muted text-center h-50 align-bottom d-inline-block">Vous n'avez pour l'instant ajouté personne au groupe. Utilisez la liste de droite pour ajouter des amis !</p>
                <ul class="list-group list-group-flush overflow-y-auto h-75 d-inline-block mt-4">
                    <!--<li class="list-group-item fade show d-flex">An item <button type="button" class="btn-close ms-auto " aria-label="Close"></button></li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>-->
                </ul>
            </div>
            <div class="col px-5">
                <h3 class="text-center">Ajouter des membres</h3>
                <div class="list-group overflow-y-auto h-75 d-inline-block mt-4" ref="userlist">

                </div>
            </div>
        </div>

        <div class="mx-auto col-md-2 mt-3">
            <input name="" id="" class="btn btn-success" type="button" value="Créer le groupe">
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import API from "../scripts/API.js"
    export default defineComponent({
        name: 'GetUsers',
        methods: {
            async get_users() {
                try {
                    const res = await API.requestLogged("GET", "/users/", undefined, API.METHOD.GET);
                    const userlist = this.$refs.userlist;
                    res.forEach(user => {
                        console.log(user);
                        let btn = document.createElement("button");
                        btn.classList.add("list-group-item");
                        btn.classList.add("list-group-item-action");
                        btn.textContent = user.firstname + " " + user.lastname + " (" + user.mail + ")";
                        userlist.appendChild(btn);
                    });
                    
                } catch (error) {
                    console.log(error);
                    
                }
                
            }
        },
        mounted() {
            this.get_users();
        }
    
    })
</script>