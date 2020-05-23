import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header/Header'
import './style.css'


function Layout({ auth, children }) {
   return (
      <>
         <Header />
         <div className="page-content">{children}</div>
      </>
   )
}



export default connect(state => ({ auth: state.auth }), {})(Layout)