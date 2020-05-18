import React, { useEffect } from 'react'
import { Label, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import renderHTML from 'react-render-html'
import ArticleAuthor from '../ArticleAuthor/ArticleAuthor'
import Sharing from '../Sharing/Sharing'

import { loadArticleDetails } from '../../redux/actions/articleActions'

const StoryViewer = ({
   articleId,
   article,
   loadArticleDetails
}) => {

   useEffect(() => {
      loadArticleDetails(articleId);
   }, [articleId, loadArticleDetails]);

   if (!article) {
      return <div>Loading...</div>
   }

   return (
      <div className="story-viewer-wrapper">
         <Header as="h1">{article.title}</Header>
         <div style={{ display: "flex" }}>
            <div>
               <ArticleAuthor authorId={article.author.id}
                  authorName={article.author.name}
                  authorImageUrl={article.author.profileImage}
                  createdAt={article.displayedDate} />
            </div>
            <div>
               <Sharing url={window.location.href} />
            </div>
         </div>
         <Image src={article.featureImage} />
         {renderHTML(article.content)}
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      article: state.articleViewer.articleDetails
   }
}

const mapDispatchToProps = {
   loadArticleDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewer)

