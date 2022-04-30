import { useFormik, FormikHelpers } from 'formik';
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import {
  ButtonDefault,
  ContainerMain,
  DivError,
  DivFlexColumn,
  DivFlexLink,
  InputDefault,
  LinkBack,
  PageTitle,
  StyledForm,
  StyledLabel,
} from '../../global.styles';
import { ConfigUserDTO } from '../../models/SignUpDTO';
import {
  ContainerSignUp,
  DivButton,
  LinkEyePassword,
} from '../signup/SignUp.style';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../utils';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { CredentialDTO } from '../../models/AuthDTO';
import { AnyAction } from 'redux';
import { editingUser } from '../../store/actions/SignUpActions';

const ConfigUser = (state: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();
  const { name, email, dispatch, token, roles } = state;

  //#region password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowHideConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  //#endregion password

  const configSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Mínimo de 8 caracteres.')
      .max(18, 'Máximo de 18 caracteres.')
      .matches(/^(?=.*[A-Z])/, 'Precisa conter uma letra maiúscula.')
      .matches(/^(?=.*[a-z])/, 'Precisa conter uma letra minúscula.')
      .matches(/^(?=.*[0-9])/, 'Precisa conter um número.')
      .matches(
        /^(?=.*[$*&@#])/,
        'Sua senha precisa conter um caractere especial.'
      ),
    confirmPassword: Yup.string().test(
      'Passwords',
      'Senhas fornecidas não são iguais',
      function (value) {
        return this.parent.password === value;
      }
    ),
    image: Yup.mixed().test(
      'image',
      'O arquivo deve ter o tamanho máximo de 800kb (Extensões suportadas png/jpeg)',
      (value) => {
        if (value !== undefined && value !== null) {
          return value.size <= 800000 && value.type.includes('image');
        }
        return true;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (
      values: ConfigUserDTO,
      { setSubmitting }: FormikHelpers<ConfigUserDTO>
    ) => {
      const changedUser: ConfigUserDTO | CredentialDTO = {
        ...values,
        name: name,
        email: email,
        roleEntities: roles,
      };
      editingUser(changedUser, dispatch, token);
      setSubmitting(false);
    },
    validationSchema: configSchema,
  });

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ContainerMain>
      <LinkBack to="/">
        <AiOutlineArrowLeft />
      </LinkBack>
      <ContainerSignUp>
        <PageTitle>Atualizar Cadastro</PageTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
          <DivFlexLink>
            <StyledLabel htmlFor="password">Senha:</StyledLabel>
            <InputDefault
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua nova senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <LinkEyePassword
              href="#!"
              onClick={() => handleShowHidePassword()}
              tabIndex={-1}
            >
              {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </LinkEyePassword>
            {formik.errors.password && formik.touched.password ? (
              <DivError>{formik.errors.password}</DivError>
            ) : null}
          </DivFlexLink>

          <DivFlexLink>
            <StyledLabel htmlFor="confirmPassword">
              Confirmação de senha:
            </StyledLabel>
            <InputDefault
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua nova senha"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <LinkEyePassword
              href="#!"
              onClick={() => handleShowHideConfirmPassword()}
              tabIndex={-1}
            >
              {!showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </LinkEyePassword>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <DivError>{formik.errors.confirmPassword}</DivError>
            ) : null}
          </DivFlexLink>

          <DivFlexColumn>
            <StyledLabel htmlFor="image">Foto:</StyledLabel>
            <InputDefault
              name="image"
              type="file"
              onBlur={formik.handleBlur}
              onChange={(event) =>
                formik.setFieldValue('image', event.target.files?.[0])
              }
            />
            {formik.errors.image && formik.touched.image ? (
              <DivError>{formik.errors.image}</DivError>
            ) : null}
          </DivFlexColumn>
          <DivButton>
            <ButtonDefault type="submit">Enviar</ButtonDefault>
          </DivButton>
        </StyledForm>
      </ContainerSignUp>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.auth.name,
  token: state.auth.token,
  email: state.auth.email,
  roles: state.auth.roles,
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps)(ConfigUser);
