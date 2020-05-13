import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import { Form, Button, Message } from 'semantic-ui-react'
import { registerUser } from '../../redux/actions/registerActions'
import { registerSchema } from './validation'

const FormRegister = (props) => {
   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         email: '',
         password: ''
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
         props.registerUser(values);
      }
   })

   if (props.auth.isAuthenticated) return <Redirect to="/" />;

   return (
      <div>
         <Message
            attached
            header='Welcome to our site!'
            content='Fill out the form below to sign-up for a new account'
         />
         <Form className='attached fluid segment' onSubmit={formik.handleSubmit}>
            <Message negative style={{ display: (props.register.error ? "block" : "none") }}>
               <p>{props.register.error && props.register.error}</p>
            </Message>
            <Form.Input name="firstName" label="First name" type="text" placeholder="First name"
               {...formik.getFieldProps('firstName')}
               {...formik.touched.firstName && formik.errors.firstName ? { error: formik.errors.firstName } : {}} />
            <Form.Input name="lastName" label="Last name" type="text" placeholder="Last name"
               {...formik.getFieldProps('lastName')}
               {...formik.touched.lastName && formik.errors.lastName ? { error: formik.errors.lastName } : {}} />
            <Form.Input name="email" label="Email" type="email" placeholder="Email"
               {...formik.getFieldProps('email')}
               {...formik.touched.email && formik.errors.email ? { error: formik.errors.email } : {}} />
            <Form.Input name="password" label="Password" type="password" placeholder="Password"
               {...formik.getFieldProps('password')}
               {...formik.touched.password && formik.errors.password ? { error: formik.errors.password } : {}} />
            <Button type='submit'>Submit</Button>
         </Form>
      </div>
   )
}

const mapStateToProps = state => {

   return {
      auth: state.auth,
      register: state.register
   };
};

export default connect(mapStateToProps, { registerUser })(FormRegister);