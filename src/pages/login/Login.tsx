import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ContainerLogin, DivInput, LabelLogin } from './Login.style';
import Logo from '../../components/logo/Logo';

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
    <ContainerLogin>
      <Logo />
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={loginSchema}
        enableReinitialize={true}
        onSubmit={() => console.log('logou')}
      >
        <Form>
          <DivInput>
            <LabelLogin htmlFor="email">E-mail</LabelLogin>
            <Field name="email" placeholder="usuario@dbccompany.com.br" />
            <ErrorMessage name="email" />
          </DivInput>
          <DivInput>
            <LabelLogin htmlFor="password">Senha</LabelLogin>
            <Field name="password" placeholder="Senha" type="password" />
            <ErrorMessage name="password" />
          </DivInput>
          <button type='submit'>Entrar</button>
        </Form>
      </Formik>
    </ContainerLogin>
  );
};
export default Login;
