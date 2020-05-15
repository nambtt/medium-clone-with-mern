import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ModalAuthentication from '../../ModalAuthentication/ModalAuthentication'
import { logOut } from '../../../redux/actions/authActions'

const AuthenticationButton = ({ auth, logOut }) => {

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

export default connect(mapStateToProps, { logOut })(AuthenticationButton)