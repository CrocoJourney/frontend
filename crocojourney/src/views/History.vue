<template>
    <div class="container-fluid vh-100">
        <div class="row" style="margin-top: 3%;">
            <figure class="text-center">
                <p class="h1">Historique des trajets</p>
            </figure>
        </div>

        <div class="row">
            <div class="container-fluid" style="margin-top: 2%;">
                <figure class="text-center">
                    <p class="h2">Mes trajets en tant que passager</p>
                </figure>
                <div class="col-md-8" style="width: auto; margin-left: 1%; margin-right: 1%;">
                    <div class="scrollable">
                        <div class="card">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4 class="card-title" style="margin: auto">Titre:</h4>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-10">
                                                    <div class="container-fluid">
                                                        <div class="row" style="margin-top: 1%;">
                                                            <div class="col-md-6">
                                                                <p class="card-text">Ville départ:</p>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <p class="card-text">Ville d'arrivée:</p>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-bottom: 1%;">
                                                            <div class="col-md-12">
                                                                <p class="card-text">Date départ:</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    
                                                </div>
                                                <div class="col">
                                                    <a href="#" class="btn btn-success">Noter</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="container-fluid" style="margin-top: 4%;">
                <figure class="text-center">
                    <p class="h2">Mes trajets en tant que conducteur</p>
                </figure>
                <div class="col-md-8" style="width: auto; margin-left: 1%; margin-right: 1%;">
                    <div class="scrollable">
                        <div class="card">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4 class="card-title" style="margin: auto">Titre:</h4>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-10">
                                                    <div class="container-fluid">
                                                        <div class="row" style="margin-top: 1%;">
                                                            <div class="col-md-6">
                                                                <p class="card-text">Ville départ:</p>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <p class="card-text">Ville d'arrivée:</p>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-bottom: 1%;">
                                                            <div class="col-md-12">
                                                                <p class="card-text">Date départ:</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    
                                                </div>
                                                <div class="col">
                                                    <a href="#" class="btn btn-success">Noter</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import API from "../scripts/API.js"
    import emitter from "../scripts/emitter.js"
    export default defineComponent({

    })
</script>

<style>
    .scrollable{
      height: calc(50vh - 3.5rem);
      overflow-y: auto;
    }    
</style>