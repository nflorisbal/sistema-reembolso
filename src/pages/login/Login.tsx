import * as Yup from 'yup';
import { Formik } from 'formik';

const FORM_INITIAL_VALUES = {
  email: '',
  password: '',
};

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
});

const Login = () => {
  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={loginSchema}
      onSubmit={() => console.log('logou')}
    >
      
    </Formik>
  );
};
export default Login;
