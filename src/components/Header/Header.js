import React, { Component } from 'react'
import Logo from '../../assets/images/stories-logo.svg'
import './Header.css'

import { Link } from 'react-router-dom'
import { Menu, Image, Label } from 'semantic-ui-react'


export default class Header extends Component {
   render() {
      return (
         <div className="header-wrapper">
            <div className="ui container">
               <Menu secondary className="site-header">
                  <Menu.Item name="logo" className="logo" as={Link} to="/">
                     <Image src={Logo} alt="Logo" />
                  </Menu.Item>
                  <Menu.Item name="topStories">
                     <Link to="/">Top Stories</Link>
                  </Menu.Item>
                  <Menu.Menu position="right" className="sign-in">
                     <Menu.Item name="signin">
                        <Label id="signInButton" as="a" to="/" content="Sign in/Sign up" ></Label>
                     </Menu.Item>
                  </Menu.Menu>
               </Menu>
            </div>
         </div>

      )
   }
}
