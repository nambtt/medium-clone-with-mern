import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Editor from '../../components/Editor/Editor'
import AuthenticationLayout from '../../Layout/AuthenticationLayout'

const EditStory = () => {

   const { _id } = useParams()

   return (
      <>
         <AuthenticationLayout>
            <Container>
               <Editor editingArticleId={_id} />
            </Container>
         </AuthenticationLayout>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
   }
}

export default connect(mapStateToProps, {})(EditStory)


