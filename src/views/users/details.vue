<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>Details</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Name</v-list-item-title>
                <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Created At</v-list-item-title>
                <v-list-item-subtitle>{{ user.created_at }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Updated At</v-list-item-title>
                <v-list-item-subtitle>{{ user.updated_at }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="goBack" color="primary">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

const token = localStorage.getItem('access_token');

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchUserDetails(userId) {
      try {
        const response = await axios.get(`http://localhost/ThiioTest/public/api/v1/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.user = response.data.user;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUserDetails(userId);
  }
};
</script>

<style scoped>
/* Puedes personalizar estilos aquí si es necesario */
</style>
