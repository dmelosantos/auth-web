<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Confirm sign-up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
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
            <v-btn color="primary" @click="confirm">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import AWS from 'aws-sdk';
import Vue from 'vue';

export default {
  name: 'Confirm',
  components: {},
  data: () => ({
    email: '',
    code: '',
  }),
  mounted() {
    this.email = this.$route.params.email ? this.$route.params.email : '';
  },
  methods: {
    confirm() {
      const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

      const params = {
        ClientId: Vue.config.cognitoClientId, /* required */
        ConfirmationCode: this.code, /* required */
        Username: this.email, /* required */
      };
      const router = this.$router;
      if (this.$route.params.type === 'register') {
        identityServiceProvider.confirmSignUp(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            router.push({
              name: 'login',
              params: { username: this.username },
            });
          }
        });
      }
    },

    back() {
      this.$router.push('/');
    },

  },
};
</script>
