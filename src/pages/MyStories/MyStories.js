import React, { useEffect } from 'react'
import { Container, Button } from 'semantic-ui-react'
import AuthenticationLayout from '../../Layout/AuthenticationLayout'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteArticle, loadMyArticles } from '../../redux/actions/articleActions'


function MyStories({ articles, loadMyArticles, deleteArticle }) {

   useEffect(() => {
      loadMyArticles();
   }, [])

   const onDeleteStory = (articleId) => {
      deleteArticle(articleId);
   }

   return (
      <AuthenticationLayout>
         <Container>
            <h1>You Stories</h1>
            <div>
               <ul>
                  {articles.map(article => {
                     return (

                        <li key={article._id} style={{
                           display: "flex",
                           padding: "1rem 0",
                           marginBottom: "1rem",
                           borderBottom: "1px solid #ddd"
                        }}>
                           <div style={{ flex: 1 }}>
                              <h2><Link to={`view-story/${article._id}`}>{article.title}</Link></h2>
                              <div className="minor-color">{article.description}</div>
                              <div className="minor-color">Last edited 5 days ago </div>
                           </div>
                           <div>
                              <Link className="link" to={`edit-story/${article._id}`}
                                 style={{ marginRight: "1rem" }}>Edit</Link>
                              <Button onClick={onDeleteStory}>Delete</Button>
                           </div>
                        </li>
                     )
                  })}

               </ul>
            </div>
         </Container>
      </AuthenticationLayout>
   )
}

const mapStateToProps = state => {
   return {
      articles: state.articleListing.myArticles
   }
}

export default connect(mapStateToProps, { loadMyArticles, deleteArticle })(MyStories)
