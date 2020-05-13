import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Image, } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ModalAuthentication from '../../ModalAuthentication/ModalAuthentication'
import { logOut } from '../../../redux/actions/authActions'

const AuthenticationButton = ({ auth, logOut }) => {

   const [signedOut, setSignedOut] = useState(false);

   useEffect(() => {
      if (signedOut) {
         logOut();
      }
   }, [signedOut, logOut])

   if (!auth.isAuthenticated || !auth.me) {
      return (
         <>
            <ModalAuthentication trigger={<Link id="signInButton">Sign in/Sign up</Link>} />
         </>
      );
   }

   const trigger = (
      <span>
         <Image avatar src={auth.me.profileImageUrl} /> {auth.me.name}
      </span>
   )

   const options = [
      {
         key: 'user',
         text: (
            <span>
               Signed in as <strong>{auth.me.name}</strong>
            </span>
         ),
         disabled: true,
      },
      // { key: 'profile', text: 'Your Profile' },
      // { key: 'stars', text: 'Your Stars' },
      // { key: 'explore', text: 'Explore' },
      // { key: 'integrations', text: 'Integrations' },
      // { key: 'help', text: 'Help' },
      // { key: 'settings', text: 'Settings' },
      { key: 'sign-out', text: 'Sign Out' },
   ]

   return (
      <Dropdown trigger={trigger} options={options} onChange={() => setSignedOut(true)} />
   )

}

const mapStateToProps = (state) => {
   return {
      auth: state.auth
   }
}

export default connect(mapStateToProps, { logOut })(AuthenticationButton)