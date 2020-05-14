import React, { useRef } from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import MediumEditor from 'medium-editor'
import "./../../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import './Editor.css'
import EditorHeader from './EditorHeader/EditorHeader';

export default function Editor() {

   const fileRef = useRef();
   const previewImg = () => {
      const file = fileRef.current.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
         document.getElementById("image-preview").src = e.target.result;
         // this.setState({
         //    imgSrc: file /*e.target.result*/,
         // });
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

   // editor.subscribe('editableInput', (event, editable) => {

   // })

   const publish = () => {

   }

   return (
      <div>
         <div className="editor-section">
            <EditorHeader publish={publish}/>
            <textarea
               className="editor-title"
               id="editor-title"
               placeholder="Title" />
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
            <Segment>
               <textarea className="editor" />
            </Segment>
         </div>
      </div>
   )
}
