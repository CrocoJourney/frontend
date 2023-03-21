<template>
<div class="col-md-9 overflow-auto mt-2 border border-danger" style="overflow-y: scroll; height: 256px;">
    <div v-for="itemHaut in items" :key="itemHaut.id">
        <div class="input-group position-relative flex-nowrap">
            <span class="input-group-text">De :</span>
            <input
                
                type="text"
                placeholder="Ville de départ"
                :ref="'input_'+itemHaut.id"
                :id="'input_'+itemHaut.id"
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
                    @mousedown.prevent="selectCommuneDepart($refs['input_'+itemHaut.id], commune)"
                >
                    {{ commune.nom }} ({{ commune.departement.nom }} - {{ commune.code.slice(0, 2) }})
                </li>
            </ul>
        </div>
    </div>
</div>
</template>


<script>
export default{
    data() {
        return{
            communesDepart: [],
        items: [
        { id: 1, text: "Premier élément\n" ,
        communesArrivee: [],
        choice:{
            depart: ''
        }},
        { id: 2, text: "Deuxième élément\n" ,
        communesArrivee: [],
        choice:{
            depart: ''
        }}
        ],
        nextId: 3,

        
        }
    },
    methods: {
        addItem() {
        this.items.push({ id: this.nextId++, text: "Nouvel élément\n",
        communesArrivee: [],
        choice:{
            depart: ''
        } });
        },
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

        selectCommuneDepart(ref,commune) {
            console.log("ref", ref); // Vérifier la valeur de la référence
            console.log('commune:', commune); // Vérifier la commune sélectionnée
            const inputDepart = this.$refs[ref]; // obtenir l'élément d'entrée de départ en utilisant son ID
            
            inputDepart.value = `${commune.nom} (${commune.departement.nom} - ${commune.code.slice(0, 2)})`; // affecter la valeur sélectionnée à l'élément d'entrée de départ avec le nom de la commune, le nom du département et le code postal
            this.communesDepart = []; // effacer la liste des communes après la sélection
            //itemHaut.choice.depart = commune.code;
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
    }

}
</script>