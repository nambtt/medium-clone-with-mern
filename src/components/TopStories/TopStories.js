import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Item } from 'semantic-ui-react'
import StorySummaryCompact from '../StorySummaryCompact/StorySummaryCompact'

import './TopStories.css'

import { loadPopularArticles } from '../../redux/actions/articleActions'

const TopStories = ({ loadPopularArticles, articles }) => {
   useEffect(() => {
      loadPopularArticles();
   }, [loadPopularArticles]);

   return (
      <Segment>
         <Header as="h3">Top Stories</Header>
         <Item.Group divided className="story-list">
            {articles.map(item =>
               <StorySummaryCompact key={item._id} article={item} />
            )}
         </Item.Group>
      </Segment>
   )

}

const mapStateToProps = (state) => {
   return { articles: state.articleListing.popularArticles };
}

export default connect(mapStateToProps, { loadPopularArticles })(TopStories)
