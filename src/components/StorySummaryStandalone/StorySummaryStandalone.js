import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Segment, Label } from 'semantic-ui-react'

import './StorySummaryStandalone.css'

export default ({ article }) => {
   return (

      <Segment>
         <div style={{ display: 'flex' }}>
            <div>
               <div>{article.title}</div>
               <div>{article.author.name}</div>
            </div>
            <div style={{ flex: 1 }}></div>
            <div>
               <Label>
                  <Icon name="hand peace" />
                  {article.clap}
               </Label>
               <Label>
                  <Icon name="comment" />
                  {article.noOfComments}
               </Label>
            </div>
         </div>
      </Segment>

   )
}
