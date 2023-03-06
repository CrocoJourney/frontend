<template>
    <div class="container text-center">
  <div class="row">
    <div style="width: 30%;">
        <p></p>
    </div>
    <div class="col">
        <div class="row">
            <div class="h-25">
                <p></p>
            </div>
        </div>
        <div class="row" style="padding-top: 10%;">
            <div class="rounded" style="border-width: thick; border: solid ; border-color: #008c46;">
                <h2 style="padding-top: 10%;">Se connecter</h2>
                <img src="../assets/img/crocojourney.png" alt="" style="width: 40%;">
                <div class="row">
                    <div></div>
                        <div class="col-md-8 mx-auto form-floating">
                            <input class="form-control" type="text" id="login" name="login" placeholder="Login">
                            <label for="login" class="form-label">Prénom</label>
                        </div>
                    <div></div>
                    
                </div>
                <div class="row">
                    <div style="padding-top: 5%;"></div>
                        <div class="col-md-8 mx-auto form-floating">
                            <input class="form-control col-md-8" type="password" id="password" name="password" placeholder="password">
                            <label for="password" class="form-label">Prénom</label>
                        </div>
                    <div></div>
                </div>
                
                <div style="padding-top: 13%;">
                    <RouterLink class="" to="/recovery">Mot de passe oublié ?</RouterLink>
                </div>
                <div style="padding-top: 3%;">
                    <RouterLink class="" to="/register">S'inscrire</RouterLink>
                </div>
                <div style="padding-top: 3%; padding-bottom: 7%;">
                    <button @click="login" class="btn btn-success" >Se connecter</button>
                </div>
                
            </div>
        </div>
        <div class="row">
            <p></p>
        </div>
    </div>
    <div style="width: 30%;">
        <p></p>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import API from "../scripts/API.js"
export default defineComponent({
    name: 'Login',
    methods: {
        async login() {
            const login = this.$refs.login.value;
            const password = this.$refs.password.value;
            if(!login || !password) return window.alert("Veuillez remplir tous les champs");
            try {
                await API.login(login, password);
                this.$router.push({ path: '/' });
            } catch (error) {
                const json = await error.json();
                console.log(json);
                window.alert(json.detail);
            }
        }
    }
})

</script>