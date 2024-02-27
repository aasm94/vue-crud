<template>
  <v-app>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="user.name" label="Name" required></v-text-field>
        <v-text-field v-model="user.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
        <v-text-field v-model="user.password_confirmation" label="Password Confirmation" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Update</v-btn>
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

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userId = ref(null);
    const router = useRouter();
    const token = localStorage.getItem('access_token');

    const user = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

    const snackbar = ref(false);
    const snackbarMessage = ref('');
    const snackbarTimeout = 5000;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost/ThiioTest/public/api/v1/users/${userId.value}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        user.value = response.data.user;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const submitForm = async () => {
      try {
        const response = await axios.put(`http://localhost/ThiioTest/public/api/v1/users/${userId.value}`, user.value, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        snackbarMessage.value = response.data.message;
        snackbar.value = true;

        // Redirige a la vista de usuarios después de la actualización
        router.push('/users/view');
      } catch (error) {
        snackbarMessage.value = 'Error updating user.';
        snackbar.value = true;
      }
    };

    // Llama a fetchUser cuando el componente se monta
     onMounted(async () => {
      // Verifica si el parámetro 'id' está presente en la ruta
      if ('id' in router.currentRoute.value.params) {
        userId.value = router.currentRoute.value.params.id;
        console.log(userId.value);
        // Llama a la función para obtener el usuario
        await fetchUser();
      }
    });
    return {
      user,
      snackbar,
      snackbarMessage,
      snackbarTimeout,
      submitForm,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos si es necesario */
</style>
