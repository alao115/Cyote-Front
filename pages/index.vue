<template>
  <div class="container"></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    return redirect('/records')
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
