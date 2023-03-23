<template>
    <!--Place Holder Trouvé-->

    <div class="card">
        <div class="card-body">
            <div class="container text-center">
                <div class="row mb-4 align-items-center">
                    <div class="col-12 col-md-5 col-lg-5 text-end fs-5 fw-bold" style="white-space: nowrap">
                        {{ departure }}
                    </div>
                    <div class="col-12 col-md-2 col-lg-2 text-center fs-5 fw-bold">à</div>
                    <div class="col-12 col-md-5 col-lg-5 text-start fs-5 fw-bold" style="white-space: nowrap">
                        {{ arrival }}
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-12 col-md-5 col-lg-5 text-end fs-5 fw-semibold">
                        {{ new Date(time).toLocaleDateString('fr-FR') }}
                    </div>
                    <div class="col-12 col-md-2 col-lg-2 text-center fs-5 fw-bold">-</div>
                    <div class="col-12 col-md-5 col-lg-5 text-start fs-5 fw-semibold">
                        {{ new Date(time).getHours() + ':' + new Date(time).getMinutes().toString().padStart(2, '0') }}
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 col-md-1">
                        <label for="formPhoto" class="form-label"></label>
                        <img :src="photoUrl" class="img-thumbnail" alt="PHOTO" id="formPhoto" />
                    </div>
                </div>

                <div class="row align-items-center">
                    <div class="col-12 col-md-5 col-lg-2 text-end fs-5 fw-semibold">{{ rate }}/5</div>
                    <div class="col-12 col-md-2 col-lg-8 text-center fs-5 fw-bold">{{ title }}</div>
                    <div class="col-12 col-md-5 col-lg-2 text-start fs-5 fw-semibold">{{ price }}$</div>
                </div>
            </div>

            <RouterLink to="#" class="btn btn-primary mt-4 mb-2">Accepter</RouterLink>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import API from '../scripts/API';

export default defineComponent({
    name: 'SearchResults',
    data() {
        return {
            photoUrl: '',
        };
    },
    mounted() {
        this.photoUrl = `${API.API_URL}/static/pictures/${this.photo}`;
    },
    props: {
        departure: {
            type: String,
            required: true,
        },
        arrival: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        rate: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
    },
});
</script>
