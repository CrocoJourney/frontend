<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center">
                <div class="row mb-4 align-items-center">
                    <h2>{{ this.firstname }} {{ this.lastname }}</h2>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 col-md-3">
                        <label for="formPhoto" class="form-label"></label>
                        <img :src="photoUrl" class="rounded-circle" width="50" height="50" alt="PHOTO" id="formPhoto" />
                    </div>
                </div>
            </div>
            <div v-if="user.id === driver" class="text-center mt-4">
                <button type="button" class="btn btn-outline-success me-2" @click="accept">Accept</button>
                <button type="button" class="btn btn-outline-danger ms-2" @click="refuse">Refuse</button>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import API from '../scripts/API';
import User from '../scripts/User';

export default defineComponent({
    name: 'Candidats',
    data() {
        return {
            photoUrl: '',
            user: User.currentUser,
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
        driver: {
            type: Number,
            required: true,
        },
    },
    methods: {
        accept() {
            API.requestLogged(API.METHOD.POST, `/trips/${this.tripId}/accept/${this.id}`).then(() => {
                window.location.reload();
            });
        },
        refuse() {
            API.requestLogged(API.METHOD.POST, `/trips/${this.tripId}/refuse/${this.id}`).then(() => {
                window.location.reload();
            });
        },
    },
});
</script>
