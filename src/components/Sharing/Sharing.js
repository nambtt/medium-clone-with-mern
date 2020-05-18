import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'

export default function Sharing({ url }) {
   return (
      <div>
         <FacebookShareButton url={url} />
         <LinkedinShareButton url={url} />
         <TwitterShareButton url={url} />
      </div>
   )
}
