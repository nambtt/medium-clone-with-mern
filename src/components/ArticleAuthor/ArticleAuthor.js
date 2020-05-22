import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Image } from 'semantic-ui-react'

export default function ArticleAuthor({ authorId, authorName, authorImageUrl, createdAt }) {
   return (
      <div>
         <Header size="small">
            <Image circular src={authorImageUrl} />
            <Header.Content>
               <Link to={`authors/${authorId}`}>{authorName}</Link>
               <Header.Subheader>{createdAt}</Header.Subheader>
            </Header.Content>
         </Header>
      </div>
   )
}
