import Vue from 'vue';
import AWS from 'aws-sdk';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:c50fb462-23d3-445f-90ca-76719fbfe11e',
});
// TODO use webpack replace and secrets fetching to avoid committing this to git
Vue.config.productionTip = false;
Vue.config.googleClientId = '302533607100-qu1tpmn8mh5o0svalnjad6idn9m6s3ek.apps.googleusercontent.com';
Vue.config.cognitoUserPoolId = 'us-east-1_6mUDE8Y65';
Vue.config.cognitoClientId = '5k631d5q6jvt7r2cdma3pgolsk';

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
