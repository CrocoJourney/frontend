<template>
    <!--Formulaire-->
    <div class="col-md-5 mx-auto text-center">
        <br />
        <h1>Mon Compte</h1>
        <div>Votre moyenne : {{ this.moyenne }} / 5</div>
        <br /><br />
        <!--Nom/Prenom-->
        <div class="mt-5 mb-3">
            <label for="formNom" class="form-label">Nom:</label>
            <input ref="lastName" type="text" class="form-control" id="formNom" v-model.value="lastName" />
        </div>
        <div class="mb-5">
            <label for="formPrenom" class="form-label">Prénom:</label>
            <input v-model.value="firstName" ref="firstName" type="text" class="form-control" id="formPrenom" />
        </div>

        <!--Genre-->
        <fieldset class="mb-5">
            <legend class="col-form-label col-sm-1 pt-0">Genre:</legend>
            <div class="col-sm-4">
                <div class="form-check">
                    <input
                        ref="women"
                        class="form-check-input form-check-success"
                        type="radio"
                        name="genreRadios"
                        id="RadioFemme"
                        checked
                        v-model="sex"
                        value="F"
                    />
                    <label class="form-check-label" for="RadioFemme"> Femme </label>
                </div>
                <div class="form-check">
                    <input
                        ref="men"
                        class="form-check-input"
                        type="radio"
                        name="genreRadios"
                        id="Radiohomme"
                        v-model="sex"
                        value="H"
                    />
                    <label class="form-check-label" for="Radiohomme"> Homme </label>
                </div>
            </div>
        </fieldset>

        <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

        <!--Photo-->
        <div class="mt-5 mb-3">
            <label for="formPhoto" class="form-label">Photo :</label>
            <img :src="photoPath" class="img-thumbnail rounded w-25 h-25" alt="Photo de profil" />
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
            <label for="formEmail" class="form-label">Email:</label>
            <input v-model.value="email" ref="email" type="text" class="form-control" id="formEmail" />
        </div>
        <div class="mb-5">
            <label for="formTelephone" class="form-label">Numéro de Téléphone:</label>
            <input v-model.value="phone" ref="phone" type="text" class="form-control" id="formTelephone" />
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
                v-model="notif"
            />
            <label class="form-check-label" for="switchNotifs">Voulez-vous activer les notifications ?</label>
        </div>

        <!--Voiture-->
        <div class="mb-4 form-check form-switch">
            <input
                :value="vehicule"
                ref="vehicule"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="switchVoiture"
                v-model="vehicule"
            />
            <label class="form-check-label" for="switchVoiture">Possédez-vous un véhicule ?</label>
        </div>

        <div class="h4 pb-5 mb-4 mx-auto col-md-8 text-light border-bottom border-light border-2"></div>

        <!-- Mot de passe -->
        <div class="mt-5">
            <label for="pass" class="form-label">Nouveau mot de passe :</label>
            <input ref="passInput" type="password" class="form-control" id="pass" name="password" minlength="8" />
        </div>
        <div class="mt-3 mb-5">
            <label for="pass2" class="form-label">Confirmation du nouveau mot de passe :</label>
            <input ref="pass2Input" type="password" class="form-control" id="pass2" name="password" minlength="8" />
        </div>

        <!--Bouton Valider-->
        <button type="button" class="btn btn-success col-md-3 mb-2 mt-2" @click="updateProfile">Valider</button>

        <!-- Message d'alerte -->
        <div class="alert alert-success" role="alert" v-if="showAlert">Vos informations ont bien été modifiés!</div>
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
                    <button @click="deleteAccount" class="btn btn-success">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
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
            vehicule: User.currentUser.car,
            sex: User.currentUser.sex,
            password: User.currentUser.password,
            confirmPassword: User.currentUser.password,
            showAlert: false,
            moyenne: -1
        };
    },
    methods: {
        async deleteAccount(event) {
            API.requestLogged(API.METHOD.DELETE, `/users/${User.currentUser.id}`, undefined, API.CONTENT_TYPE.JSON);
            User.currentUser = null;
            User.saveToLocalStorage(User.currentUser);
            emitter.emit('userUpdated');
            this.$router.replace('/');
            await this.redirectToHomePage();
        },
        async redirectToHomePage() {
            await this.$router.push('/');
            this.$router.go();
        },

        photoHandler(event) {
            this.photoPath = window.URL.createObjectURL(event.target.files[0]);
        },
        async updateProfile(event) {
            this.showAlert = true;

            // Masquer l'alerte après 2 secondes
            setTimeout(() => {
                this.showAlert = false;
            }, 2000);
            const formDatas = new FormData();
            formDatas.append('photo', this.$refs.photoInput.files[0]);

            const userData = {
                firstname: this.$refs.firstName.value,
                lastname: this.$refs.lastName.value,
                mail: this.$refs.email.value,
                phonenumber: this.$refs.phone.value,
                sex: this.sex,
                car: this.vehicule,
                mailNotification: this.notif,
            };

            // si le password a été modifié on ajoute dans userData le nouveau password
            if (this.$refs.passInput.value !== '') {
                if (this.$refs.passInput.value.length < 8) {
                    window.alert('Le mot de passe doit contenir au moins 8 caractères');
                } else if (this.$refs.passInput.value === this.$refs.pass2Input.value) {
                    userData.password = this.$refs.passInput.value;
                    userData.confirmPassword = this.$refs.pass2Input.value;
                } else {
                    window.alert('Les mots de passe ne correspondent pas');
                }
            }
            try {
                const res = await API.requestLogged(
                    API.METHOD.PATCH,
                    '/users/me',
                    JSON.stringify(userData),
                    API.CONTENT_TYPE.JSON
                );
            } catch (error) {
                window.alert('Erreur lors de la mise à jour des infos de profil');
            }

            // si la photo a été modifiée on la met à jour
            if (this.$refs.photoInput.files.length > 0) {
                try {
                    const res = await API.requestLogged(
                        API.METHOD.POST,
                        '/users/me/profilePicture',
                        formDatas,
                        API.CONTENT_TYPE.FORM_DATA
                    );
                } catch (e) {
                    window.alert('Erreur lors de la mise à jour de la photo de profil');
                }
            }

            await User.currentUser.fetchInfo();
            User.saveToLocalStorage();
            emitter.emit('userUpdated');
        },
        async getMoyenne(){
            let tmp = await API.requestLogged(
                    API.METHOD.GET,
                    '/reviews/me',
                    undefined,
                    undefined
                );

                this.moyenne = tmp.avg;
        }
    },
    mounted() {
        this.$refs.women.checked = User.currentUser.sex === 'F';
        this.$refs.men.checked = User.currentUser.sex === 'H';
        this.getMoyenne();
        console.log(this.photoPath)
    },
};
</script>
