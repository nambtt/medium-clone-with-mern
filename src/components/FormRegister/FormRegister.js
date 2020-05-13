import React from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import { Form, Button, Message } from 'semantic-ui-react'
import { registerUser } from '../../redux/actions/registerActions'
import { registerSchema } from './validation'

const FormRegister = ({ auth, register, registerUser }) => {
   console.log(register, auth, registerUser);
   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         email: '',
         password: ''
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
         registerUser(values);
      }
   })
   return (
      <div>
         <Message
            attached
            header='Welcome to our site!'
            content='Fill out the form below to sign-up for a new account'
         />
         <Form className='attached fluid segment' onSubmit={formik.handleSubmit}>
            <Form.Input name="firstName" label="First name" type="text" placeholder="First name"
               {...formik.getFieldProps('firstName')}
               {...{}} />
            <Form.Input name="lastName" label="Last name" type="text" placeholder="Last name"
               {...formik.getFieldProps('lastName')} />
            <Form.Input name="email" label="Email" type="email" placeholder="Email"
               {...formik.getFieldProps('email')} />
            <Form.Input name="password" label="Password" type="password" placeholder="Password"
               {...formik.getFieldProps('password')} />
            <Button type='submit'>Submit</Button>
         </Form>
      </div>
   )
}

const mapStateToProps = state => ({
   auth: state.auth,
   register: state.register
});

export default connect(mapStateToProps, { registerUser })(FormRegister);