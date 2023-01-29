<template>
  <div>
    <button
      class="
        mx-auto
        focus:outline-none
        hover:bg-green-500
        focus:bg-green-300
        bg-green-300
        rounded-2xl
        px-4
        py-2
        font-semibold
        text-sm
      "
      data-bs-toggle="modal"
      :data-bs-target="'#editrecord_' + record._id"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      Actions
    </button>
    <!-- Modal -->
    <div :id="'editrecord_' + record._id" class="modal fade">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h2
              id="staticBackdropLabel"
              class="modal-title text-2xl font-semibold p-2"
            >
              Enregistrement #{{ record._id }}
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="flex p-4">
            <div class="w-1/2 flex flex-col pr-12">
              <div class="flex items-center mb-4">
                <span
                  class="
                    flex
                    items-center
                    justify-center
                    font-semibold
                    w-14
                    h-14
                    text-xl
                    border-coyoPink border-4
                    rounded-full
                  "
                  >50</span
                >
                <h3 class="flex flex-col font-semibold ml-4 text-lg">
                  <span v-if="record.entryPoint.value"
                    >Point Entree: {{ record.entryPoint.value.value }}</span
                  >
                  <span v-if="record.exitPoint.value"
                    >Point Sortie: {{ record.exitPoint.value.value }}</span
                  >
                </h3>
              </div>
              <div class="flex mb-4">
                <span class="mr-4 underline font-medium">{{
                  record.scene === 1
                    ? 'Radar fixe'
                    : record.scene === 2
                    ? 'Radar Troncon'
                    : 'Limitation'
                }}</span>
                <span v-if="record.direction" class="underline font-medium">{{
                  record.direction === 1 ? 'Mon sens' : 'Deux sens'
                }}</span>
              </div>

              <div class="flex mb-4">
                <span v-if="record.user" class="font-semibold underline">
                  Par
                  {{
                    `${record.user && record.user.firstname} ${
                      record.user && record.user.lastname
                    }`
                  }}
                </span>
                <span v-else class="font-semibold underline">Empty</span>
                <span class="ml-4 underline">
                  le {{ record.date.split('T')[0] }}</span
                >
              </div>

              <div class="flex flex-col mt-auto">
                <button
                  class="btn bg-green-400 p-2 mb-2 font-semibold text-white"
                  @click="editRecord({ isAccepted: true })"
                >
                  Accepter
                </button>
                <button
                  class="btn bg-red-400 p-2 font-semibold text-white"
                  @click="editRecord({ isAccepted: false })"
                >
                  Rejeter
                </button>
              </div>
            </div>
            <div
              class="
                w-1/2
                flex flex-col
                items-center
                justify-center
                bg-gray-200
              "
            >
              <h1 class="text-lg font-semibold">View map</h1>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    record: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      error: null,
      displayModal: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    ...mapActions({
      editionRecord: 'record/editRecord',
    }),

    editRecord(data) {
      this.editionRecord({ id: this.record._id, data })
        .then((result) => {
          const myModalEl = document.getElementById(
            `editrecord_${this.record._id}`
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
