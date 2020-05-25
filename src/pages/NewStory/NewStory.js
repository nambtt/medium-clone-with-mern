import React from 'react'
import AuthenticationLayout from '../../Layout/AuthenticationLayout'
import Editor from '../../components/Editor/Editor'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'

const AddArticle = () => {

   return (
      <>
         <AuthenticationLayout>
            <Container>
               <Editor />
            </Container>
         </AuthenticationLayout>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
   }
}

export default connect(mapStateToProps, {})(AddArticle)


