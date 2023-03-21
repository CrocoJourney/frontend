<script setup>
    //import bootstrap from 'bootstrap'
</script>

<template>
    <div class="text-start mt-5 mb-4 col-md-6 mx-auto" id="alertsDiv">
        <!--<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <div>
                <strong>Oups !</strong> Une erreur est survenue lors de votre inscription.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>-->
    </div>

    <div class="col-md-5 mx-auto text-center">
        <h1 class="mt-3 mb-5">Inscription</h1>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-floating">
                        <input ref="firstName" type="text" class="form-control" id="firstNameInput" placeholder="John" required>
                        <label for="firstNameInput" class="form-label">Prénom <span class="text-danger">*</span></label>
                        <div id="firstNameInvalidFeedback" class="invalid-feedback">
                            Veuillez entrer votre prénom.
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input ref="lastName" type="text" class="form-control" id="lastNameInput" placeholder="Martin" required>
                        <label for="lastNameInput" class="form-label">Nom <span class="text-danger">*</span></label>
                        <div id="lastNameInvalidFeedback" class="invalid-feedback">
                            Veuillez entrer votre nom.
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mx-auto mb-4">
                <h4>Sexe <span class="text-danger">*</span></h4>
                <div class="form-check">
                    <input ref="sex" class="form-check-input" type="radio" name="sexRadio" id="sexRadioHomme" value="H" checked>
                    <label class="form-check-label" for="sexRadioHomme">
                        Homme
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sexRadio" id="sexRadioFemme" value="F">
                    <label class="form-check-label" for="sexRadioFemme">
                        Femme
                    </label>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-floating">
                        <input ref="email" type="email" class="form-control" id="emailInput" placeholder="exemple@mail.com" required>
                        <label for="emailInput" class="form-label">Email <span class="text-danger">*</span></label>
                        <div id="emailInvalidFeedback" class="invalid-feedback">
                            Veuillez entrer un email valide.
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input ref="phone" type="tel" class="form-control" id="phoneInput" placeholder="0000000000" maxlength="12">
                        <label for="phoneInput" class="form-label">Téléphone</label>
                        <div id="phoneInvalidFeedback" class="invalid-feedback">
                            Veuillez entrer un numéro de téléphone valide.
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mx-auto mb-4">
                <div class="form-check form-switch">
                    <input ref="vehicle" class="form-check-input" type="checkbox" id="vehicle">
                    <label class="form-check-label" for="vehicle">
                        Je dispose d'un véhicule
                    </label>
                  </div>
            </div>
            <div class="col-md-6 mx-auto mb-4">
                <div class="mb-3">
                    <label for="profilePicture" class="form-label">Photo de profil (facultative)</label>
                    <input ref="profilePic" class="form-control" type="file" id="profilePicture" accept="image/*">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-floating">
                        <input ref="password" type="password" class="form-control" id="passwordInput" placeholder="f" required>
                        <label for="passwordInput" class="form-label">Mot de passe <span class="text-danger">*</span></label>
                        <div id="passwordInvalidFeedback" class="invalid-feedback">
                            Veuillez entrer un mot de passe constitué d'au moins 8 caractères.
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input ref="passwordConfirm" type="password" class="form-control" id="passwordConfirmInput" placeholder="f" required>
                        <label for="passwordConfirmInput" class="form-label">Confirmer le mot de passe <span class="text-danger">*</span></label>
                        <div id="passwordConfirmInvalidFeedback" class="invalid-feedback">
                            Les mots de passe doivent être identiques.
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-muted">Les champs notés avec une astérisque <span class="text-danger">*</span> sont obligatoires.</p>
            <button @click="register" class="btn btn-success col-md-3 mb-4">Valider</button>
            <p>Vous avez déjà un compte? <RouterLink to="/login" class="text-decoration-none">Connectez-vous</RouterLink>!</p>
        
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import API from "../scripts/API.js"
import emitter from "../scripts/emitter.js"
export default defineComponent({
    name: 'Register',
    methods: {
        async register() {
            const firstName = this.$refs.firstName;
            const lastName = this.$refs.lastName;
            const male = this.$refs.sex;
            const email = this.$refs.email;
            const phone = this.$refs.phone;
            const vehicle = this.$refs.vehicle;
            const profilePic = this.$refs.profilePic;
            const password = this.$refs.password;
            const passwordConfirm = this.$refs.passwordConfirm;
            
            let valid = true;

            firstName.classList.remove("is-invalid");
            lastName.classList.remove("is-invalid");
            email.classList.remove("is-invalid");
            phone.classList.remove("is-invalid");
            password.classList.remove("is-invalid");
            passwordConfirm.classList.remove("is-invalid");
            
            if(firstName.value.length < 1) {
                firstName.classList.add("is-invalid");
                valid = false;
            }
            if(lastName.value.length < 1) {
                lastName.classList.add("is-invalid");
                valid = false;
            }
            if(email.value.length < 3) {
                email.classList.add("is-invalid");
                valid = false;
            }
            if(phone.value.length < 10 || phone.value.length > 12) {
                phone.classList.add("is-invalid");
                valid = false;
            }
            if(password.value.length < 8) {
                password.classList.add("is-invalid");
                valid = false;
            }
            if(password.value != passwordConfirm.value || passwordConfirm.value == "") {
                passwordConfirm.classList.add("is-invalid");
                valid = false;
            }

            const hasVehicle = vehicle.checked;
            const sex = male.checked ? "H" : "F";

            //console.log("Register attempted, as " + firstName.value + " " + lastName.value + " (" + sex + ")\n" + email.value + "\n" + phone.value + "\nHas a vehicle : " + hasVehicle + "\nPlain password : " + password.value + "/ " + passwordConfirm.value + "\nProfile picture : " + profilePic.value);
            if(valid){
                try {
                    //await API.register(firstName.value, lastName.value, sex, email.value, phone.value, hasVehicle, profilePic, password.value, passwordConfirm.value);
                    const formDatas = new FormData();
                    formDatas.append('firstname', firstName.value);
                    formDatas.append('lastname', lastName.value);
                    formDatas.append('mail', email.value);
                    formDatas.append('password', password.value);
                    formDatas.append('confirmPassword', passwordConfirm.value);
                    formDatas.append('car', hasVehicle);
                    formDatas.append('sex', sex);
                    formDatas.append('phonenumber', phone.value);
                    formDatas.append('mailNotification', 'true');
                    formDatas.append('photo', profilePic.files[0]);
                    
                    const res = await API.request(
                        API.METHOD.POST,
                        '/users/',
                        formDatas,
                        undefined,
                        API.CONTENT_TYPE.FORM_DATA
                    );
                    console.log("OK");
                    document.querySelector("#alertsDiv").innerHTML="<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><div><strong>Inscription réussie !</strong> Vous pouvez désormais vous <RouterLink to=\"/login\" class=\"text-decoration-none\">connecter</RouterLink> pour commencer à utiliser CrocoJourney.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>";
                } catch (error) {
                    document.querySelector("#alertsDiv").innerHTML="<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><div><strong>Oups !</strong> Une erreur est survenue lors de votre inscription. (Code " + error.status + " : " + error.statusText + ")<br><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div></div>"
                    this.$router.push({ path: '#' });
                    console.log(error);
                }
            }
        }
    }
})

</script>