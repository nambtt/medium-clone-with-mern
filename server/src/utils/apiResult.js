module.exports = {
   articleNotFound: (_id) => {
      return { message: `Article ${_id} is not found` }
   }
}