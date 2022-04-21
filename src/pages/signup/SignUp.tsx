import { Formik, Form, FormikHelpers, Field } from 'formik';
import { SignUpDTO } from '../../models/SignUpDTO';
import { useState } from 'react';
import { LinkEyePassword } from './SignUp.style';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { changeType } from '../../utils';

const SignUp = () => {
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [invisibleConfirmPassword, setInvisibleConfirmPassword] = useState(false);
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const [admin, setAdmin] = useState(true)

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

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role:"colaborador"
      }}
      onSubmit={(
        values: SignUpDTO,
        { setSubmitting }: FormikHelpers<SignUpDTO>
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <label htmlFor="name">Nome:</label>
        <Field id="name" name="name" placeholder="Digite seu nome completo" />

        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="john@acme.com"
          type="email"
        />

        <label htmlFor="password">Senha:</label>
        <Field
          id="password"
          name="password"
          type={typePassword}
          placeholder="Digite sua senha"
        />
        <LinkEyePassword href="#" onClick={() => changeTypePassword()}>
          {invisiblePassword && <AiOutlineEye />}
          {!invisiblePassword && <AiOutlineEyeInvisible />}
        </LinkEyePassword>

        <label htmlFor="confirmPassword">Confirmação de senha:</label>
        <Field
          id="confirmPassword"
          name="confirmPassword"
          type={typeConfirmPassword}
          placeholder="Confirme sua senha"
        />
         <LinkEyePassword href="#" onClick={() => changeTypeConfirmPassword()}>
          {invisiblePassword && <AiOutlineEye />}
          {!invisiblePassword && <AiOutlineEyeInvisible />}
        </LinkEyePassword>

        {admin && 
        <div>
        <label htmlFor='role'>Selecione o tipo de usuário</label>
        <Field as="select" id="role" name="role" >
        <option value="colaborador">Colaborador</option>
          <option value="gestor">Gestor</option>
          <option value="financeiro">Financeiro</option>
          <option value="administrador">Administrador</option>
          </Field>
        </div>
        }

        <button type="submit">Cadastrar</button>
      </Form>
    </Formik>
  );
};
export default SignUp;
