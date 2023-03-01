<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
