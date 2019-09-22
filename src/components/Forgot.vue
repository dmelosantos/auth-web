<template>
  <div id="app">
    <v-app id="login">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Type the username you want to recover the password</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Email"
                      name="email"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="email"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="back">Back</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="forgotPassword">Recover</v-btn>
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
import Vue from 'vue';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default {
  name: 'Forgot',
  components: {
  },
  data: () => ({
    email: '',
    params: {
      client_id: Vue.config.googleClientId,
    },
    renderParams: {
      width: 250,
      height: 50,
      longtitle: true,
    },
  }),
  methods: {
    forgotPassword() {
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: this.email,
      });
      const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: Vue.config.cognitoUserPoolId,
        ClientId: Vue.config.cognitoClientId,
      });
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: this.email,
        Pool: userPool,
      });
      const router = this.$router;
      const { email } = this;
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          router.push(`/changePassword/${email}`);
        },
        onFailure: (err) => {
          console.log(err);
        },
      });
    },


    back() {
      this.$router.push('/');
    },
  },
};
</script>
