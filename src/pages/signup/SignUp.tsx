import { useFormik, FormikHelpers } from 'formik';
import { SignUpDTO } from '../../models/SignUpDTO';
import { useState } from 'react';
import { LinkEyePassword, ContainerSignUp } from './SignUp.style';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';
import { GeneralDiv } from '../../global.styles';

const SignUp = () => {
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [invisibleConfirmPassword, setInvisibleConfirmPassword] =
    useState(false);
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
    <ContainerSignUp>
    <form onSubmit={formik.handleSubmit}>
      <GeneralDiv>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          name="name"
          placeholder="Digite seu nome completo"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </GeneralDiv>

      <GeneralDiv>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          placeholder="john@acme.com"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </GeneralDiv>

      <GeneralDiv>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          name="password"
          type={typePassword}
          placeholder="Digite sua senha"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <LinkEyePassword href="#" onClick={() => changeTypePassword()}>
          {invisiblePassword && <AiOutlineEye />}
          {!invisiblePassword && <AiOutlineEyeInvisible />}
        </LinkEyePassword>
      </GeneralDiv>

      <GeneralDiv>
        <label htmlFor="confirmPassword">Confirmação de senha:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={typeConfirmPassword}
          placeholder="Confirme sua senha"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <LinkEyePassword href="#" onClick={() => changeTypeConfirmPassword()}>
          {invisiblePassword && <AiOutlineEye />}
          {!invisiblePassword && <AiOutlineEyeInvisible />}
        </LinkEyePassword>
      </GeneralDiv>

      <GeneralDiv>
        <label htmlFor="image">Foto:</label>
        <input name="image" type="file" onChange={formik.handleChange} />
      </GeneralDiv>

      {admin && (
        <GeneralDiv>
          <label htmlFor="role">Selecione o tipo de usuário</label>
          <select
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <option value="colaborador">Colaborador</option>
            <option value="gestor">Gestor</option>
            <option value="financeiro">Financeiro</option>
            <option value="administrador">Administrador</option>
          </select>
        </GeneralDiv>
      )}

      <button type="submit">Cadastrar</button>
    </form>
    </ContainerSignUp>
  );
};
export default SignUp;
