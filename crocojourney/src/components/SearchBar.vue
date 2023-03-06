<template>
    <div class="d-flex align-items-center mb-1">
        <div class="input-group me-1">
            <span class="input-group-text">De :</span>
            <input
                type="text"
                placeholder="Ville de départ"
                id="depart"
                name="depart"
                class="form-control basicAutoComplete"
                autocomplete="on"
                @input="fetchCommunes"
                :list="communesListId"
            />
        </div>
        <div class="input-group me-1">
            <span class="input-group-text">à :</span>
            <input
                type="text"
                placeholder="Ville d'arrivée"
                id="arrivee"
                name="arrivee"
                class="form-control basicAutoComplete"
                autocomplete="on"
                @input="fetchCommunes"
                :list="communesListId"
            />
        </div>
        <div class="input-group me-1">
            <span class="input-group-text">Date :</span>
            <input type="date" id="date" name="date" class="form-control" />
        </div>
        <button class="btn btn-success">Rechercher</button>

        <datalist :id="communesListId">
            <option v-for="commune in communes" :value="commune.nom"></option>
        </datalist>
    </div>
</template>

<script>
export default {
    data() {
        return {
            communes: [],
            communesListId: 'communesList',
        };
    },
    methods: {
        fetchCommunes(event) {
            const searchTerm = event.target.value;
            const apiUrl = `https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=departement&boost=population&limit=5`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => (this.communes = data))
                .catch((error) => console.error(error));
        },
    },
};
</script>
