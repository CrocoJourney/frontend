<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center">
                <div class="row mb-4 align-items-center">
                    <h2>{{ this.firstname }} {{ this.lastname }}</h2>
                </div>
                <div class="row justify-content-center">
                    <div class="col-6 col-md-3">
                        <label for="formPhoto" class="form-label"></label>
                        <RouterLink :to="{ name: 'User', params: { id: this.id } }"
                        >
                        <img :src="photoUrl" class="rounded-circle" width="50" height="50" alt="PHOTO" id="formPhoto" />
                        </RouterLink>
                        
                        <a v-if="!this.loading">
                        
                        
                            <a v-if="this.dejaNote(this.id)">
                                <p>Note : </p>
                                <input ref="note" type="number"><p>/5</p>
                                <button class="btn btn-success" @click="noter">Valider note</button>
                            </a>
                            <a v-else>
                                <p>Note actuelle : {{ this.note.rating }}</p>
                                <input ref="note" type="number"><p>/5</p>
                                <button class="btn btn-primary" @click="updateNoter">Changer Note</button>
                                <button class="btn btn-danger" @click="deNoter">Retirer Note</button>
                            </a>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import API from '../scripts/API';

export default defineComponent({
    name: 'Passagers',
    data() {
        return {
            photoUrl: '',
            notationsDejaDonnees: [],
            alreadyNoted: false,
            loading: true,
            note:-1
        };
    },
    mounted() {
        this.photoUrl = `${API.API_URL}/static/pictures/` + (this.photoPath ?? 'default.png');
        this.getReviews();
        
    },
    created(){
        
    },
    finally(){
        console.log("fini")
        
    },
    

    props: {
        id: {
            type: Number,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        photoPath: {
            type: String,
            required: true,
        },
        tripId: {
            type: String,
            required: true,
        },
    },
    methods: {
        async noter(){
            let noteInt = this.$refs.note.value

            let res={
                user_rated: this.id,
                trip_rated: this.tripId,
                rating: Number(noteInt)
            }
            console.log(res);
            let resu= JSON.stringify(res);
            let ras = await API.requestLogged(
                        API.METHOD.POST,
                        '/reviews/',
                        resu,
                        API.CONTENT_TYPE.JSON

                    )
            console.log(ras)
            this.loading = true;
            this.getReviews();
        },
        async updateNoter(){
            let noteInt = this.$refs.note.value

            let res={
                rating: Number(noteInt)
            }
            console.log(res);
            let rousse = this.notationsDejaDonnees.reviews.find(element => element.trip_id == this.tripId && element.rated_id == this.id)
            console.log("hey"+rousse.id)
            let resu= JSON.stringify(res);
            let ras = await API.requestLogged(
                        API.METHOD.PUT,
                        '/reviews/'+rousse.id,
                        resu,
                        API.CONTENT_TYPE.JSON

                    )
            console.log(ras)
            this.loading = true;
            this.getReviews();
        },
        async deNoter(){
            //let noteInt = this.$refs.note.value
            console.log(this.notationsDejaDonnees.reviews);
            let res = this.notationsDejaDonnees.reviews.find(element => element.trip_id == this.tripId && element.rated_id == this.id)
            console.log(res.id);
            let ras = await API.requestLogged(
                        API.METHOD.DELETE,
                        '/reviews/'+res.id,
                        undefined,
                        undefined

                    )
            console.log(ras)
            this.loading = true;
            this.getReviews();
        },
        async getReviews(){
            this.notationsDejaDonnees = await API.requestLogged(
                        API.METHOD.GET,
                        '/reviews/',
                        undefined,
                        undefined

                    )
                    console.log(this.notationsDejaDonnees.reviews)
                    this.loading = false
                    this.note= this.notationsDejaDonnees.reviews.find(element => element.trip_id == this.tripId && element.rated_id == this.id)
        },
        dejaNote(idPersonne){
            console.log(idPersonne)
            console.log(this.tripId)
            console.log( this.notationsDejaDonnees.reviews.some(element => element.trip_id == this.tripId && element.rated_id == idPersonne))
            return !this.notationsDejaDonnees.reviews.some(element => element.trip_id == this.tripId && element.rated_id == idPersonne)
        }
        
    }
});
</script>
