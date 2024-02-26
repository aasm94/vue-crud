<template>
  <v-app>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="formData.name" label="Name" required></v-text-field>
        <v-text-field v-model="formData.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="formData.password" label="Password" type="password" required></v-text-field>
        <v-text-field v-model="formData.password_confirmation" label="Password Confirmation" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Submit</v-btn>
      </v-form>

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
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const formData = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarTimeout = 5000;

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost/ThiioTest/public/api/v1/users', formData.value);
    
    snackbarMessage.value = response.data.message;
    snackbar.value = true;

    setTimeout(() => {
      router.push('/users/view');
    }, snackbarTimeout);
  } catch (error) {
    snackbarMessage.value = error;
    snackbar.value = true;
  }
};
</script>

<style scoped>
/* Your scoped styles go here */
</style>
