import React, { Component } from 'react'

import Layout from '../../Layout/Layout'

import FeatureAuthor from '../../components/FeatureAuthor/FeatureAuthor'

import { Container } from 'semantic-ui-react'
import TopStories from '../../components/TopStories/TopStories'
import StorySummaryList from '../../components/StorySummaryList/StorySummaryList'

import './Feed.css'

export default class Feed extends Component {

   render() {
      return (
         <Layout>
            <Container className="feed-container">
               <div className="ui grid">
                  <div className="ten wide column stories">
                     <StorySummaryList />
                  </div>
                  <div className="six wide column">
                     <FeatureAuthor />
                     <TopStories />
                  </div>
               </div>
            </Container>
         </Layout>
      )
   }
}
