import { useFormik, FormikHelpers } from 'formik';
import { SignUpDTO } from '../../models/SignUpDTO';
import { useState } from 'react';
import {
  LinkEyePassword,
  ContainerSignUp,
  DivButton,
  StyledSelect,
  StyledAiOutlineEye,
  LinkEyeConfirmPassword,
} from './SignUp.style';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import * as Yup from 'yup';
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
import PasswordStrengthBar from 'react-password-strength-bar';

const SignUp = () => {
  const passwordFeedback = [
    'Muito fraco',
    'Fraco',
    'Satisfatório',
    'Bom',
    'Ótimo',
  ];
  const passwordTooShort = ['Muito fraco'];

  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [invisibleConfirmPassword, setInvisibleConfirmPassword] =
    useState(true);
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const [admin, setAdmin] = useState(true);
  const [score, setScore] = useState(0);

  // deixa ou não visível o password
  const changeTypePassword = () => {
    if (invisiblePassword) {
      setTypePassword('text');
      setInvisiblePassword(false);
    }

    if (!invisiblePassword) {
      setTypePassword('password');
      setInvisiblePassword(true);
    }
  };

  // deixa ou não visível o confirm password
  const changeTypeConfirmPassword = () => {
    if (invisibleConfirmPassword) {
      setTypeConfirmPassword('text');
      setInvisibleConfirmPassword(false);
    }

    if (!invisibleConfirmPassword) {
      setTypeConfirmPassword('password');
      setInvisibleConfirmPassword(true);
    }
  };

  // validação do yup
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .required('Campo obrigatório.')
      .matches(/[\w.]+@dbccompany\.com\.br$/gi, 'Use seu e-mail institucional.')
      .max(50, 'Máximo de 50 caracteres.'),
    name: Yup.string()
      .required('Campo obrigatório.')
      .min(8, 'Por favor, escreva seu nome completo.')
      .max(50, 'Máximo de 50 caracteres.'),
    password: Yup.string()
      .required('Campo obrigatório.')
      .min(8, 'Mínimo de 8 caracteres.')
      .max(20, 'Máximo de 20 caracteres.'),
    confirmPassword: Yup.string().test(
      'Passwords',
      'Senhas fornecidas não são iguais',
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  // const do useformik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'colaborador',
    },
    onSubmit: (
      values: SignUpDTO,
      { setSubmitting }: FormikHelpers<SignUpDTO>
    ) => {
      if (score >= 2) {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          console.log(values)
        }, 500);
      } else {
        alert('Senha muito fraca.');
      }
    },
    validationSchema: signupSchema,
  });

  return (
    <ContainerMain>
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
              type={typePassword}
              placeholder="Digite sua senha"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <LinkEyePassword href="#" onClick={() => changeTypePassword()}>
              {invisiblePassword && <StyledAiOutlineEye />}
              {!invisiblePassword && <AiOutlineEyeInvisible />}
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
              type={typeConfirmPassword}
              placeholder="Confirme sua senha"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <LinkEyeConfirmPassword
              href="#"
              onClick={() => changeTypeConfirmPassword()}
            >
              {invisibleConfirmPassword && <AiOutlineEye />}
              {!invisibleConfirmPassword && <AiOutlineEyeInvisible />}
            </LinkEyeConfirmPassword>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <DivError>{formik.errors.confirmPassword}</DivError>
            ) : null}
          </DivFlexLink>

          <DivFlexColumn>
            <StyledLabel htmlFor="image">Foto:</StyledLabel>
            <InputDefault
              name="image"
              type="file"
              onChange={(event) => formik.setFieldValue("image", event.target.files)}
            />
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
                <option value="colaborador">Colaborador</option>
                <option value="gestor">Gestor</option>
                <option value="financeiro">Financeiro</option>
                <option value="administrador">Administrador</option>
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
export default SignUp;
