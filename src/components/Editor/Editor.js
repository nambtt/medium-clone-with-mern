import React, { useRef, useState } from 'react'
import { Icon, Segment, Modal, Button, Header, Placeholder } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import './Editor.css'
import EditorHeader from './EditorHeader/EditorHeader';
import FlashMessage from '../FlashMessage/FlashMessage'
import { connect } from 'react-redux';
import { publishArticle, uploadFeatureImage, resetPublishStatue } from '../../redux/actions/articleEditorActions'

const Editor = ({
   publishArticle,
   uploadFeatureImage,
   resetPublishStatue,

   articleId,
   authorId,
   featureImageIsUploading,
   featureImageUrl,
   publishStatus }) => {

   const fileRef = useRef();

   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");
   const [errorMessage, setErrorMessage] = useState(null)

   const previewImg = () => {
      if (!fileRef.current.files.length)
         return;
      const file = fileRef.current.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
         document.getElementById("image-preview").src = e.target.result;
         // upload image to Cloudinary
         uploadFeatureImage(file);
      };
      reader.readAsDataURL(file);
   }

   const publish = () => {
      if (featureImageIsUploading) {
         setErrorMessage({
            dummy: Math.random(), // trigger ErrorMessage to re-render
            header: "Oops!",
            message: "Please wait until uploading image finishes",
         });
         return;
      }
      if (!title) {
         setErrorMessage({
            dummy: Math.random(), // trigger ErrorMessage to re-render
            header: "Oops!",
            message: "Did you mean to write something so short? Please write more and try publishing again.",
         });
         return;
      }
      publishArticle({ _id: articleId, title, content, authorId, featureImage: featureImageUrl });
   }

   const editor = new MediumEditor(".editor", {
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      anchor: {
         placeholderText: "Type a link",
         customClassOption: "btn",
         customClassOptionText: "Create Button",
      },
      paste: {
         cleanPastedHTML: true,
         cleanAttrs: ["style", "dir"],
         cleanTags: ["label", "meta"],
         unwrapTags: ["sub", "sup"],
      },
      anchorPreview: {
         hideDelay: 300,
      },
      placeholder: {
         text: "Tell your story...",
      },
   });

   editor.subscribe('editableInput', () => {
      resetPublishStatue();
      setContent();
   })

   return (
      <div className="editor-section">
         {/* Header Bar */}
         <EditorHeader publish={publish} publishStatus={publishStatus} />
         {/* Title */}
         <textarea
            className="editor-title"
            id="editor-title"
            placeholder="Title" value={title} onChange={(e) => { resetPublishStatue(); setTitle(e.target.value) }} />
         {/* Upload Feature Image Button */}
         <span className="picture-upload" title="Upload a feature image" onClick={() => fileRef.current.click()}>
            <Icon name="camera" size="big"></Icon>
            <div class="hidden">
               <input
                  type="file"
                  onChange={() => previewImg()}
                  id="file"
                  ref={fileRef}
               />
            </div>
         </span>
         {/* Feature Image Preview */}
         <div>
            <Placeholder style={{ height: 150, width: 150, display: (featureImageIsUploading ? "block" : "none") }}>
               <Placeholder.Image />
            </Placeholder>
            <img src="" alt="" id="image-preview" style={{ display: (featureImageIsUploading ? "none" : "block") }} />
         </div>

         {/* Article Content */}
         <Segment className="editor-content">
            <textarea className="editor" />
         </Segment>
         {<FlashMessage {...errorMessage} />}
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      articleId: state.articleEditor.articleId,
      authorId: state.auth.me?.id,
      featureImageUrl: state.articleEditor.featureImageUrl,
      featureImageIsUploading: state.articleEditor.featureImageIsUploading,
      publishStatus: state.articleEditor.publishStatus
   };
}

export default connect(mapStateToProps, { publishArticle, uploadFeatureImage, resetPublishStatue })(Editor);