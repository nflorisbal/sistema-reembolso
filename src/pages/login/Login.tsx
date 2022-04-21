import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  ContainerLogin,
  DivBtnLogin,
  DivInputLogin,
  LabelError,
  LabelLogin,
  TextNewUser,
  Title,
} from './Login.style';
import {
  ButtonDefault,
  ContainerMain,
  InputDefault,
} from '../../global.styles';
import Logo from '../../components/logo/Logo';

const FORM_INITIAL_VALUES = {
  login: '',
  password: '',
};

const loginSchema = Yup.object().shape({
  login: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
});

const Login = () => {
  return (
    <ContainerMain>
      <ContainerLogin>
        <Logo />
        <Title>Sistema de Reembolso</Title>
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validationSchema={loginSchema}
          enableReinitialize={true}
          onSubmit={(values) => console.log('logou')}
        >
          <Form>
            <DivInputLogin>
              <LabelLogin htmlFor="login">E-mail</LabelLogin>
              <Field
                name="login"
                placeholder="usuario@dbccompany.com.br"
                as={InputDefault}
              />
              <ErrorMessage name="login" component={LabelError} />
            </DivInputLogin>
            <DivInputLogin>
              <LabelLogin htmlFor="password">Senha</LabelLogin>
              <Field
                name="password"
                placeholder="Senha"
                type="password"
                as={InputDefault}
              />
              <ErrorMessage name="password" component={LabelError} />
            </DivInputLogin>
            <DivBtnLogin>
              <ButtonDefault type="submit">Entrar</ButtonDefault>
            </DivBtnLogin>
            <DivBtnLogin>
              <TextNewUser>Não possue cadastro?</TextNewUser>
              <Link to="/signup">Cadastre-se!</Link>
            </DivBtnLogin>
          </Form>
        </Formik>
      </ContainerLogin>
    </ContainerMain>
  );
};
export default Login;
