import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

export default function EditorHeader(props) {
   return (
      <div>
         <Menu secondary>
            <Menu.Menu position='right'>
               <Button basic color='green' content='Publish'
                  onClick={() => props.publish()} />
            </Menu.Menu>
         </Menu>
      </div>
   )
}
