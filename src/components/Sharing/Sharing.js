import React from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { SocialIcon } from 'react-social-icons';

export default function Sharing({ url }) {
   return (
      <div>
         <FacebookShareButton url={url}>
            <SocialIcon url={url} network="facebook" style={{ marginLeft: "10px", width: "30px", height: "30px" }} />
         </FacebookShareButton>
         <LinkedinShareButton url={url}>
            <SocialIcon url={url} network="linkedin" style={{ marginLeft: "10px", width: "30px", height: "30px" }} />
         </LinkedinShareButton>
         <TwitterShareButton url={url}>
            <SocialIcon url={url} network="twitter" style={{ marginLeft: "10px", width: "30px", height: "30px" }} />
         </TwitterShareButton>
      </div>
   )
}
