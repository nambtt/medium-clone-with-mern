import React from 'react'
import { Segment, Image, Button, Message } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import { connect } from 'react-redux';
import { addComment, setComposingComment } from '../../redux/actions/commentActions'
import ButtonAuthentication from '../Header/ButtonAuthentication/ButtonAuthentication';

class CommentEditorB extends React.Component {
   constructor(props) {
      super(props);
      this.editor = null;
   }

   componentDidMount() {
      this.editor = new MediumEditor(".editor", {
         placeholder: {
            text: "Write a response...",
         },
      });

      this.editor.subscribe('editableInput', () => {
         if (this.editor.getContent())
            this.props.setComposingComment();
      });
   }

   componentWillUnmount() {
      if (this.editor) {
         this.editor.unsubscribe('editableInput');
      }
   }

   componentDidUpdate(prevProps, prevState) {
      if (this.props.auth.isAuthenticated && !this.props.composingComment) {
         this.editor.resetContent();
      }
   }

   publishComment = (e) => {
      e.preventDefault();
      this.props.addComment(this.props.article._id, this.props.auth.me.id, this.editor.getContent());
   }
   render() {
      const { auth, composingComment } = this.props;

      return (
         <>
            <Message className={auth.isAuthenticated ? "hidden" : ""}>
               <ButtonAuthentication buttonText="You need to sign in to comment" />
            </Message>

            <div className={auth.isAuthenticated ? "" : "hidden"}>
               <Segment padded="very" style={{ display: "flex" }}>
                  <Image circular src={auth.me?.profileImageUrl} style={{ width: "40px", height: "40px" }} />
                  <div style={{ marginLeft: "15px" }} >
                     <textarea className="editor" />
                     <div style={{ marginTop: "10px", display: `${composingComment ? "block" : "none"}` }}  >
                        <Button primary onClick={this.publishComment}>Publish</Button>
                        <Button>Cancel</Button>
                     </div>
                  </div>
               </Segment>
            </div>
         </>
      )
   }
}

const mapStateToProps = state => {
   return {
      auth: state.auth,
      composingComment: state.comments.composingComment
   }
}

export default connect(mapStateToProps, { addComment, setComposingComment })(CommentEditorB)