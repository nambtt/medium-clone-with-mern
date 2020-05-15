import React, { useRef, useState } from 'react'
import { Icon, Segment, Modal, Button, Header, Placeholder } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import './Editor.css'
import EditorHeader from './EditorHeader/EditorHeader';
import { connect } from 'react-redux';
import { addNewArticle, uploadFeatureImage, resetPublishStatue } from '../../redux/actions/articleEditorActions'

const Editor = ({
   addNewArticle,
   uploadFeatureImage,
   resetPublishStatue,

   authorId,
   featureImageIsUploading,
   featureImageUrl,
   publishStatus }) => {

   const fileRef = useRef();

   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");
   const [isErrorOnPublishingWhileUploadingImage, setIsErrorOnPublishingWhileUploadingImage] = useState(false)

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
      setContent(editor.getContent(0));
   })

   const publish = () => {
      if (featureImageIsUploading) {
         setIsErrorOnPublishingWhileUploadingImage(true);
         return;
      }
      addNewArticle({ title, content, authorId, featureImage: featureImageUrl });
   }

   return (
      <div>
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
         </div>
         <Modal open={isErrorOnPublishingWhileUploadingImage} basic size='small'>
            <Header icon='archive' content='Please wait...' />
            <Modal.Content>
               <p>
                  Your feature image is being uploaded, wait a few moment later.
               </p>
            </Modal.Content>
            <Modal.Actions>
               <Button color='green' inverted onClick={() => setIsErrorOnPublishingWhileUploadingImage(false)}>
                  <Icon name='checkmark' /> Ok
               </Button>
            </Modal.Actions>
         </Modal>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      authorId: state.auth.me?.id,
      featureImageUrl: state.articleEditor.featureImageUrl,
      featureImageIsUploading: state.articleEditor.featureImageIsUploading,
      publishStatus: state.articleEditor.publishStatus
   };
}

export default connect(mapStateToProps, { addNewArticle, uploadFeatureImage, resetPublishStatue })(Editor);