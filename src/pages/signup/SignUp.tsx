import * as Yup from 'yup';
import { useFormik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { SignUpDTO, IRoleNumber } from '../../models/SignUpDTO';
import { IRole } from '../../models/AuthDTO';
import { createUser, createUserAdmin } from '../../store/actions/SignUpActions';
import { RootState } from '../../store';
import {
  LinkEyePassword,
  ContainerSignUp,
  DivButton,
  StyledSelect,
} from './SignUp.style';
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

const SignUp = (state: RootState & AnyAction) => {
  const { dispatch, roles, token } = state;
  const navigate = useNavigate();
  const passwordFeedback = [
    'Muito fraco',
    'Fraco',
    'Satisfatório',
    'Bom',
    'Ótimo',
  ];
  const passwordTooShort = ['Muito fraco'];
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const [admin, setAdmin] = useState(false);
  const [score, setScore] = useState(0);
  const [image64, setImage64] = useState('');

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

  const checkAdmin = () => {
    roles.map((cargo: IRole) => {
      if (cargo.idRole === 1) {
        setAdmin(true);
      }
    });
  };

  //#region validação do yup
  const signupSchema = Yup.object().shape({
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
      .required('Campo obrigatório.')
      .min(8, 'Mínimo de 8 caracteres.')
      .max(20, 'Máximo de 20 caracteres.')
      .test('scoreSenha', 'A senha está muito fraca', () => {
        if (score >= 2) {
          return true;
        }
        return false;
      }),
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
        if (value != undefined) {
          return value.size <= 800000 && value.type.includes('image');
        }
        return true;
      }
    ),
  });
  //#endregion validação do yup

  // const do useformik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 4,
    },
    onSubmit: (
      values: SignUpDTO,
      { setSubmitting }: FormikHelpers<SignUpDTO>
    ) => {
      const newValues = { ...values, image: image64 };
      if (admin) {
        setupCreateUserAdmin(newValues);
      }
      setupCreateUser(newValues);
      setSubmitting(false);
    },
    validationSchema: signupSchema,
  });

  // setups createuser for admin
  const setupCreateUserAdmin = (values: SignUpDTO) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
    };
    const roleNumber: IRoleNumber = { role: formik.values.role };

    createUserAdmin(user, dispatch, navigate, token, roleNumber);
  };

  // setups createuser
  const setupCreateUser = (values: SignUpDTO) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
    };
    createUser(user, dispatch, navigate, formik.setStatus);
  };

  // sets image field
  const uploadImage = async (event: any) => {
    const image = event.target.files[0];
    const base64: any = await convertBase64(image);
    formik.setFieldValue('image', image);
    setImage64(base64);
  };

  // converts to base64
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <ContainerMain height="100vh">
      <ContainerSignUp>
        <LinkBack to="/">
          <AiOutlineArrowLeft />
        </LinkBack>
        <PageTitle>Cadastrar Usuário</PageTitle>
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
            <PasswordStrengthBar
              password={formik.values.password}
              minLength={8}
              scoreWords={passwordFeedback}
              shortScoreWord={passwordTooShort}
              onChangeScore={(score) => setScore(score)}
            />
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
              onChange={(event) => uploadImage(event)}
            />
            {formik.errors.image && formik.touched.image ? (
              <DivError>{formik.errors.image}</DivError>
            ) : null}
          </DivFlexColumn>

          {admin && (
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
          )}
          <DivButton>
            <ButtonDefault type="submit">Cadastrar</ButtonDefault>
          </DivButton>
        </StyledForm>
      </ContainerSignUp>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.auth.name,
  image: state.auth.image,
  roles: state.auth.roles,
  token: state.auth.token,
});

export default connect(mapStateToProps)(SignUp);
