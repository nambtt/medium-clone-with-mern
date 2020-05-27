import React, { useEffect, useState } from 'react'
import { Container, Button, Modal, Header, Icon } from 'semantic-ui-react'
import AuthenticationLayout from '../../Layout/AuthenticationLayout'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteArticle, loadMyArticles } from '../../redux/actions/articleActions'


function MyStories({ auth, articles, loadMyArticles, deleteArticle }) {

   const [currentArticleId, setCurrentArticleId] = useState(null)
   const [confirmOpen, setConfirmOpen] = useState(false)
   useEffect(() => {
      loadMyArticles();
   }, [auth.isAuthenticated])

   const onDeleteStory = () => {
      if (currentArticleId) {
         deleteArticle(currentArticleId);
         handleClose();
      }
   }

   const handleOpen = (articleId) => {
      setConfirmOpen(true);
      setCurrentArticleId(articleId)
   }

   const handleClose = () => setConfirmOpen(false)

   return (
      <AuthenticationLayout>

         <Modal basic size='small'
            open={confirmOpen}
            onClose={handleClose}>
            <Header icon='archive' content='Wait wait...' />
            <Modal.Content>
               <p>
                  You want to delete this story? It will be removed completely here.
               </p>
            </Modal.Content>
            <Modal.Actions>
               <Button basic color='red' inverted onClick={handleClose}>
                  <Icon name='remove' /> No
               </Button>
               <Button color='green' inverted onClick={() => onDeleteStory()}>
                  <Icon name='checkmark' /> Yes
               </Button>
            </Modal.Actions>
         </Modal>
         <Container>
            <h1>You Stories</h1>
            <div>
               <div style={{ display: (!articles || !articles.length ? "" : "none") }}>No story found</div>
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
                              <Button onClick={() => handleOpen(article._id)}>Delete</Button>
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
      articles: state.articleListing.myArticles,
      auth: state.auth
   }
}

export default connect(mapStateToProps, { loadMyArticles, deleteArticle })(MyStories)
