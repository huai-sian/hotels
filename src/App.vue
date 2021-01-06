<template>
  <div id="app">
    <loading :active.sync='isLoading'>
    </loading>
    <transition mode='out-in' name='fade'>
      <router-view :key="$router.fullPath"></router-view>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
  computed: {
    ...mapState(['isLoading']),
  },
};
</script>
<style lang="scss">
.fade-enter{
    opacity: 0;
}
.fade-enter-to{
    opacity: 1;
}
.fade-enter-active{
    transition:opacity 0.4s;
}
.fade-leave{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
}
.fade-leave-active{
    transition:opacity 0.4s;
}
@import "./assets/reset";
</style>
