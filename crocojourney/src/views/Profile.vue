<template>
    <!--Formulaire-->
    <div class="col-md-5 mx-auto text-center">
        <br><h1>Mon Compte</h1><br><br>
        <form action="">

            <!--Nom/Prenom-->
            <div class="mb-3">
                <label for="formNom" class="form-label">Nom*:</label>
                <input type="text" class="form-control" id="formNom" placeholder="Bob">
            </div>
            <div class="mb-3">
                <label for="formPrenom" class="form-label">Prénom*:</label>
                <input type="text" class="form-control" id="formPrenom" placeholder="Bob">
            </div>

            <!--Genre-->
            <fieldset class="mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Genre:</legend>
                <div class="col-sm-10">
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
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="genreRadios" id="Radionondet">
                    <label class="form-check-label" for="Radionondet">
                      Non-determiné
                    </label>
                  </div>
                </div>
            </fieldset>
            

            <!--Photo-->
            <div class="mb-3">
              <label for="formPhoto" class="form-label">Photo :</label>
              <img src="" class="img-thumbnail" alt="PHOTO" id="formPhoto">
            </div>
            <div class="mb-3">
                <label for="formFileSm" class="form-label"></label>
                <input class="form-control form-control-sm" id="formFileSm" type="file">
            </div>



            <!--Notifs-->
            <fieldset class="mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Notifications:</legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="NotifRadio" id="Radioactivees" checked>
                    <label class="form-check-label" for="Radioactivees">
                      Activées
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="NotifRadio" id="Radiodesactivees">
                    <label class="form-check-label" for="Radiodesactivees">
                      Désactivées
                    </label>
                  </div>
                </div>
            </fieldset>


            <!--Email/Telephone-->
            <div class="mb-3">
                <label for="formEmail" class="form-label">Email*:</label>
                <input type="text" class="form-control" id="formEmail" placeholder="Bob@bob.com">
            </div>
            <div class="mb-3">
                <label for="formTelephone" class="form-label">Numéro de Téléphone*:</label>
                <input type="text" class="form-control" id="formTelephone" placeholder="Numero">
            </div>

            <!--Voiture-->
            <fieldset class="mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Voiture:</legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="VoitureRadios" id="Radiooui" checked>
                    <label class="form-check-label" for="Radiooui">
                      Oui
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="VoitureRadios" id="Radionon">
                    <label class="form-check-label" for="Radionon">
                      Non
                    </label>
                  </div>
                </div>
            </fieldset>

            <!--Mot de passe-->
            <div class="mb-3">
                <label for="pass" class="form-label">Mot de Passe*: (8 caractères minimum):</label>
                <input type="password" class="form-control" id="pass" name="password"  minlength="8" required>
            </div>
            <div class="mb-3">
                <label for="pass2" class="form-label">Confirmation du Mot de Passe*:</label>
                <input type="password" class="form-control" id="pass2" name="password"  minlength="8" required>
            </div>

            <!--Bouton Valider-->
            <button type="submit" class="btn btn-success col-md-3 mb-4">Valider</button>

        </form>
    </div>

    

    <p>* champs obligatoires</p>
</template>