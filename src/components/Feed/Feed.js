import React, { Component } from 'react'
import { connect } from 'react-redux'
import FeatureAuthor from '../FeatureAuthor/FeatureAuthor'

import { Container } from 'semantic-ui-react'
import TopStories from '../TopStories/TopStories'
import StorySummaryList from '../StorySummaryList/StorySummaryList'

import { loadArticles } from '../../redux/actions/articleActions'

import './Feed.css'

class Feed extends Component {

   componentDidMount() {
      this.props.loadArticles();
   }

   render() {
      return (
         <Container className="feed-container">
            <div className="ui grid">
               <div className="ten wide column stories">
                  <StorySummaryList articles={this.props.articles || []} />
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

const mapStateToProps = (state) => {
   return { articles: state.articleReducer.articles };
}

export default connect(mapStateToProps, { loadArticles })(Feed)
