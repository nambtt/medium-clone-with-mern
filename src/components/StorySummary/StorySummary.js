import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Image, Item } from 'semantic-ui-react'
import './StorySummary.css'


export default ({ article }) => {

   const renderImage = (url) => {
      if (url && url.length)
         return <Item.Image src={article.featureImage} />
   }

   return (

      <Item key={article._id}>
         <Item.Content>
            <Item.Header as='h2'>
               <Link to={`view-story/${article._id}`}>{article.title}</Link>
               <Item.Meta>
                  <Header>
                     <Header.Subheader>{article.description}</Header.Subheader>
                  </Header>
               </Item.Meta>
            </Item.Header>
            <Item.Meta>
               <Header>
                  <Header.Subheader>
                     <Icon name='like' />{article.clap || 0} Likes
                        <span className="mid-dot-divider"></span>
                     {article.displayedDate}
                  </Header.Subheader>
               </Header>
            </Item.Meta>
            <Header size="small">
               <Image circular src={article.author.profileImageUrl} />
               <Header.Content>
                  <Link to={`authors/${article.author._id}`}>{article.author.name}</Link>
               </Header.Content>
            </Header>
         </Item.Content>
         {renderImage(article.featureImage)}

      </Item>

   )
}
