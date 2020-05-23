import React, { useState } from 'react'
import { connect } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import { Item, Placeholder } from 'semantic-ui-react'
import { loadArticles } from '../../redux/actions/articleActions'
import StorySummary from '../StorySummary/StorySummary'
import './StorySummaryList.css'



const StorySummaryList = ({ noMore, articles, loadArticles }) => {

   const [page, setPage] = useState(1)

   function onScrolledEnd(isVisible) {
      if (!noMore && isVisible) {

         loadArticles(page);
         setPage(page + 1);
      }

   }

   return (
      <Item.Group>
         {articles.map((article) =>
            <StorySummary as={Item} key={article._id} article={article} />
         )}
         <Item style={{ display: noMore ? "none" : "" }}>
            <Item.Content>
               <Placeholder>
                  <Placeholder.Paragraph>
                     <Placeholder.Line />
                     <Placeholder.Line />
                     <Placeholder.Line />
                  </Placeholder.Paragraph>
                  <Placeholder.Header image circular>
                     <Placeholder.Line />
                  </Placeholder.Header>
               </Placeholder>
            </Item.Content>
            <Placeholder style={{ height: 130, width: 180 }}>
               <VisibilitySensor onChange={onScrolledEnd}>
                  <Placeholder.Image />
               </VisibilitySensor>
            </Placeholder>
         </Item>
      </Item.Group>
   )
}

const mapStateToProps = (state) => {
   return {
      articles: state.articleListing.articles,
      noMore: state.articleListing.noMore
   };
}

export default connect(mapStateToProps, { loadArticles })(StorySummaryList)