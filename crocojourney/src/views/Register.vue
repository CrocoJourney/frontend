<script setup>
    //import bootstrap from 'bootstrap'
</script>

<template>
    <div class="col-md-5 mx-auto text-center">
        <br><h1>Inscription</h1><br><br>
        <form action="">
            <div class="row mb-4">
                <div class="col">
                    <div class="form-floating">
                        <input type="firstName" class="form-control" id="firstNameInput" placeholder="John">
                        <label for="firstNameInput" class="form-label">Prénom</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input type="lastName" class="form-control" id="lastNameInput" placeholder="Martin">
                        <label for="lastNameInput" class="form-label">Nom</label>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mx-auto mb-4">
                <h4>Sexe</h4>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sexRadio" id="sexRadioHomme" checked>
                    <label class="form-check-label" for="sexRadioHomme">
                        Homme
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sexRadio" id="sexRadioFemme">
                    <label class="form-check-label" for="sexRadioFemme">
                        Femme
                    </label>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-floating">
                        <input type="email" class="form-control" id="emailInput" placeholder="exemple@mail.com">
                        <label for="emailInput" class="form-label">Email</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input type="tel" class="form-control" id="phoneInput" placeholder="0000000000" maxlength="12">
                        <label for="phoneInput" class="form-label">Téléphone</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mx-auto mb-4">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Je dispose d'un véhicule
                    </label>
                  </div>
            </div>
            <div class="col-md-6 mx-auto mb-4">
                <div class="mb-3">
                    <label for="formFile" class="form-label">Photo de profil (facultative)</label>
                    <input class="form-control" type="file" id="formFile" accept="image/*">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-floating">
                        <input type="password" class="form-control" id="passwordInput" placeholder="f">
                        <label for="passwordInput" class="form-label">Mot de passe</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input type="password" class="form-control" id="passwordConfirmInput" placeholder="f">
                        <label for="passwordConfirmInput" class="form-label">Confirmer le mot de passe</label>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-success col-md-3 mb-4">Valider</button>
            <p>Vous avez déjà un compte? <RouterLink to="/login" class="text-decoration-none">Connectez-vous</RouterLink>!</p>
        </form>
    </div>
</template>