import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

import StorySummary from '../StorySummary/StorySummary'
import './StorySummaryList.css'

import { loadArticles } from '../../redux/actions/articleActions'

class StorySummaryList extends Component {

   componentDidMount() {
      this.props.loadArticles();
   }


   render() {
      return (
         <Item.Group>
            {this.props.articles.map((article) =>
               <StorySummary as={Item} key={article._id} article={article} />
            )}
         </Item.Group>
      )
   }
}

const mapStateToProps = (state) => {
   return { articles: state.article.articles };
}

export default connect(mapStateToProps, { loadArticles })(StorySummaryList)