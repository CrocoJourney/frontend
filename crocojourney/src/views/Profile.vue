<template>
    <!--Formulaire-->
    <div class="col-md-5 mx-auto text-center">
        <br />
        <h1>Mon Compte</h1>
        <br /><br />
        <form action="">
            <!--Nom/Prenom-->
            <div class="mt-5 mb-3">
                <label for="formNom" class="form-label">Nom*:</label>
                <input :value="lastName" ref="lastName" type="text" class="form-control" id="formNom" />
            </div>
            <div class="mb-5">
                <label for="formPrenom" class="form-label">Prénom*:</label>
                <input :value="firstName" ref="firstName" type="text" class="form-control" id="formPrenom" />
            </div>

            <!--Genre-->
            <fieldset class="mb-5">
                <legend class="col-form-label col-sm-1 pt-0">Genre:</legend>
                <div class="col-sm-4">
                    <div class="form-check">
                        <input
                            ref="women"
                            class="form-check-input"
                            type="radio"
                            name="genreRadios"
                            id="RadioFemme"
                            checked
                        />
                        <label class="form-check-label" for="RadioFemme"> Femme </label>
                    </div>
                    <div class="form-check">
                        <input ref="men" class="form-check-input" type="radio" name="genreRadios" id="Radiohomme" />
                        <label class="form-check-label" for="Radiohomme"> Homme </label>
                    </div>
                </div>
            </fieldset>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Photo-->
            <div class="mt-5 mb-3">
                <label for="formPhoto" class="form-label">Photo :</label>
                <img :src="photoPath" class="img-thumbnail rounded" alt="Photo de profil" />
            </div>
            <div class="mb-5">
                <label for="formFileSm" class="form-label"></label>
                <input
                    @change="photoHandler"
                    ref="photoInput"
                    class="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                />
            </div>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Email/Telephone-->
            <div class="mt-5 mb-3">
                <label for="formEmail" class="form-label">Email*:</label>
                <input :value="email" ref="email" type="text" class="form-control" id="formEmail" />
            </div>
            <div class="mb-5">
                <label for="formTelephone" class="form-label">Numéro de Téléphone*:</label>
                <input :value="phone" ref="phone" type="text" class="form-control" id="formTelephone" />
            </div>

            <!--Notifs-->

            <div class="mb-4 form-check form-switch">
                <input
                    :value="notif"
                    ref="notif"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchNotifs"
                />
                <label class="form-check-label" for="switchNotifs">Voulez-vous activer les notifications ?</label>
            </div>

            <!--Voiture-->
            <div class="mb-4 form-check form-switch">
                <input
                    :value="vehicle"
                    ref="vehicle"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchVoiture"
                />
                <label class="form-check-label" for="switchVoiture">Possédez-vous un véhicule ?</label>
            </div>

            <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

            <!--Mot de passe-->
            <div class="mt-5">
                <label for="pass" class="form-label">Mot de Passe*: (8 caractères minimum):</label>
                <input
                    ref="passInput"
                    type="password"
                    class="form-control"
                    id="pass"
                    name="password"
                    minlength="8"
                    required
                />
            </div>
            <div class="mt-3 mb-5">
                <label for="pass2" class="form-label">Confirmation du Mot de Passe*:</label>
                <input
                    ref="pass2Input"
                    type="password"
                    class="form-control"
                    id="pass2"
                    name="password"
                    minlength="8"
                    required
                />
            </div>

            <!--Bouton Valider-->
            <button @click="updateProfile" type="submit" class="btn btn-success col-md-3 mb-4">Valider</button>
        </form>
    </div>

    <p>* champs obligatoires</p>

    <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

    <div class="col-md-5 mx-auto text-center">
        <br />
        <h1>Modifier mon Mot de Passe</h1>
        <br /><br />

        <div class="mt-5 mb-3">
            <RouterLink class="btn btn-success" to="/resetpassword">Modifier</RouterLink>
        </div>
    </div>

    <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

    <div class="col-md-5 mx-auto text-center">
        <br />
        <h1>Supprimer mon Compte</h1>
        <br /><br />

        <div class="mt-5 mb-3">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalDeleteAccount">
                Supprimer
            </button>
        </div>
    </div>

    <!-- Modal -->
    <div
        class="modal fade"
        id="ModalDeleteAccount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Suppression du Compte</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Êtes-vous sûr de vouloir supprimer votre compte ? Vos données seront définitivement perdues.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-primary" onclick="deleteAccount()">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <p>* champs obligatoires</p>
</template>
<script>
import API from '../scripts/API';
import User from '../scripts/User';
import emitter from '../scripts/emitter';

// definecomponent
export default {
    name: 'Profile',
    data() {
        return {
            firstName: User.currentUser.firstname,
            lastName: User.currentUser.lastname,
            photoPath: API.API_URL + '/static/pictures/' + (User.currentUser?.photoPath ?? 'default.png'),
            email: User.currentUser.mail,
            phone: User.currentUser.phonenumber,
            notif: User.currentUser.mailNotification,
            vehicle: User.currentUser.vehicle,
        };
    },
    methods: {
        photoHandler(event) {
            this.photoPath = window.URL.createObjectURL(event.target.files[0]);
        },
        async updateProfile(event) {
            const formDatas = new FormData();
            formDatas.append('photo', this.$refs.photoInput.files[0]);
            try {
                const res = await API.requestLogged(
                    API.METHOD.POST,
                    '/users/me/profilePicture',
                    formDatas,
                    API.CONTENT_TYPE.FORM_DATA
                );
                console.log(res);
            } catch (e) {
                console.log('error', await e.json());
            }
            await User.currentUser.fetchInfo();
            User.saveToLocalStorage();
            emitter.emit('userUpdated');
        },
    },
    mounted() {
        this.$refs.women.checked = User.currentUser.sex === 'F';
        this.$refs.men.checked = User.currentUser.sex === 'H';
    },
};
</script>
