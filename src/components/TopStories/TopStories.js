import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, Item, Segment } from 'semantic-ui-react'
import { loadPopularArticles } from '../../redux/actions/articleActions'
import StorySummaryCompact from '../StorySummaryCompact/StorySummaryCompact'
import './TopStories.css'



const TopStories = ({ loadPopularArticles, articles }) => {
   useEffect(() => {
      loadPopularArticles();
   }, []);

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
