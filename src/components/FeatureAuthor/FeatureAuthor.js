import React from 'react'
import { Label, Segment, Header } from 'semantic-ui-react'

export default function FeatureAuthor() {
   return (
      <Segment>
         <Header as="h3">Featured Authors</Header>
         <p className="tags">
            <Label as="a" image>
               <img src="/" alt="" />
               Nam Bui
            </Label>
         </p>
      </Segment>
   )
}
