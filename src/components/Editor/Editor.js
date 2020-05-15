import React, { useRef, useState, useLayoutEffect } from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import { Image as CldImage } from 'cloudinary-react';
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import './Editor.css'
import EditorHeader from './EditorHeader/EditorHeader';
import { connect } from 'react-redux';
import { addNewArticle, uploadFeatureImage } from '../../redux/actions/articleActions'

const Editor = ({ addNewArticle, uploadFeatureImage, authorId, featureImageUrl }) => {

   const fileRef = useRef();

   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");

   const previewImg = () => {
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
      setContent(editor.getContent(0));
   })

   const publish = () => {
      addNewArticle({ title, content, authorId, featureImage: featureImageUrl });
   }

   return (
      <div>
         <div className="editor-section">
            <EditorHeader publish={publish} />
            <textarea
               className="editor-title"
               id="editor-title"
               placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
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

            <img src="" alt="" id="image-preview" />
            {/* <CldImage cloudName="dcvhx5qfv" publicId="Medinum-clone-with-mern" width="300" crop="scale" /> */}

            <Segment className="editor-content">
               <textarea className="editor" />
            </Segment>
            {/* <div style={{ float: "left", clear: "both" }}
               ref={messageEndRef}>
            </div> */}
         </div>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      authorId: state.auth.me?.id,
      featureImageUrl: state.article.featureImageUrl
   };
}

export default connect(mapStateToProps, { addNewArticle, uploadFeatureImage })(Editor);