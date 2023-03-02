<template>
    <div class="container text-center">
  <div class="row">
    <div style="width: 30%;">
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
                    <div class="col-md-8 mx-auto"><input class="form-control" type="text" id="login" name="login"></div>
                    <div></div>
                    
                </div>
                <div class="row">
                    <div></div>
                    <div class="col-md-8 mx-auto" style="padding-top: 3%;"><input class="form-control" type="text" id="password" name="password"></div>
                    <div></div>
                </div>
                
                <div style="padding-top: 13%;">
                    <RouterLink class="" to="/recovery">Mot de passe oublié ?</RouterLink>
                </div>
                <div style="padding-top: 3%;">
                    <RouterLink class="" to="/register">S'inscire</RouterLink>
                </div>
                <div style="padding-top: 3%; padding-bottom: 7%;">
                    <RouterLink class="btn btn-success" to="/profile">Se connecter</RouterLink>
                </div>
                
            </div>
        </div>
        <div class="row">
            <p>column</p>
        </div>
    </div>
    <div style="width: 30%;">
        <p>column</p>
    </div>
  </div>
</div>
</template>