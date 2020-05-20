import React, { useEffect, useState, useRef } from 'react'
import { Segment, Image, Button } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/commentActions'

const CommentEditor = ({ article, auth, publishedComment, addComment }) => {

   const [content, setContent] = useState("");
   const [isFocus, setIsFocus] = useState(false);

   useEffect(() => {
      const editor = new MediumEditor(".editor", {
         placeholder: {
            text: "Write a response...",
         },
      });

      editor.subscribe('editableInput', () => {
         setContent(editor.getContent(0));
         setIsFocus(true);
      })
      return () => {

      }
   }, [])

   const isCommenting = function () {
      return isFocus && !publishedComment;
   }

   const publishComment = (e) => {
      e.preventDefault();
      addComment(article._id, auth.me.id, content);
   }

   return (
      <Segment style={{ display: "flex" }}>
         <Image circular src={auth.me.profileImageUrl} style={{ width: "40px", height: "40px" }} />
         <div style={{ marginLeft: "15px" }} >
            <textarea className="editor" />
            <div style={{ marginTop: "10px", display: `${isCommenting() ? "block" : "none"}` }}  >
               <Button primary onClick={publishComment}>Publish</Button>
               <Button>Cancel</Button>
            </div>
         </div>
      </Segment>
   )
}

const mapStateToProps = state => {
   return {
      auth: state.auth,
      publishedComment: state.comments.publishedComment
   }
}

export default connect(mapStateToProps, { addComment })(CommentEditor)