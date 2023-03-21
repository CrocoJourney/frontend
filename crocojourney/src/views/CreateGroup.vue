<template>
    <div class="col-md-8 mx-auto pt-5">
        <h1 class="text-center">Créer un nouveau groupe</h1>
        <br><br>
        <div class="form-floating mx-auto col-md-8 mb-3 input-group has-validation">
            <input ref="groupName" type="text" class="form-control" id="groupName" placeholder="Mon super groupe">
            <label for="groupName">Nom du groupe</label>
            <div class="invalid-feedback">
                Veuillez entrer un nom de groupe valide, constitué d'au moins 3 caractères.
            </div>
        </div>

        <div class="row mt-5">
            <div class="col px-5">
                <h3 class="text-center mb-3">Membres actuels</h3>
                <ul class="list-group list-group-flush mt-3">
                    <p class="text-muted text-center">Vous n'avez pour l'instant ajouté personne au groupe. Utilisez la liste de droite pour ajouter des amis !</p>
                    <!--<li class="list-group-item fade show d-flex">An item <button type="button" class="btn-close ms-auto " aria-label="Close"></button></li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>-->
                </ul>
            </div>
            <div class="col px-5">
                <h3 class="text-center">Ajouter des membres</h3>
                <div class="list-group">
                    <button type="button" class="list-group-item list-group-item-action ">A button item</button>
                    <button type="button" class="list-group-item list-group-item-action">A second button item</button>
                    <button type="button" class="list-group-item list-group-item-action">A third button item</button>
                    <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
                    <button type="button" class="list-group-item list-group-item-action">And a fifth one</button>
                </div>
            </div>
        </div>

        <br><br>

        <p ref="test"></p>

        <div class="mx-auto col-md-2">
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
                const test = this.$refs.test;
                
                try {
                    await API.requestLogged("GET", "/users/", undefined, undefined);
                    console.log("OK");
                    
                } catch (error) {
                    const json = await error.json();
                    
                }
                
            }
        },
        mounted() {
            this.get_users();
        }
    
    })
</script>