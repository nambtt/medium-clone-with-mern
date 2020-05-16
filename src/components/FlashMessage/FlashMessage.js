import React, { useState, useEffect } from 'react'
import { Message } from 'semantic-ui-react'
import './FlashMessage.css'
import { toSecondString } from '../../helpers/helper'

export default function FlashMessage({ dummy, header, message, delay }) {
   const [show, setShow] = useState(false);

   function getTotalDelay() {
      return delay.duration + delay.in + delay.out;
   }

   useEffect(() => {
      if (dummy && !show) {
         setShow(true);
         setTimeout(() => { setShow(false) }, getTotalDelay());
      }
   }, [dummy]);

   return (
      <Message negative
         className={`flash-message ${show ? "show" : ""}`}
         style={{ animationDuration: toSecondString(getTotalDelay()) }}>
         {header ? <Message.Header>{header}</Message.Header> : ""}
         <p>{message}</p>
      </Message>
   )
}

FlashMessage.defaultProps = {
   delay: { in: 500, duration: 4000, out: 500 }
}