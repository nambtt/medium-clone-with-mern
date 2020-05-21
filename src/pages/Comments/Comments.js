import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { Segment, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import renderHTML from 'react-render-html'
import ArticleAuthor from '../../components/ArticleAuthor/ArticleAuthor'
import StorySummaryStandalone from '../../components/StorySummaryStandalone/StorySummaryStandalone'

import { loadComments } from '../../redux/actions/commentActions'
import { useParams, Redirect } from 'react-router-dom'
import CommentEditor from '../../components/CommentEditor/CommentEditor'

const Comments = ({ auth, article, loadComments }) => {

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
               <Divider />
               <div>
                  {article.comments.map((comment) => {
                     return (
                        <Segment key={comment._id}>
                           <ArticleAuthor
                              authorId={comment.author.id}
                              authorName={comment.author.name}
                              authorImageUrl={comment.author.profileImageUrl}
                              createdAt={comment.createdAt} />
                           <div style={{ padding: "20px 0" }}>
                              {renderHTML(comment.content)}
                           </div>
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
