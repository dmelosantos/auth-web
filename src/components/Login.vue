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
                                    <v-btn color="primary" @click="goToSignUp">Sign Up</v-btn>
                                    <v-btn color="primary" @click="goToForgetPassword">Forgot Password</v-btn>
                                    <v-spacer></v-spacer>
                                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="loginSuccess" :onFailure="loginFailure">Login</GoogleLogin>
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
  import AWS from 'aws-sdk'
  import GoogleLogin from 'vue-google-login';

  export default {
    name: 'Login',
    components: {
      GoogleLogin
    },
    data: () => ({
      params: {
        client_id: "302533607100-qu1tpmn8mh5o0svalnjad6idn9m6s3ek.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }),
    methods: {
      loginSuccess(authResult) {
        if (authResult['Zi']['id_token']) {
          console.log('AAAAAAAAAAAAAAAAA')
          // Add the Google access token to the Cognito credentials login map.
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c50fb462-23d3-445f-90ca-76719fbfe11e',
            Logins: {
              'accounts.google.com': authResult['Zi']['id_token']
            }
          });

          // Obtain AWS credentials
          AWS.config.credentials.get(function(result){
            // Access AWS resources here.
            console.log(result)
          });
        }
      },

      loginFailure() {

      },

      goToForgetPassword() {
        this.$router.push('/forgot');
      },

      goToSignUp() {
        this.$router.push('/register');
      },
    }
  };
</script>
