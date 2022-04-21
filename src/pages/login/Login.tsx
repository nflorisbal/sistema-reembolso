import * as Yup from 'yup';
import { Link} from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ContainerLogin, DivLogin, LabelLogin } from './Login.style';
import { ContainerMain } from '../../global.styles';
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
    <ContainerMain>
      <ContainerLogin>
        <Logo />
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validationSchema={loginSchema}
          enableReinitialize={true}
          onSubmit={() => console.log('logou')}
        >
          <Form>
            <DivLogin>
              <LabelLogin htmlFor="email">E-mail</LabelLogin>
              <Field name="email" placeholder="usuario@dbccompany.com.br" />
              <ErrorMessage name="email" />
            </DivLogin>
            <DivLogin>
              <LabelLogin htmlFor="password">Senha</LabelLogin>
              <Field name="password" placeholder="Senha" type="password" />
              <ErrorMessage name="password" />
            </DivLogin>
            <DivLogin>
              <button type="submit">Entrar</button>
            </DivLogin>
            <DivLogin>
              <p>Não possue cadastro?</p>
              <Link to='/signup'>Cadastre-se!</Link>
            </DivLogin>
          </Form>
        </Formik>
      </ContainerLogin>
    </ContainerMain>
  );
};
export default Login;
