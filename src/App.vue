<template>
  <v-app>
    <v-container>
      <v-row justify="end">
        <router-link to="/create">
          <v-btn color="primary">Create</v-btn>
        </router-link>
      </v-row>
      <router-view />
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn text color="error" v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const create = () => {
  // Your create logic goes here
  console.log('Create button clicked!')
}
</script>

<style scoped>
/* Your scoped styles go here */
</style>