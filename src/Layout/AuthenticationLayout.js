import React, { useEffect } from 'react'

import Header from '../components/Header/Header'
import './style.css'
import { Message } from 'semantic-ui-react'
import ButtonAuthentication from '../components/Header/ButtonAuthentication/ButtonAuthentication'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { requireAuthorization } from '../redux/actions/authActions'

function AuthenticationLayout({ auth, children, requireAuthorization }) {

   useEffect(() => {
      requireAuthorization(true)
      return () => {
         requireAuthorization(false)
      }
   }, [])

   return (
      <>
         <div className={!auth.isAuthenticated && auth.currentPageNeedAuthorization ? "" : "hidden"}>
            <div className="app-overlay" style={{
               position: 'fixed',
               width: '100%',
               height: '100%',
               backgroundColor: 'rgba(255, 255, 255, 0.95)',
               zIndex: 1
            }}>
               <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
               }}>
                  <Message padding="big" style={{
                     padding: '50px 50px 65px',
                     textAlign: 'center'
                  }}>
                     <Message.Header style={{
                        marginBottom: '20px'
                     }}>You need to sign in to access this page</Message.Header>
                     <ButtonAuthentication />
                     <div style={{ marginTop: '2rem' }}>
                        Or back to <Link className="link" to="/">Home page</Link>
                     </div>
                  </Message>
               </div>
            </div>

         </div>
         <Header />
         <div className="page-content">{children}</div>
      </>
   )
}

export default connect(state => ({ auth: state.auth }), { requireAuthorization })(AuthenticationLayout)