import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, List, Item } from 'semantic-ui-react'
import StorySummaryCompact from '../StorySummaryCompact/StorySummaryCompact'

import './TopStories.css'

import { loadPopularArticles } from '../../redux/actions/articleActions'

class TopStories extends React.Component {

   componentDidMount() {
      this.props.loadPopularArticles();
   }

   render() {
      return (
         <Segment>
            <Header as="h3">Top Stories</Header>
            <Item.Group divided className="story-list">
               {this.props.articles.map(item =>
                  <StorySummaryCompact article={item} />
               )}
            </Item.Group>
         </Segment>
      )
   }

}

const mapStateToProps = (state) => {
   return { articles: state.articleReducer.popularArticles };
}

export default connect(mapStateToProps, { loadPopularArticles })(TopStories)
