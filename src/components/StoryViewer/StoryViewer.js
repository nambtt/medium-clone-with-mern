import React, { useEffect } from 'react'
import { Label, Header, Image, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import renderHTML from 'react-render-html'
import ClapButton from 'react-clap-button'
import ArticleAuthor from '../ArticleAuthor/ArticleAuthor'
import Sharing from '../Sharing/Sharing'
import './StoryViewer.css'

import { loadArticleDetails } from '../../redux/actions/articleActions'
import { Link } from 'react-router-dom'

const StoryViewer = ({
   articleId,
   article,
   loadArticleDetails
}) => {

   useEffect(() => {
      loadArticleDetails(articleId);
   }, [articleId, loadArticleDetails]);

   const onCountChange = () => {

   }

   if (!article) {
      return <div>Loading...</div>
   }

   return (
      <div className="story-viewer-wrapper narrow-page-content">
         <Header as="h1">{article.title}</Header>
         <div style={{ display: "flex", marginBottom: "3rem", marginTop: "2rem", alignItems: "center" }}>
            <ArticleAuthor authorId={article.author.id}
               authorName={article.author.name}
               authorImageUrl={article.author.profileImageUrl}
               createdAt={article.displayedDate} />
            <div style={{ flex: 1 }}></div>
            <Sharing url={window.location.href} />
         </div>
         <Image src={article.featureImage} />
         {renderHTML(article.content)}
         <div style={{ display: "flex", marginBottom: "3rem", marginTop: "2rem", alignItems: "center" }}>
            <ClapButton
               count={0}
               countTotal={0}
               maxCount={50}
               isClicked={false}
               onCountChange={onCountChange}
            />
            <div style={{ flex: 1 }} />
            <Sharing url={window.location.href} />
         </div>

         <Message info style={{ textAlign: "center" }}>
            <Link to={`/view-story/${article._id}/comments`}>See responses ({article.comments.length})</Link>
         </Message>
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

