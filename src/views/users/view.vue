<template>
  <main>
    <v-app>
      <v-container>
        <v-row justify="end">
            <router-link to="/create">
            <v-btn color="primary">Create</v-btn>
            </router-link>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="10"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.updated_at }}</td>
              <td class="text-right">
                <v-btn icon @click="editUser(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteUser(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon @click="viewDetails(item)">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
          {{ snackbarMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn text color="error" v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>

        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title>Delete user</v-card-title>
            <v-card-text>{{ snackbarMessage }}</v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="dialog = false">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </main>
</template>

<script>
import { ref } from 'vue';

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarTimeout = 5000;
const token = localStorage.getItem('access_token');

export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Updated At', value: 'updated_at' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      dialog: false,
      snackbarMessage: '',
    };
  },
  mounted() {
    // Llamar al endpoint para obtener la lista de usuarios
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost/ThiioTest/public/api/v1/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            // Add other headers if needed
          },
        });
        const data = await response.json();
        this.users = data; 
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
    editUser(user) {
      this.$router.push({ name: 'edit', params: { id: user.id } });
    },
    async deleteUser(user) {
      try {
        const response = await fetch(`http://localhost/ThiioTest/public/api/v1/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            // Add other headers if needed
          },
        });

        const responseData = await response.json();

        this.snackbarMessage = responseData.message;
        this.dialog = true;

        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        this.$store.dispatch('showSnackbar', { message: 'Error deleting user.' });
      }
    },
    viewDetails(user) {
      this.$router.push({ name: 'details', params: { id: user.id } });
    },
  },
};
</script>

