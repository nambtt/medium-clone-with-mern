import React from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'
import { Feed, Header, Image, Icon } from 'semantic-ui-react'

import './StorySummary.css'

export default ({ article }) => {
   return (
      <Feed.Event className="story-summary">
         <Feed.Content>
            <Header as="h2">
               <Link to={`articles/${article._id}`}>{article.title}</Link>
               <Header.Subheader>{article.description}</Header.Subheader>
            </Header>
            <Feed.Meta>
               <Feed.Like>
                  <Header>
                     <Header.Subheader>
                        <Icon name='like' />{article.clap} Likes
                        </Header.Subheader>
                  </Header>
               </Feed.Like>

            </Feed.Meta>
            <Header size="small">
               <Image circular src={faker.image.people()} />
               <Header.Content>
                  <Link to={`authors/${article.author._id}`}>{article.title}</Link>
                  <Header.Subheader>Posted • A must read</Header.Subheader>
               </Header.Content>
            </Header>
         </Feed.Content>
      </Feed.Event>
   )
}
