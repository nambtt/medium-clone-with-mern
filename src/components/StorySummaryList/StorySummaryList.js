import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

import StorySummary from '../StorySummary/StorySummary'
import './StorySummaryList.css'

import { loadArticles } from '../../redux/actions/articleActions'

const StorySummaryList = ({ articles, loadArticles }) => {

   useEffect(() => {
      loadArticles();
   }, [loadArticles]);

   return (
      <Item.Group>
         {articles.map((article) =>
            <StorySummary as={Item} key={article._id} article={article} />
         )}
      </Item.Group>
   )
}

const mapStateToProps = (state) => {
   return { articles: state.articleListing.articles };
}

export default connect(mapStateToProps, { loadArticles })(StorySummaryList)