import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

import StorySummary from '../StorySummary/StorySummary'

export default class StorySummaryList extends Component {
   render() {
      return (
         <Feed size="large">
            {this.props.articles.map((article) =>
               <StorySummary key={article._id} article={article} />
            )}
         </Feed>
      )
   }
}
