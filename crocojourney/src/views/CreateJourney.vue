<template>
    <p>test</p>
    <div>
    <!-- Partie gauche de l'écran -->
        <div class="col" style="width: 50%; float: left;">
            <div class="mx-5">
                <h4>Votre trajet est <span class="text-danger">*</span></h4>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="typeRadio" id="typeRadioPublique" checked>
                    <label class="form-check-label" for="typeRadioPublique">
                        Publique
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input " type="radio" name="typeRadio" id="typeRadioPrive">
                    <label class="form-check-label" for="typeRadioPrive">
                        Privé
                    </label>
                </div>
            </div>
        </div>
        <!-- Partie droite de l'écran -->
        <div class="col" style="width: 50%; float: left;">
            <div class="mx-5 text-center">
                <p>Précisions sur le lieu de rendez-vous</p>
                <textarea name="" id="" cols="15" rows="4"></textarea>
                <p>Contraintes et commentaires</p>
                <textarea name="" id="" cols="15" rows="4"></textarea>
                <!-- Places -->
                <div class="col">
                    <p>Places</p>

                </div>
                <!-- Prix -->
                <div class="col">
                    <p>Prix</p>

                </div>
                <!-- bouton Gerer le départ -->
                <div class="col">
                    <button>Créer le trajet</button>
                </div>
                <!-- bouton Retour -->
                <div class="col">
                    <button>Retour</button>
                </div>
            </div>
        </div>
    </div>

</template>