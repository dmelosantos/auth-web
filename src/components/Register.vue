<template>
  <div id="app">
    <v-app id="login">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Sign Up</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="E-mail"
                      name="username"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-key"
                      type="password"
                      v-model="password"
                    ></v-text-field>

                    <v-text-field
                      label="Phone"
                      name="phone"
                      prepend-icon="mdi-cellphone"
                      type="text"
                      v-model="phone"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="back">Back</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="register">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
import Vue from 'vue';

export default {
  name: 'Register',
  components: {},
  data: () => ({
    password: '',
    email: '',
    phone: '',
  }),
  methods: {
    register() {
      const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

      const params = {
        ClientId: Vue.config.cognitoClientId, /* required */
        Password: this.password, /* required */
        Username: this.email, /* required */
        UserAttributes: [
          {
            Name: 'email',
            Value: this.email,
          },
          {
            Name: 'phone_number',
            Value: this.phone,
          },
        ],
      };
      const router = this.$router;
      const { email } = this;
      identityServiceProvider.signUp(params, (err, data) => {
        if (err) {
          alert(err);
        } else {
          router.push(`/confirm/register/${email}`);
        }
      });
    },

    back() {
      this.$router.push('/');
    },
  },
};
</script>
