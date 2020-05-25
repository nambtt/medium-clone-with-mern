module.exports = {
   articleNotFound: (_id) => {
      return { message: `Article ${_id} is not found` }
   },
   accessArticleForbidden: (_id) => {
      return { message: `You don't have the right to access Article ${_id}` }
   }
}