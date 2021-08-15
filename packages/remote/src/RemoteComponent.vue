<template>
  <div>
    test remote component

    <!-- Without this slot everything works just fine. -->
    <slot />
    <!--                                          -->
  </div>
</template>

<script>
export default {
  name: 'RemoteComponent'
};
</script>

<style scoped>

</style>
