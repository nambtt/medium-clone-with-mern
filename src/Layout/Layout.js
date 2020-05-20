import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header/Header'
import './style.css'

export default function Layout({ children }) {
   return (
      <>
         <Header />
         <div className="page-content">{children}</div>
      </>
   )
}
