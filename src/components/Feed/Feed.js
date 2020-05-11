import React, { Component } from 'react'
//import { connect } from 'react-redux'
import FeatureAuthor from '../FeatureAuthor/FeatureAuthor'

import { Container } from 'semantic-ui-react'
import TopStories from '../TopStories/TopStories'
import StorySummaryList from '../StorySummaryList/StorySummaryList'

import './Feed.css'

export default class Feed extends Component {

   render() {
      return (
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
      )
   }
}
