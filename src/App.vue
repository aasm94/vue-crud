<template>
  <v-app>
    <v-container>
      
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
</script>
