<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="username" label="Username" required></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                <v-btn type="submit" color="primary" block>Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>

          <!-- Register button -->
          <v-card>
            <v-card-title class="text-center">Register</v-card-title>
            
            <v-card-text>
              <v-btn @click="goToRegister" color="success" block>Register</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import router from '@/router'; // Adjust the path based on your project structure

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost/ThiioTest/public/api/auth/login', {
          email: this.username,
          password: this.password,
        });

        // Assuming the response contains an access_token
        const accessToken = response.data.access_token;

        // Store the access token (you may want to use Vuex or localStorage)
        localStorage.setItem('access_token', accessToken);

        // After successful login, you can redirect to the main view
        router.push('/users/view');
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure, show error message, etc.
      }
    },
    goToRegister() {
      // Redirect to the register view
      router.push('/create');
    },
  },
};
</script>