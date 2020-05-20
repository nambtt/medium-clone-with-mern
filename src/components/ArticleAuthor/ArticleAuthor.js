import React from 'react'
import { Header, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function ArticleAuthor({ authorId, authorName, authorImageUrl, createdAt }) {
   return (
      <div>
         <Header size="small">
            <Image circular src={authorImageUrl} />
            <Header.Content>
               <Link to={`authors/${authorId}`}>{authorName}</Link>
               {/* <Button size="mini" style={{ marginLeft: "5px" }}>Follow</Button> */}
               <Header.Subheader>{createdAt}</Header.Subheader>
            </Header.Content>
         </Header>
      </div>
   )
}
