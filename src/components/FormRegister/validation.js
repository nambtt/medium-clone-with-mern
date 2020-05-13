import * as Yup from 'yup';

export const registerSchema = Yup.object({
   firstName: Yup.string()
      .min(2, 'Must be 2 characters at minimum')
      .max(30, 'Must be 30 characters or less')
      .required('This field is required'),
   lastName: Yup.string()
      .min(2, 'Must be 2 characters at minimum')
      .max(30, 'Must be 30 characters or less')
      .required('This field is required'),
   email: Yup.string().email('Invalid email address').required('This field is required'),
   password: Yup.string()
      .min(6, 'Must be 6 characters at minimum')
      .max(20, 'Must be 20 characters or less')
      .required('This field is required'),
});
