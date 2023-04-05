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
                        <img :src="photoUrl" class="rounded-circle" width="50" height="50" alt="PHOTO" id="formPhoto" />
                        <p>Note : </p>
                        <input ref="note" type="number"><p>/5</p>
                        <button class="btn btn-success" @click="noter">Valider note</button>
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
        };
    },
    mounted() {
        this.photoUrl = `${API.API_URL}/static/pictures/` + (this.photoPath ?? 'default.png');
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
        }
        
    }
});
</script>
