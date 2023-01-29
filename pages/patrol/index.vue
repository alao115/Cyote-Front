<template>
  <div>
    <div class="flex justify-between mt-20">
      <h1 class="text-3xl font-bold">Patrouilleurs</h1>
      <button
        class="flex focus:outline-none underline p-1 items-center"
        data-bs-toggle="modal"
        data-bs-target="#addPatrol"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span class="ml-2">Ajouter patrouilleurs</span>
      </button>
      <!-- Modal -->
      <div id="addPatrol" class="modal fade">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="staticBackdropLabel" class="modal-title">
                Nouveau patrouilleurs
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                <label for="name" class="form-label">Nom</label>
                <input
                  id="name"
                  v-model.trim.lazy="patrol.firstname"
                  type="text"
                  class="form-control"
                  placeholder="Ex: John"
                />
              </div>
              <div class="mb-3">
                <label for="surname" class="form-label">Prenom</label>
                <input
                  id="surname"
                  v-model.trim.lazy="patrol.lastname"
                  type="text"
                  class="form-control"
                  placeholder="Ex: Doe"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model.trim.lazy="patrol.email"
                  type="email"
                  class="form-control"
                  placeholder="Ex: name@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  id="password"
                  v-model.lazy="patrol.password"
                  type="password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                class="
                  btn
                  bg-coyoGreen
                  border-coyoGreen
                  focus:bg-coyoGreen
                  focus:ring-2 focus:ring-green-300
                  hover:bg-coyoGreen
                "
                :disabled="isFormValid"
                @click.prevent="createPatrols"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 list__container">
      <ul class="shadow-xl">
        <li
          v-for="patrol in patrols"
          :key="patrol._id"
          class="flex items-center p-4 odd:bg-gray-100 justify-between"
        >
          <h3 class="font-semibold text-coyoGreen">
            {{ `${patrol.firstname} ${patrol.lastname}` }}
          </h3>
          <span>{{ patrol.email }}</span>
          <span class="font-semibold underline"
            >{{ getRecords(patrol.email).length }} enregistrements</span
          >
          <div class="flex">
            <!-- <button class="btn">
              <font-awesome-icon icon="edit"></font-awesome-icon>
            </button> -->
            <edit-patrol :patrol-data="patrol"></edit-patrol>
            <button class="btn" @click="deletePatrol(patrol._id)">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  middleware: 'auth',

  async asyncData({ app, store }) {
    /* if (store.getters['auth/isLoggedIn']) {
      await store.dispatch('auth/fetchUser')
    } */

    if (store.getters['patrol/patrols'].length === 0) {
      await store.dispatch('patrol/fetchPatrols')
    }

    return {}
  },

  data() {
    return {
      patrol: {},
      error: null,
    }
  },

  computed: {
    ...mapGetters({
      patrols: 'patrol/patrols',
      records: 'record/records',
    }),

    isFormValid() {
      return (
        !this.patrol.firstname ||
        !this.patrol.lastname ||
        !this.patrol.email ||
        !this.patrol.password
      )
    },
  },

  created() {},

  methods: {
    ...mapActions({
      addPatrols: 'patrol/addPatrols',
      fetchPatrols: 'patrol/fetchPatrols',
      deletePatrolData: 'patrol/deletePatrol',
    }),

    createPatrols() {
      this.err = null
      this.addPatrols(this.patrol)
        .then((result) => {
          this.patrol = {}

          const myModalEl = document.getElementById('addPatrol')
          // eslint-disable-next-line no-undef
          const modal = bootstrap.Modal.getInstance(myModalEl)
          modal.toggle()
        })
        .catch((err) => {
          this.error = err
        })
    },
    deletePatrol(id) {
      this.deletePatrolData(id)
    },
    getRecords(email) {
      return this.records.filter((record) => record.user?.email === email)
    },
  },
}
</script>

<style scoped lang="scss">
.list__container {
  max-height: 45rem;
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
