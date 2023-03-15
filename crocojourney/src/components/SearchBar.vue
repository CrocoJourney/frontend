<template>
    <div class="d-flex align-items-center mb-1">
        <!-- Input de la ville de départ -->
        <div class="input-group position-relative flex-nowrap">
            <span class="input-group-text">De :</span>
            <input
                type="text"
                placeholder="Ville de départ"
                id="depart"
                name="depart"
                class="form-control basicAutoComplete"
                autocomplete="off"
                @input="fetchCommunesDepart"
                @keydown.escape="communesDepart = []"
            />
            <!-- Liste des communes proposées en autocomplete -->
            <ul
                class="list-group mb-3"
                style="
                    position: absolute;
                    top: 100%;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-top: none;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                "
                v-if="communesDepart.length"
            >
                <li
                    class="list-group-item"
                    v-for="commune in communesDepart"
                    :key="commune.code"
                    @mousedown.prevent="selectCommuneDepart(commune)"
                >
                    {{ commune.nom }} ({{ commune.departement.nom }} - {{ commune.code.slice(0, 2) }})
                </li>
            </ul>
        </div>

        <!-- Input de la ville d'arrivée -->
        <div class="input-group position-relative flex-nowrap">
            <span class="input-group-text">à :</span>
            <input
                type="text"
                placeholder="Ville d'arrivée"
                id="arrivee"
                name="arrivee"
                class="form-control basicAutoComplete"
                autocomplete="off"
                @input="fetchCommunesArrivee"
                @keydown.escape="communesArrivee = []"
            />

            <!-- Liste des communes proposées en autocomplete -->
            <ul
                class="list-group mb-3"
                style="
                    position: absolute;
                    top: 100%;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-top: none;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                "
                v-if="communesArrivee.length"
            >
                <li
                    class="list-group-item"
                    v-for="commune in communesArrivee"
                    :key="commune.code"
                    @mousedown.prevent="selectCommuneArrivee(commune)"
                >
                    {{ commune.nom }} ({{ commune.departement.nom }} - {{ commune.code.slice(0, 2) }})
                </li>
            </ul>
        </div>
        <!-- Input de la date de départ -->
        <div class="input-group me-1">
            <span class="input-group-text">Date :</span>
            <input type="date" id="date" name="date" class="form-control" />
        </div>
        <!-- Bouton de recherche -->
        <button class="btn btn-success" @click="onSearchClick">Rechercher</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            communesDepart: [],
            communesArrivee: [],
            choice:{
                depart: '',
                arrivee: '',
                date: ''
            }
        };
    },
    methods: {
        fetchCommunesArrivee(event) {
            const searchTerm = event.target.value.trim(); // obtenir la valeur de l'entrée de recherche et supprimer les espaces blancs de début et de fin
            if (searchTerm.length < 3) {
                // si la longueur de la valeur de recherche est inférieure à 3, la liste des communes est effacée et la fonction est interrompue
                this.communesArrivee = [];
                return;
            }
            let apiUrl;
            if (Number.isInteger(parseInt(searchTerm))) {
                // si la valeur de recherche peut être convertie en nombre, l'API de recherche par code postal est utilisée
                apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${searchTerm}&fields=nom,code,departement&boost=population&limit=5`;
            } else {
                // sinon, l'API de recherche par nom de ville est utilisée
                apiUrl = `https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code,departement&boost=population&limit=5`;
            }
            fetch(apiUrl) // envoi de la demande à l'API
                .then((response) => response.json()) // analyse de la réponse JSON de l'API
                .then((data) => {
                    this.communesArrivee = data; // assignation des données de réponse à la variable communes
                })
                .catch((error) => console.error(error)); // en cas d'erreur, la console affiche le message d'erreur
        },

        fetchCommunesDepart(event) {
            const searchTerm = event.target.value.trim(); // obtenir la valeur de l'entrée de recherche et supprimer les espaces blancs de début et de fin
            if (searchTerm.length < 3) {
                // si la longueur de la valeur de recherche est inférieure à 3, la liste des communes est effacée et la fonction est interrompue
                this.communesDepart = [];
                return;
            }
            let apiUrl;
            if (Number.isInteger(parseInt(searchTerm))) {
                // si la valeur de recherche peut être convertie en nombre, l'API de recherche par code postal est utilisée
                apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${searchTerm}&fields=nom,code,departement&boost=population&limit=5`;
            } else {
                // sinon, l'API de recherche par nom de ville est utilisée
                apiUrl = `https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code,departement&boost=population&limit=5`;
            }
            fetch(apiUrl) // envoi de la demande à l'API
                .then((response) => response.json()) // analyse de la réponse JSON de l'API
                .then((data) => {
                    this.communesDepart = data; // assignation des données de réponse à la variable communes
                })
                .catch((error) => console.error(error)); // en cas d'erreur, la console affiche le message d'erreur
        },

        selectCommuneDepart(commune) {
            const inputDepart = document.getElementById('depart'); // obtenir l'élément d'entrée de départ en utilisant son ID
            inputDepart.value = `${commune.nom} (${commune.departement.nom} - ${commune.code.slice(0, 2)})`; // affecter la valeur sélectionnée à l'élément d'entrée de départ avec le nom de la commune, le nom du département et le code postal
            this.communesDepart = []; // effacer la liste des communes après la sélection
            this.choice.depart = commune.code;
        },
        selectCommuneArrivee(commune) {
            const inputArrivee = document.getElementById('arrivee'); // obtenir l'élément d'entrée de départ en utilisant son ID
            inputArrivee.value = `${commune.nom} (${commune.departement.nom} - ${commune.code.slice(0, 2)})`; // affecter la valeur sélectionnée à l'élément d'entrée de départ avec le nom de la commune, le nom du département et le code postal
            this.communesArrivee = []; // effacer la liste des communes après la sélection
            this.choice.arrivee = commune.code;
        },

        onSearchClick() {
            const inputDepart = document.getElementById('depart');
            const inputArrivee = document.getElementById('arrivee');
            const inputDate = document.getElementById('date');
            const depart = inputDepart.value;
            const arrivee = inputArrivee.value;
            const date = inputDate.value;
            if (depart && arrivee && date) {
                this.$router.push({
                    name: 'searchResults',
                    query: {
                        depart: this.choice.depart,
                        arrivee: this.choice.arrivee,
                        date: date,
                    },
                });
            }
        },
    },
};
</script>
