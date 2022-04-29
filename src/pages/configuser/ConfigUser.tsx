import { useFormik, FormikHelpers } from 'formik';
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import PasswordStrengthBar from 'react-password-strength-bar';
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
import { ContainerSignUp, DivButton, LinkEyePassword } from '../signup/SignUp.style';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../utils';

const ConfigUser = () => {
  const navigate = useNavigate();

  //#region password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordFeedback = [
    'Muito fraco',
    'Fraco',
    'Satisfatório',
    'Bom',
    'Ótimo',
  ];
  const passwordTooShort = ['Muito fraco'];
  const [score, setScore] = useState(0);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowHideConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  //#endregion password

  const signupSchema = Yup.object().shape({
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
        if (value !== undefined) {
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
      setSubmitting(false);
    },
    //validationSchema: signupSchema,
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
        <PageTitle>Configurar Cadastro</PageTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
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

export default ConfigUser;
