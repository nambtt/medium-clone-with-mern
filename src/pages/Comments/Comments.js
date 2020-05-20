import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { Segment, Container, Label, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ArticleAuthor from '../../components/ArticleAuthor/ArticleAuthor'
import StorySummaryStandalone from '../../components/StorySummaryStandalone/StorySummaryStandalone'

import { loadComments } from '../../redux/actions/commentActions'
import { useParams } from 'react-router-dom'
import CommentEditor from '../../components/CommentEditor/CommentEditor'

const Comments = ({ article, auth, loadComments }) => {

   let { _id } = useParams()

   useEffect(() => {
      loadComments(_id);
   }, [_id, loadComments]);

   if (!_id || !article)
      return <div>Loading...</div>

   return (
      <Layout>
         <div style={{ padding: "20px 0", backgroundColor: "#eee" }}>
            <div className="narrow-page-content">
               <Header as="h5">Showing responses for:</Header>
               <StorySummaryStandalone article={article} />
            </div>
         </div>
         <div>
            <div className="narrow-page-content">
               <Header as="h5">Responses</Header>
               <CommentEditor article={article} />
               <div>
                  {article.comments.map((comment) => {
                     return (
                        <Segment key={comment._id}>
                           <ArticleAuthor
                              authorId={comment.author.id}
                              authorName={comment.author.name}
                              authorImageUrl={comment.author.profileImageUrl}
                              createdAt={comment.createdAt} />
                           <p style={{ padding: "20px 0" }}>
                              {comment.content}
                           </p>
                        </Segment>
                     )
                  })}
               </div>
            </div>
         </div>
      </Layout >
   )
}
const mapStateToProps = (state) => {
   return {
      auth: state.auth,
      article: state.comments.article,
   }
}
export default connect(mapStateToProps, { loadComments })(Comments)
