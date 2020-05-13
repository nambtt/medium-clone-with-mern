import React, { Component } from 'react'

export default class GoogleAuth extends Component {
   componentDidMount() {
      window.gapi.load('client:auth2', () => {
         window.gapi.client.init({
            clientId: '449647677910-gk7u2l298bnao0rsvvlsbsctmb3ocj4c.apps.googleusercontent.com',
            scope: 'email'
         }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.setState({ isSignedIn: this.auth.isSignedIn.get() })
         });
      });
   }

   render() {
      return (
         <div>
            Google auth
         </div>
      )
   }
}
