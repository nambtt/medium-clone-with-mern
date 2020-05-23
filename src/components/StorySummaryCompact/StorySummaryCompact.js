import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Item } from 'semantic-ui-react'
import './StorySummaryCompact.css'


export default ({ article }) => {
   return (

      <Item>
         <Item.Content>
            <Item.Header as='div' className="ui header small">
               <Link to={`view-story/${article._id}`}>{article.title}</Link>

            </Item.Header>
            <Item.Meta className="shorten-1">
               {article.description}
            </Item.Meta>
            <Item.Meta>
               <Header>
                  <Header.Subheader>
                     <Icon name='like' />{article.clap} Likes
                        <span className="mid-dot-divider"></span>
                     {article.displayedDate}
                  </Header.Subheader>
               </Header>
            </Item.Meta>
         </Item.Content>
      </Item>

   )
}
