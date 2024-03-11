<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <div id="app">
    <AppHeader />

    <div class="container mt-3 min-height-body">
        <router-view />
    </div>

    <AppFooter />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>