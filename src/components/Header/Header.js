import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Menu } from 'semantic-ui-react'
import Logo from '../../assets/images/stories-logo.svg'
import ButtonAuthentication from './ButtonAuthentication/ButtonAuthentication'
import './Header.css'


export default () => {
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
