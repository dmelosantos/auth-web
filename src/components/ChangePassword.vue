<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Type your new password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
                disabled="true"
              ></v-text-field>

              <v-text-field
                id="password"
                label="New Password"
                name="password"
                prepend-icon="mdi-key"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                label="Confirmation Code"
                name="code"
                prepend-icon="mdi-cellphone"
                type="text"
                v-model="code"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="back">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="confirmChangePassword">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import Vue from 'vue';

export default {
  name: 'ChangePassword',
  components: {},
  data: () => ({
    email: '',
    code: '',
    password: '',
  }),
  mounted() {
    this.email = this.$route.params.email ? this.$route.params.email : '';
  },
  methods: {
    confirmChangePassword() {
      const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: Vue.config.cognitoUserPoolId,
        ClientId: Vue.config.cognitoClientId,
      });
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: this.email,
        Pool: userPool,
      });
      const router = this.$router;
      cognitoUser.confirmPassword(this.code, this.password, {
        onSuccess: (data) => {
          router.push('/?passwordChanged=true');
        },
        onFailure: (err) => {
          alert(err);
        },
      });
    },

    back() {
      this.$router.push('/');
    },

  },
};
</script>
