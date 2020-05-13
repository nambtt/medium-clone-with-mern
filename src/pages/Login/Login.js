import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import Layout from '../../Layout/Layout'
import { Container, Modal, Button, Form, Segment, Grid, Divider, Message, Icon } from 'semantic-ui-react'
import FormRegister from '../../components/FormRegister/FormRegister'

import { FACEBOOK_AUTH_LINK, GOOGLE_AUTH_LINK } from '../../constants'

import './Login.css'

const Login = (auth) => {

   if (auth.isAuthenticated)
      return <Redirect to="/" />

   return (
      <Layout>
         <Container>
            <Modal trigger={<Button>Show Login</Button>}>
               <Modal.Header>Login or register</Modal.Header>
               <Modal.Content>
                  <Segment>
                     <Grid columns={2} stackable>
                        <Divider vertical>Or</Divider>
                        <Grid.Row>
                           <Grid.Column>
                              <FormRegister />
                           </Grid.Column>

                           <Grid.Column>
                              <Message
                                 attached
                                 header='Already signed up?'
                                 content='Login here'
                              />
                              <Form className='attached fluid segment'>
                                 <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' />
                                 </Form.Field>
                                 <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' />
                                 </Form.Field>
                                 <Button type='submit'>Submit</Button>
                              </Form>
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
         </Container>
      </Layout>
   )
}

const mapStateToProps = (state) => {
   return { auth: state.auth, error: state.error };
}

export default connect(mapStateToProps, {})(Login)

