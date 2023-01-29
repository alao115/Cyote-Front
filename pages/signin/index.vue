<template>
  <div
    class="
      mx-auto
      flex flex-col
      justify-center
      w-1/3
      mt-32
      pt-0
      border-2 border-gray-100
      rounded-md
      overflow-hidden
    "
  >
    <h1 class="bg-gray-300 text-2xl p-3 font-bold text-center">Signin</h1>
    <form class="p-4" @submit.prevent="signin">
      <div
        v-if="error"
        class="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Danger:"
        >
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <strong class="ml-1">Attention!</strong>
        {{ error && error.message }}
        <button
          type="button"
          class="btn-close ml-auto"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label font-semibold">Email</label>
        <input
          id="email"
          v-model.trim="admin.email"
          type="email"
          class="form-control"
          placeholder="Ex: name@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label font-semibold">Password</label>
        <input
          id="password"
          v-model.trim="admin.password"
          type="password"
          class="form-control"
        />
      </div>
      <div class="mb-2">
        <button class="btn btn-primary font-semibold" :disabled="isFormValid">
          Se Connecter
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'isUserLoggedIn',
  // eslint-disable-next-line require-await
  async asyncData({ $axios, store }) {
    /* const response = await $axios.post(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBapw9wgDxJlO46-kYX5_kZUH0R7ifOEfQ'
    )

    console.log('Google API: ', response.data) */
    return {}
  },

  data() {
    return {
      admin: {},
      error: null,
    }
  },

  computed: {
    isFormValid() {
      return !this.admin.email || !this.admin.password
    },
  },

  methods: {
    ...mapActions({
      signinAdmin: 'authCustom/signin',
    }),

    signin() {
      this.signinAdmin(this.admin)
        .then((result) => {
          this.$router.push({ name: 'records' })
          this.error = null
          this.admin = {}
        })
        .catch((err) => {
          this.error = err
        })
    },
  },
}
</script>

<style></style>
