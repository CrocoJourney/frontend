<template>
    <div class="container text-center">
  <div class="row">
    <div style="width: 25%;">
        <p>column</p>
    </div>
    <div class="col">
        <div class="row">
            <div class="h-25">
                <p>column</p>
            </div>
        </div>
        <div class="row" style="padding-top: 10%;">
            <div class="rounded" style="border-width: thick; border: solid ; border-color: #008c46;">
                <h2 style="padding-top: 10%;">Se connecter</h2>
                <img src="../assets/img/crocojourney.png" alt="" style="width: 40%;">
                <div class="row">
                    <div></div>
                    <div><input ref="login" type="text" id="login" name="login"></div>
                    <div></div>
                    
                </div>
                <div class="row">
                    <div></div>
                    <div style="padding-top: 3%;"><input ref="password" type="text" id="password" name="password"></div>
                    <div></div>
                </div>
                <div style="padding-top: 13%;">
                    <a href="">S'inscire</a>
                </div>
                
                <div style="padding-top: 3%; padding-bottom: 7%;">
                    <button @click="login" class="btn btn-success" >Se connecter</button>
                </div>
                
            </div>
        </div>
        <div class="row">
            <p>column</p>
        </div>
    </div>
    <div style="width: 25%;">
        <p>column</p>
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