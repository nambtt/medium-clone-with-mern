import React, { Component, createRef } from 'react'
import { Container, Sticky, Rail, Ref } from 'semantic-ui-react'
import StorySummaryList from '../../components/StorySummaryList/StorySummaryList'
import TopStories from '../../components/TopStories/TopStories'
import Layout from '../../Layout/Layout'
import './Feed.css'

export default class Feed extends Component {
   contextRef = createRef()
   render() {
      return (
         <Layout>
            <Container className="feed-container">
               <div className="ui grid">
                  <div className="ten wide column stories">
                     <StorySummaryList />
                  </div>
                  <div className="six wide column">
                     <Ref innerRef={this.contextRef}>
                        <Rail style={{ position: "relative", width: "100%" }}>
                           <Sticky context={this.contextRef}>
                              <TopStories />
                           </Sticky>
                        </Rail>
                     </Ref>
                  </div>
               </div>
            </Container>
         </Layout>
      )
   }
}
