import React, { Component } from 'react'
import Logo from '../../assets/images/stories-logo.svg'
import './Header.css'

import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import ButtonAuthentication from './ButtonAuthentication/ButtonAuthentication'

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
                        <ButtonAuthentication />
                     </Menu.Item>
                  </Menu.Menu>
               </Menu>
            </div>
         </div>

      )
   }
}
