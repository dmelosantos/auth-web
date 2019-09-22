<template>
    <div id="app">
        <v-app id="login">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <v-card class="elevation-12">
                                <v-toolbar color="primary" dark flat>
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    Login with Google
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="googleLoginSuccess"
                                                 :onFailure="googleLoginFailure">Login
                                    </GoogleLogin>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-divider></v-divider>
                                </v-card-actions>

                                <v-card-text>
                                    Or login using your registered username and password
                                    <v-form>
                                        <v-text-field
                                                label="Username"
                                                name="username"
                                                prepend-icon="mdi-account"
                                                type="text"
                                                v-model="username"
                                        ></v-text-field>

                                        <v-text-field
                                                id="password"
                                                label="Password"
                                                name="password"
                                                prepend-icon="mdi-key"
                                                type="password"
                                                v-model="password"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary" @click="goToSignUp">Sign Up</v-btn>
                                    <v-btn color="primary" @click="goToForgetPassword">Forgot Password</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="defaultLogin">Login</v-btn>
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
import AWS from 'aws-sdk';
import GoogleLogin from 'vue-google-login';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default {
  name: 'Login',
  components: {
    GoogleLogin,
  },
  data: () => ({
    username: '',
    password: '',
    params: {
      client_id: '302533607100-qu1tpmn8mh5o0svalnjad6idn9m6s3ek.apps.googleusercontent.com',
    },
    renderParams: {
      width: 250,
      height: 50,
      longtitle: true,
    },
  }),
  methods: {
    defaultLogin() {
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: this.username,
        Password: this.password,
      });
      const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: Vue.config.cognitoUserPoolId,
        ClientId: Vue.config.cognitoClientId,
      });
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: this.username,
        Pool: userPool,
      });
      cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
      const router = this.$router;
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (data) => {
          sessionStorage.setItem('sessionJwt', data.idToken.jwtToken);
          router.push('/dashboard');
        },
        onFailure: (err) => {
          console.log(err);
        },
      });
    },
    googleLoginSuccess(authResult) {
      if (authResult.Zi.id_token) {
        // Add the Google access token to the Cognito credentials login map.
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1:c50fb462-23d3-445f-90ca-76719fbfe11e',
          Logins: {
            'accounts.google.com': authResult.Zi.id_token,
          },
        });

        // Obtain AWS credentials
        AWS.config.credentials.get(() => {

        });
      }
    },

    googleLoginFailure() {

    },

    goToForgetPassword() {
      this.$router.push('/forgot');
    },

    goToSignUp() {
      this.$router.push('/register');
    },
  },
};
</script>
