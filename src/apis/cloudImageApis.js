import axios from 'axios'
import { CLOUDINARY_CLOUD_NAME } from '../config/config'

export default axios.create({
   baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`
})