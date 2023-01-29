<template>
  <div>
    <button
      class="btn"
      data-bs-toggle="modal"
      :data-bs-target="'#editPatrol_' + patrol._id"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <font-awesome-icon icon="edit"></font-awesome-icon>
    </button>
    <!-- Modal -->
    <div :id="'editPatrol_' + patrol._id" class="modal fade">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="staticBackdropLabel" class="modal-title">
              Modifier patrouilleur
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
              <label :for="'name_' + patrol._id" class="form-label">Nom</label>
              <input
                :id="'name_' + patrol._id"
                v-model.trim.lazy="patrol.firstname"
                type="text"
                class="form-control"
                placeholder="Ex: John"
              />
            </div>
            <div class="mb-3">
              <label :for="'surname_' + patrol._id" class="form-label"
                >Prenom</label
              >
              <input
                :id="'surname_' + patrol._id"
                v-model.trim.lazy="patrol.lastname"
                type="text"
                class="form-control"
                placeholder="Ex: Doe"
              />
            </div>
            <div class="mb-3">
              <label :for="'email_' + patrol._id" class="form-label"
                >Email</label
              >
              <input
                :id="'email_' + patrol._id"
                v-model.trim.lazy="patrol.email"
                type="email"
                class="form-control"
                placeholder="Ex: name@example.com"
              />
            </div>
            <div v-if="0" class="mb-3">
              <label :for="'password_' + patrol._id" class="form-label"
                >Password</label
              >
              <input
                :id="'password_' + patrol._id"
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
              @click.prevent="editPatrol"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    patrolData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      patrol: { ...this.patrolData },
      error: null,
      displayModal: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    ...mapActions({
      editionPatrol: 'patrol/editPatrol',
    }),

    editPatrol() {
      this.editionPatrol({ id: this.patrol._id, data: this.patrol })
        .then((result) => {
          const myModalEl = document.getElementById(
            `editPatrol_${this.patrol._id}`
          )
          // eslint-disable-next-line no-undef
          const modal = bootstrap.Modal.getInstance(myModalEl)
          modal.toggle()
        })
        .catch((err) => {
          this.error = err
        })
    },
  },
}
</script>

<style></style>
