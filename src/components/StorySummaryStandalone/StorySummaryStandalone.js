import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Label, Segment } from 'semantic-ui-react'
import './StorySummaryStandalone.css'


export default ({ article }) => {
   return (

      <Segment>
         <div style={{ display: 'flex' }}>
            <div>
               <Link to={`/view-story/${article._id}`}>{article.title}</Link>
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
