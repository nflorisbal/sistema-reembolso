import * as Yup from 'yup';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { handleLogin } from '../../store/actions/AuthActions';

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
import { hasToken } from '../../utils';

const FORM_INITIAL_VALUES = {
  username: '',
  password: '',
};

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .email('E-mail inválido.')
    .matches(
      /[\w.]+@dbccompany\.com\.br$/gi,
      'Deve usar seu e-mail institucional.'
    )
    .required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
});

const Login = ({ dispatch }: AnyAction) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken()) {
      navigate('/');
    }
  }, []);

  return (
    <ContainerMain>
      <ContainerLogin>
        <Logo />
        <Title>Sistema de Reembolso</Title>
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validationSchema={loginSchema}
          enableReinitialize={true}
          onSubmit={(credentials) =>
            handleLogin(credentials, dispatch, navigate)
          }
        >
          <Form>
            <DivInputLogin>
              <LabelLogin htmlFor="username">E-mail</LabelLogin>
              <Field
                name="username"
                placeholder="usuario@dbccompany.com.br"
                as={InputDefault}
              />
              <ErrorMessage name="username" component={LabelError} />
            </DivInputLogin>
            <DivInputLogin>
              <LabelLogin htmlFor="password">Senha</LabelLogin>
              <Field
                name="password"
                placeholder="Digite sua senha"
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

export default connect()(Login);
