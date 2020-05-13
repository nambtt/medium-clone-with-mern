import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Modal, Button, Segment, Grid, Divider, Icon } from 'semantic-ui-react'
import FormRegister from '../FormRegister/FormRegister'
import FormLogin from '../FormLogin/FormLogin'

import './ModalAuthentication.css'

const ModalAuthentication = ({ open, trigger }) => {

   return (
      <Modal open={open} trigger={trigger}>
         <Modal.Header>Welcome back</Modal.Header>
         <Modal.Content>
            <Segment>
               <Grid columns={2} stackable>
                  <Divider vertical>Or</Divider>
                  <Grid.Row>
                     <Grid.Column>
                        <FormRegister />
                     </Grid.Column>

                     <Grid.Column>
                        <FormLogin />
                        <Divider horizontal>Or Sign in with socials</Divider>
                        <Segment>
                           <Button color='facebook'>
                              <Icon name='facebook' /> Facebook
                              </Button>
                           <Button color='google plus'>
                              <Icon name='google' /> Google
                              </Button>
                        </Segment>
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            </Segment>
         </Modal.Content>
      </Modal>
   )
}

const mapStateToProps = (state) => {
   return {};
}

export default connect(mapStateToProps, {})(ModalAuthentication)

