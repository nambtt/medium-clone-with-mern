import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function ArticleAuthor({ authorId, authorName, authorImageUrl, createdAt }) {
   return (
      <div>
         <Header size="small">
            <Image circular src={authorImageUrl} />
            <Header.Content>
               <Link to={`authors/${authorId}`}>{authorName}</Link>
            </Header.Content>
         </Header>
      </div>
   )
}
