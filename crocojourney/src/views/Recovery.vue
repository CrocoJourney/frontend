<template>
    <div class="container text-center">
        <div class="recup">
            <div style="padding-top: 3%; padding-bottom: 7%;">
                    <h2>Recuperation du mot de passe</h2>
                    <img src="../assets/img/crocojourney.png" alt="" style="width: 40%;">
            </div>

            <form class="form-group was-validated">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control" type="email" id="email" aria-describedby="email" placeholder="Entrez votre mail" required>
                    <div class="invalid-feedback">
                        Entrez votre adresse mail svp!
                    </div>    
                </div>

            <button type="submit" class="btn btn-primary">Envoyer</button>
            </form>
        </div>
    </div>
    
</template>