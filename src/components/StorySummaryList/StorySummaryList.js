import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import { Item, Placeholder } from 'semantic-ui-react'
import { loadArticles, resetArticles } from '../../redux/actions/articleActions'
import StorySummary from '../StorySummary/StorySummary'
import './StorySummaryList.css'



const StorySummaryList = ({ noMore, articles, loadArticles, resetArticles }) => {

   const [page, setPage] = useState(1)

   useEffect(() => {
      return () => {
         resetArticles();
      }
   }, [])

   function onScrolledEnd(isVisible) {
      if (!noMore && isVisible) {
         loadArticles(page);
         setPage(page + 1);
      }
   }

   return (
      <Item.Group>
         {articles.map((article, index) =>
            <StorySummary key={index} as={Item} article={article} />
         )}
         <Item key={"placeholder"} style={{ display: noMore ? "none" : "" }}>
            <Item.Content>
               <Placeholder>
                  <Placeholder.Paragraph>
                     <Placeholder.Line />
                     <Placeholder.Line />
                     <Placeholder.Line />
                  </Placeholder.Paragraph>
                  <Placeholder.Header image>
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

export default connect(mapStateToProps, { loadArticles, resetArticles })(StorySummaryList)