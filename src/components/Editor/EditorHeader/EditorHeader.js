import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { PublishStatus } from '../../../constants/enum'

export default function EditorHeader({ publish, publishStatus }) {
   const disabledStatuses = [Object.keys(PublishStatus)[2], Object.keys(PublishStatus)[3]];
   return (
      <div>
         <Menu secondary>
            <Menu.Menu position='right'>
               <Button
                  basic color='green'
                  {...disabledStatuses.indexOf(publishStatus) > -1 ? { disabled: true } : {}}
                  className={publishStatus} content={PublishStatus[publishStatus]}

                  onClick={() => { publish() }} />
            </Menu.Menu>
         </Menu>
      </div>
   )
}
