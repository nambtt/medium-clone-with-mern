import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../Layout/Layout'
import { Container } from 'semantic-ui-react'
import StoryViewer from '../../components/StoryViewer/StoryViewer'

export const ViewStory = (props) => {
   return (
      <Layout>
         <Container>
            <StoryViewer articleId={props.match.params._id} />
         </Container>
      </Layout>
   )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStory)
