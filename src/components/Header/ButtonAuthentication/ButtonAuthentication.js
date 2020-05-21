import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ModalAuthentication from '../../ModalAuthentication/ModalAuthentication'
import { logOut } from '../../../redux/actions/authActions'

const AuthenticationButton = ({ auth, logOut, buttonText }) => {

   if (!auth.isAuthenticated || !auth.me) {
      return (
         <>
            <ModalAuthentication trigger={<button id="signInButton">{buttonText}</button>} />
         </>
      );
   }

   const trigger = (
      <span>
         <Image avatar src={auth.me.profileImageUrl} /> {auth.me.name}
      </span>
   )

   return (
      <Dropdown trigger={trigger}>
         <Dropdown.Menu>
            <Dropdown.Item key="new-story">
               <Link to="/new-story">New story</Link>
            </Dropdown.Item>
            <Dropdown.Item key="logout" onClick={() => logOut()}>Logout</Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   )

}

const mapStateToProps = (state) => {
   return {
      auth: state.auth
   }
}

AuthenticationButton.defaultProps = {
   buttonText: "Sign in/Sign up"
}

export default connect(mapStateToProps, { logOut })(AuthenticationButton)