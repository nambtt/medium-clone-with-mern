import React from 'react'
import { Segment, Header, List } from 'semantic-ui-react'

import './TopStories.css'

export default function TopStories() {
   return (
      <Segment>
         <Header as="h3">Top Stories</Header>
         <List ordered relaxed className="story-list">
            <List.Item>
               <List.Content>
                  <List.Header className="story-header" as="a">NodeJs</List.Header>
                  <List.Description className="story-desc" as="a">Nam Bui</List.Description>
               </List.Content>
            </List.Item>
            <List.Item>
               <List.Content>
                  <List.Header className="story-header" as="a">ReactJS</List.Header>
                  <List.Description className="story-desc" as="a">Nam Bui</List.Description>
               </List.Content>
            </List.Item>
         </List>
      </Segment>
   )
}
