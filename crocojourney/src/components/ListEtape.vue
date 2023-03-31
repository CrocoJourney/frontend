<template>
    <div class="mt-4">
        <!-- Input de la ville de départ -->
        <div class="input-group position-relative flex">
            <span class="input-group-text">De :</span>
            <input
                type="text"
                placeholder="Ville de départ"
                id="depart"
                ref="depart"
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


                <!-- Input de la ville d'étape -->
                <br>
                <div class="input-group position-relative flex-nowrap">
            <span class="input-group-text">Etape :</span>
            <input
                ref="inputEtape"
                type="text"
                placeholder="Ville d'étape"
                id="etape"
                name="etape"
                class="form-control basicAutoComplete"
                autocomplete="off"
                v-model.lazy="etapesValue"
                @input="fetchCommunesEtape"
                @keydown.escape="communesEtape = []"
                
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
                v-if="communesEtape.length"
            >
                <li
                    class="list-group-item"
                    v-for="commune in communesEtape"
                    :key="commune.code"
                    @mousedown.prevent="selectCommuneEtape(commune)"
                >
                    {{ commune.nom }} ({{ commune.departement.nom }} - {{ commune.code.slice(0, 2) }})
                </li>
            </ul>
        </div>


        <br>
        <div style="overflow-y:auto; height:200px;">
            <button class="btn btn-secondary" @click="addButton">Ajouter l'étape ici</button>
                <div v-for="(button, index) in buttons" :key="index">
                <label :id="'label_' + index">{{ button.etapesValue }}</label>
                <button class="btn btn-danger" style ="float: right;" :id="'button_suppr' + index" @click="supprButton(index + 1)">Supprimer l'étape</button>
                <br>
                <button class="btn btn-secondary" :id="'button_' + index" @click="addButton(index + 1)">Ajouter l'étape ici</button>
                </div>
            <br>
        </div>

        <!-- Input de la ville d'arrivée -->
        <div class="input-group position-relative flex-nowrap" style="padding-top: 20px;">
            <span class="input-group-text">à :</span>
            <input
                type="text"
                placeholder="Ville d'arrivée"
                id="arrivee"
                ref="arrivee"
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

                



    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: [],
            listeEtapes: [],
            etapesValue: "",
            communesDepart: [],
            communesEtape: [],
            communesArrivee: [],
            choice:{
                depart: '',
                etape: '',
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

        fetchCommunesEtape(event) {
            const searchTerm = event.target.value.trim(); // obtenir la valeur de l'entrée de recherche et supprimer les espaces blancs de début et de fin
            if (searchTerm.length < 3) {
                // si la longueur de la valeur de recherche est inférieure à 3, la liste des communes est effacée et la fonction est interrompue
                this.communesEtape = [];
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
                    this.communesEtape = data; // assignation des données de réponse à la variable communes
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
        selectCommuneEtape(commune) {
            const inputEtape = document.getElementById('etape'); // obtenir l'élément d'entrée de départ en utilisant son ID
            inputEtape.value = `${commune.nom} (${commune.departement.nom} - ${commune.code.slice(0, 2)})`; // affecter la valeur sélectionnée à l'élément d'entrée de départ avec le nom de la commune, le nom du département et le code postal
            this.communesEtape = []; // effacer la liste des communes après la sélection
            this.choice.etape = commune.code;
        },
        selectCommuneArrivee(commune) {
            const inputArrivee = document.getElementById('arrivee'); // obtenir l'élément d'entrée de départ en utilisant son ID
            inputArrivee.value = `${commune.nom} (${commune.departement.nom} - ${commune.code.slice(0, 2)})`; // affecter la valeur sélectionnée à l'élément d'entrée de départ avec le nom de la commune, le nom du département et le code postal
            this.communesArrivee = []; // effacer la liste des communes après la sélection
            this.choice.arrivee = commune.code;
        },

        onAddClick() {
            this.paragraphs.push("yop")
            /** 
            const inputDepart = document.getElementById('depart');
            const inputEtape = document.getElementById('etape');
            const inputArrivee = document.getElementById('arrivee');
            const inputDate = document.getElementById('date');
            const depart = inputDepart.value;
            const etape = inputEtape.value;
            const arrivee = inputArrivee.value;
            const date = inputDate.value;
            if (depart && arrivee && etape && date) {
                this.$router.push({
                    name: 'searchResults',
                    query: {
                        depart: this.choice.depart,
                        etape: this.choice.etape,
                        arrivee: this.choice.arrivee,
                        date: date,
                    },
                });
            }**/
        },
        addButton(index) {
            const newButton = {
                id: index,
                etapesValue: this.etapesValue,
                etapeCode: this.choice.etape
            };
            this.buttons.splice(index, 0, newButton);
            for (let i = index + 1; i < this.buttons.length; i++) {
                const buttonId = document.getElementById(`button_${i}`);
                buttonId.id = `button_${i + 1}`;
            }
            this.etapesValue = "";
            
        },
        supprButton(index) {
            
            this.buttons.splice(index-1,1)
            for (let i = index - 1; i < this.buttons.length; i++) {
                this.buttons[i].id += -1; 
                //const buttonId = document.getElementById(`button_${i}`);
                //buttonId.id = `button_${i}`;
            }
            console.log(this.buttons)
        },
        afficherListeEtape(){
            this.listeEtapes = []
            for (let i = 0 ; i < this.buttons.length; i++) {
                const buttonId = document.getElementById(`button_${i}`);
                console.log(buttonId);
                let codeVille = this.buttons[i].etapeCode
                //codeVille.replace('\'','\"')
                let valLabel={
                    city_id: Number(codeVille),
                    order: i}
                JSON.stringify(valLabel)
                this.listeEtapes.push(valLabel)

                /**valLabel={nomVille, i}
                this.listeEtapes.push(valLabel)
                **/
            }
            console.log(
                    this.listeEtapes
                )
            console.log(this.choice.depart)
            console.log(this.choice.arrivee)
            
        }
    },
};
</script>