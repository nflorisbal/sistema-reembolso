import {
  createUser,
  createUserAdmin,
  getUserById,
  updateUserAdmin,
} from '../../store/actions/SignUpActions';
import { RootState } from '../../store';
import {
  LinkEyePassword,
  ContainerSignUp,
  DivButton,
  StyledSelect,
} from '../signup/SignUp.style';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import {
  ContainerMain,
  DivFlexColumn,
  InputDefault,
  ButtonDefault,
  StyledLabel,
  StyledForm,
  DivFlexLink,
  PageTitle,
  LinkBack,
  DivError,
} from '../../global.styles';
import { useFormik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { SignUpDTO } from '../../models/SignUpDTO';
import * as Yup from 'yup';

const UpdateUser = (state: RootState & AnyAction) => {
  const { id } = useParams();
  const {
    dispatch,
    roles,
    token,
    nameToUpdate,
    emailToUpdate,
    imageToUpdate,
    roleToUpdate,
  } = state;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowHideConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const setValuesBeforeUpdate = () => {
    formik.setFieldValue('name', nameToUpdate);
    formik.setFieldValue('email', emailToUpdate);
    formik.setFieldValue('role', roleToUpdate[0]?.idRole);
  };

  const updateSchema = Yup.object().shape({
    email: Yup.string()
      .required('Campo obrigatório.')
      .matches(/[\w.]+@dbccompany\.com\.br$/gi, 'Use seu e-mail institucional.')
      .max(50, 'Máximo de 50 caracteres.'),
    name: Yup.string()
      .required('Campo obrigatório.')
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/, 'Deve conter apenas letras.')
      .min(8, 'Por favor, escreva seu nome completo.')
      .max(50, 'Máximo de 50 caracteres.'),
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
    onSubmit: (
      values: SignUpDTO,
      { setSubmitting }: FormikHelpers<SignUpDTO>
    ) => {
      updateUserAdmin(values, dispatch, token, id);
      setSubmitting(false);
    },
    validationSchema: updateSchema,
  });

  useEffect(() => {
    if (id) {
      getUserById(id, dispatch, token);
      setValuesBeforeUpdate();
    }
  }, [nameToUpdate]);

  return (
    <ContainerMain>
      <ContainerSignUp>
        <LinkBack to="/">
          <AiOutlineArrowLeft />
        </LinkBack>
        <PageTitle>Atualizar Usuário</PageTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
          <DivFlexColumn>
            <StyledLabel htmlFor="name">Nome:</StyledLabel>
            <InputDefault
              id="name"
              name="name"
              placeholder="Digite seu nome completo"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <DivError>{formik.errors.name}</DivError>
            ) : null}
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="email">Email:</StyledLabel>
            <InputDefault
              id="email"
              name="email"
              placeholder="maria.santos@dbccompany.com.br"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email ? (
              <DivError>{formik.errors.email}</DivError>
            ) : null}
          </DivFlexColumn>

          <DivFlexLink>
            <StyledLabel htmlFor="password">Senha:</StyledLabel>
            <InputDefault
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
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
              placeholder="Confirme sua senha"
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
              onChange={(event) =>
                formik.setFieldValue('image', event.target.files?.[0])
              }
            />
            {formik.errors.image && formik.touched.image ? (
              <DivError>{formik.errors.image}</DivError>
            ) : null}
          </DivFlexColumn>
          <DivFlexColumn>
            <StyledLabel htmlFor="role">
              Selecione o tipo de usuário
            </StyledLabel>
            <StyledSelect
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="4">Colaborador</option>
              <option value="3">Gestor</option>
              <option value="2">Financeiro</option>
              <option value="1">Administrador</option>
            </StyledSelect>
          </DivFlexColumn>
          <DivButton>
            <ButtonDefault type="submit">Cadastrar</ButtonDefault>
          </DivButton>
        </StyledForm>
      </ContainerSignUp>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  roles: state.auth.roles,
  token: state.auth.token,
  nameToUpdate: state.signup.name,
  roleToUpdate: state.signup.role,
  emailToUpdate: state.signup.email,
  passwordToUpdate: state.signup.password,
  imageToUpdate: state.signup.image,
});

export default connect(mapStateToProps)(UpdateUser);