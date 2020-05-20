import React from 'react'
import { Segment, Image, Button } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import { connect } from 'react-redux';
import { addComment, setComposingComment } from '../../redux/actions/commentActions'

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

   componentDidUpdate(prevProps, prevState) {
      if (!this.props.composingComment) {
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
         <Segment padded="very" style={{ display: "flex" }}>
            <Image circular src={auth.me.profileImageUrl} style={{ width: "40px", height: "40px" }} />
            <div style={{ marginLeft: "15px" }} >
               <textarea className="editor" />
               <div style={{ marginTop: "10px", display: `${composingComment ? "block" : "none"}` }}  >
                  <Button primary onClick={this.publishComment}>Publish</Button>
                  <Button>Cancel</Button>
               </div>
            </div>
         </Segment>
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