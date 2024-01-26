<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'; 
import { useRoute } from 'vue-router'; 
export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute(); 

    console.log('Current Route:', route);

  },
});
</script>

