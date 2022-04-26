import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { handleLogin } from '../../store/actions/AuthActions';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  ContainerLogin,
  DivBtnLogin,
  DivInputLogin,
  DivServerError,
  LabelError,
  LabelLogin,
  LinkEyePassword,
  TextNewUser,
  Title,
} from './Login.style';
import {
  ButtonDefault,
  ContainerMain,
  InputDefault,
} from '../../global.styles';
import { hasToken } from '../../utils';
import { ImageLogo } from '../../components/logo/Logo.style';

const FORM_INITIAL_VALUES = {
  login: '',
  password: '',
};

const LOGIN_SCHEMA = Yup.object().shape({
  login: Yup.string()
    .email('E-mail inválido.')
    .matches(
      /[\w.]+@dbccompany\.com\.br$/gi,
      'Deve usar seu e-mail institucional.'
    )
    .required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
});

const Login = ({ dispatch }: DispatchProp) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (hasToken()) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ContainerMain height="100vh">
      <ContainerLogin>
        <ImageLogo />
        <Title>Sistema de Reembolso</Title>
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validationSchema={LOGIN_SCHEMA}
          enableReinitialize={true}
          onSubmit={(credentials, { setStatus }) => {
            handleLogin(credentials, dispatch, navigate, setStatus);
          }}
        >
          {({ status }) => (
            <Form>
              <DivServerError>
                <LabelError>{status}</LabelError>
              </DivServerError>
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
                  placeholder="Digite sua senha"
                  type={showPassword ? 'text' : 'password'}
                  as={InputDefault}
                />
                <LinkEyePassword
                  href="#!"
                  onClick={() => handleShowHidePassword()}
                  tabIndex={-1}
                >
                  {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </LinkEyePassword>
                <ErrorMessage name="password" component={LabelError} />
              </DivInputLogin>
              <DivBtnLogin>
                <ButtonDefault type="submit">Entrar</ButtonDefault>
              </DivBtnLogin>
              <DivBtnLogin>
                <TextNewUser>Não possui cadastro?</TextNewUser>
                <Link to="/signup">Cadastre-se!</Link>
              </DivBtnLogin>
            </Form>
          )}
        </Formik>
      </ContainerLogin>
    </ContainerMain>
  );
};

export default connect()(Login);
