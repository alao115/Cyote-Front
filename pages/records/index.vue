<template>
  <div>
    <div class="flex justify-between mt-20">
      <h1 class="text-3xl font-bold">
        Enregistrements (
        {{
          filter === 'accepted'
            ? 'Acceptes'
            : filter === 'rejected'
            ? 'Rejectes'
            : 'Tous'
        }}
        )
      </h1>
      <ul class="list-none flex space-x-8">
        <li>
          <a
            href="#"
            class="text-base font-semibold underline"
            @click.prevent="filter = ''"
            >Tout</a
          >
        </li>
        <li>
          <a
            href="#"
            class="text-base font-semibold underline"
            @click.prevent="filter = 'accepted'"
            >Acceptes</a
          >
        </li>
        <li>
          <a
            href="#"
            class="text-base font-semibold underline"
            @click.prevent="filter = 'rejected'"
            >Rejectes</a
          >
        </li>
      </ul>
    </div>
    <div class="mt-4 list__container">
      <ul class="shadow-lg">
        <li
          v-for="record in customizedRecords"
          :key="record._id"
          class="flex items-center p-4 odd:bg-gray-100 justify-between"
        >
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
          <h3 class="flex flex-col font-semibold mr-auto ml-20">
            <span v-if="record.entryPoint.value"
              >Point Entree: {{ record.entryPoint.value.value }}</span
            >
            <span v-if="record.exitPoint.value"
              >Point Sortie: {{ record.exitPoint.value.value }}</span
            >
          </h3>
          <span class="mx-auto underline">{{
            record.scene === 1
              ? 'Radar fixe'
              : record.scene === 2
              ? 'Radar Troncon'
              : 'Limitation'
          }}</span>
          <span class="mx-auto underline">{{ record.date.split('T')[0] }}</span>
          <span v-if="record.user" class="font-semibold underline mx-auto">
            {{
              `${record.user && record.user.firstname} ${
                record.user && record.user.lastname
              }`
            }}
          </span>
          <span v-else class="font-semibold underline mx-auto">Empty</span>
          <edit-record :record="record"></edit-record>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  async asyncData({ app, store }) {
    /* if (process.client) {
      if (store.getters['auth/isLoggedIn']) {
        await store.dispatch('auth/fetchUser')
      }

    } */
    if (store.getters['record/records'].length === 0) {
      await store.dispatch('record/fetchRecords')
    }

    return {}
  },

  data() {
    return {
      filter: '',
    }
  },

  computed: {
    ...mapGetters({
      records: 'record/records',
    }),

    customizedRecords() {
      if (this.filter === 'accepted')
        return this.records.filter((record) => record.isAccepted === true)
      else if (this.filter === 'rejected')
        return this.records.filter((record) => record.isAccepted === false)
      return this.records
    },
  },

  created() {},

  methods: {
    ...mapActions({
      fetchRecord: 'record/fetchRecords',
    }),
  },
}
</script>

<style lang="scss">
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
