import React from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import { Form, Button, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { loginUserWithEmail } from '../../redux/actions/authActions'
import { loginSchema } from './validation'

const FormLogin = (props) => {

   const formik = useFormik({
      initialValues: {
         email: '',
         password: ''
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
         props.loginUserWithEmail(values);
      }
   })

   if (props.auth.isAuthenticated) return <Redirect to="/" />;

   return (
      <div>
         <Message
            attached
            header='Already signed up?'
            content='Login here'
         />
         <Form className='attached fluid segment' onSubmit={formik.handleSubmit}>
            <Message negative style={{ display: (props.auth.error ? "block" : "none") }}>
               <p>{props.auth.error && props.auth.error.errorMessage}</p>
            </Message>
            <Form.Input name="email" label="Email" type="text" placeholder="Email"
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
      auth: state.auth
   };
};

export default connect(mapStateToProps, { loginUserWithEmail })(FormLogin);