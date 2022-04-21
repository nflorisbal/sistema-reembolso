import { useFormik, FormikHelpers } from 'formik';
import { SignUpDTO } from '../../models/SignUpDTO';
import { useState } from 'react';
import { LinkEyePassword, ContainerSignUp, DivButton, StyledSelect, StyledAiOutlineEye, LinkEyeConfirmPassword } from './SignUp.style';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';
import { ContainerMain, DivFlexColumn, InputDefault, ButtonDefault, StyledLabel, StyledForm } from '../../global.styles';

const SignUp = () => {
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [invisibleConfirmPassword, setInvisibleConfirmPassword] =
    useState(true);
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const [admin, setAdmin] = useState(true);

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
    email: Yup.string().required('Campo obrigatório.'),
    name: Yup.string().required('Campo obrigatório.'),
    password: Yup.string().required('Campo obrigatório.'),
    confirmPassword: Yup.string().required('Campo obrigatório.'),
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
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    },
    validationSchema: signupSchema,
  });

  return (
    <ContainerMain>
      <ContainerSignUp>
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
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="email">Email:</StyledLabel>
            <InputDefault
              id="email"
              name="email"
              placeholder="john@acme.com"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </DivFlexColumn>

          <DivFlexColumn>
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
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="confirmPassword">Confirmação de senha:</StyledLabel>
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
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="image">Foto:</StyledLabel>
            <InputDefault name="image" type="file" onChange={formik.handleChange} />
          </DivFlexColumn>

          {admin && (
            <DivFlexColumn>
              <StyledLabel htmlFor="role">Selecione o tipo de usuário</StyledLabel>
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
