import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import { toSecondString } from '../../helpers/helper';
import './FlashMessage.css';

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