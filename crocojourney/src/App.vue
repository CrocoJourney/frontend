<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue'
export default defineComponent({
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    return {
    }
  }
})
</script>