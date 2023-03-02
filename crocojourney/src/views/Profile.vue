<template>
    <!--Formulaire-->
    <div class="col-md-5 mx-auto text-center">
        <br><h1>Mon Compte</h1><br><br>
        <form action="">

            <!--Nom/Prenom-->
            <div class="mt-5 mb-3">
                <label for="formNom" class="form-label">Nom*:</label>
                <input type="text" class="form-control" id="formNom" placeholder="Bob">
            </div>
            <div class="mb-5">
                <label for="formPrenom" class="form-label">Prénom*:</label>
                <input type="text" class="form-control" id="formPrenom" placeholder="Bob">
            </div>

            <!--Genre-->
            <fieldset class="mb-5">
                <legend class="col-form-label col-sm-1 pt-0">Genre:</legend>
                <div class="col-sm-4">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="genreRadios" id="RadioFemme" checked>
                    <label class="form-check-label" for="RadioFemme">
                      Femme
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="genreRadios" id="Radiohomme">
                    <label class="form-check-label" for="Radiohomme">
                      Homme
                    </label>
                  </div>
                </div>
            </fieldset>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Photo-->
            <div class="mt-5 mb-3">
              <label for="formPhoto" class="form-label">Photo :</label>
              <img src="" class="img-thumbnail" alt="PHOTO" id="formPhoto">
            </div>
            <div class="mb-5">
                <label for="formFileSm" class="form-label"></label>
                <input class="form-control form-control-sm" id="formFileSm" type="file">
            </div>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Email/Telephone-->
            <div class="mt-5 mb-3">
                <label for="formEmail" class="form-label">Email*:</label>
                <input type="text" class="form-control" id="formEmail" placeholder="Bob@bob.com">
            </div>
            <div class="mb-5">
                <label for="formTelephone" class="form-label">Numéro de Téléphone*:</label>
                <input type="text" class="form-control" id="formTelephone" placeholder="Numero">
            </div>


            <!--Notifs-->

            <div class="mb-4 form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="switchNotifs">
              <label class="form-check-label" for="switchNotifs">Voulez-vous activer les notifications ?</label>
            </div>

            <!--Voiture-->
            <div class="mb-4 form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="switchVoiture">
              <label class="form-check-label" for="switchVoiture">Possédez-vous un véhicule ?</label>
            </div>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Mot de passe-->
            <div class="mt-5">
                <label for="pass" class="form-label">Mot de Passe*: (8 caractères minimum):</label>
                <input type="password" class="form-control" id="pass" name="password"  minlength="8" required>
            </div>
            <div class="mt-3 mb-5">
                <label for="pass2" class="form-label">Confirmation du Mot de Passe*:</label>
                <input type="password" class="form-control" id="pass2" name="password"  minlength="8" required>
            </div>

            <!--Bouton Valider-->
            <button type="submit" class="btn btn-success col-md-3 mb-4">Valider</button>

        </form>
    </div>

    

    <p>* champs obligatoires</p>
</template>