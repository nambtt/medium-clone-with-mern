import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../Layout/Layout'
import { Container } from 'semantic-ui-react'
import StoryViewer from '../../components/StoryViewer/StoryViewer'
import { useParams } from 'react-router-dom'

export const ViewStory = () => {
   let { _id } = useParams()
   return (
      <Layout>
         <Container>
            <StoryViewer articleId={_id} />
         </Container>
      </Layout>
   )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStory)
