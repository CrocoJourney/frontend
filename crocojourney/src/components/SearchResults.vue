<template>

    <!--Place Holder Trouvé-->

    <div class="card">
      
      <div class="card-body">
        
          <div class="container text-center">
              <!-- Stack the columns on mobile by making one full-width and the other half-width -->
              <div class="row mb-4">
                <div class="col-6 col-md-5 text-end fs-3 fw-bold">Nancy</div>
                <div class="col-1 text-center fs-3 fw-bold">à</div>
                <div class="col-1 text-start fs-3 fw-bold">Metz</div>
                <div class="col-4 fs-3 fw-semibold">08:00</div>
              </div>
            
              <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
              <div class="row">
                  <div class="col-6 col-md-1">
                      <label for="formPhoto" class="form-label"></label>
                      <img src="" class="img-thumbnail" alt="PHOTO" id="formPhoto">
                  </div>
              </div>
            
              <!-- Columns are always 50% wide, on mobile and desktop -->
              <div class="row mt-4">
                <div class="col-6 col-md-3 text-end fs-5">Bob</div>

                <!--NOTE-->
                <div class="col-1 fs-5 fw-lighter text-end">4.5</div>
                <div class="col-1 fs-5 fw-lighter text-start">/5</div>

                <div class="col-5 text-end fs-1 fw-bolder">10</div>
                <div class="col-1 text-start fs-1 fw-bolder">€</div>

              </div>
            </div>

        <RouterLink to="#" class="btn btn-primary mt-4 mb-2">Ajouter</RouterLink>
      </div>
    </div>




    <!--Place Holder Vide-->
    
    <div class="card" aria-hidden="true">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
      </div>
    </div>

    
</template>