<template>
    <div>
    <div  style="margin: 4%; float: none;">
        <h1>Creer un nouveau trajet</h1>
    </div>
    <div>
    <!-- Partie gauche de l'écran -->
        <!-- Partie haute -->
        <div class="col"  style="float: left; width: 50%;">
            <div style="margin-left: 10%;  height: 20%;">
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
            <!-- Partie moyenne -->
            <div style="margin-top: 5%; margin-left: 1%;">
                <div  style="margin-left: 8%;">
                    <h3>Trajet</h3>
                </div>
                
                <!-- Partie moyenne Gauche (dessin) -->
                <div style="width: 100%; height: 100%;">
                    <div class="col overflow-auto" style="width: 25%; float: left; margin-top: 5%;">
                        <h4 style="text-align: center;">Depart <br> <br>|<br>|<br>|<br>|<br>|<br>|<br>|<br><br>Destination </h4>
                    </div>
                    <!-- Partie moyenne droite (destination et étapes) -->
                    <div class="" style="width: 50%; float: left; margin-top: 5%; overflow: scroll">
                        <h4 class="overflow-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius soluta corrupti iusto distinctio harum sit possimus ab aliquid voluptates! Fugiat aliquam enim provident in rem molestias tempora veniam, nisi amet.</h4>
                        <h4 class="overflow-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius soluta corrupti iusto distinctio harum sit possimus ab aliquid voluptates! Fugiat aliquam enim provident in rem molestias tempora veniam, nisi amet.</h4>
                        <h4 class="overflow-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius soluta corrupti iusto distinctio harum sit possimus ab aliquid voluptates! Fugiat aliquam enim provident in rem molestias tempora veniam, nisi amet.</h4>
                    </div>
                </div>   
                <div class="form-check" style="width: 25%; float: none;">
                    <input style="margin-left: 10%; margin-top: 20%;" type="date">
                </div>
            </div>
        </div>

        <!-- Partie droite de l'écran -->
        <div class="col" style="float: left;">
            <div class="mx-5 ">
                <h4>Précisions sur le lieu de rendez-vous</h4>
                <textarea name="" id="" style="resize: none; width: 140%; height: 100px;"></textarea>
                <h4>Contraintes et commentaires</h4>
                <textarea name="" id="" style="resize: none; width: 140%; height: 100px;"></textarea>
                <div style="float: left; width: 100%; margin-top: 5%;">

                    <!-- Places -->
                    <span class="col" style="float:left;width:50%;">
                        <h4>Places</h4>
                        <div class="form-floating" style="width: 80%;">
                            <input ref="login" class="form-control" type="text" id="login" name="login" placeholder="Login">
                        </div>
                    </span>
                

                    <!-- Prix -->
                    <span class="col" style="float:left;width:50%;">
                        <h4>Prix</h4>
                        <div class="form-floating" style="width: 80%;">
                            <input ref="login" class="form-control" type="text" id="login" name="login" placeholder="Login">
                        </div>
                    </span>

                </div>

                <div >
                    <!-- bouton Gerer le départ -->
                    <div class="col" style="float:left;width:50%; margin-top: 10%;">
                        <button class="btn btn-success">Créer le trajet</button>
                    </div>
                    <!-- bouton Retour -->
                    <div class="col" style="float:left;width:50%; margin-top: 10%;">
                        <button class="btn btn-danger">Retour</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

</template>