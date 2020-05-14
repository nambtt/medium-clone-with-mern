import React from 'react'
import Layout from '../../Layout/Layout'
import Editor from '../../components/Editor/Editor'
import { Container } from 'semantic-ui-react'

export default function AddArticle() {
   return (
      <Layout>
         <Container>
            <Editor />
         </Container>
      </Layout>
   )
}
