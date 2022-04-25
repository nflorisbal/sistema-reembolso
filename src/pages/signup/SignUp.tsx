import { useFormik, FormikHelpers, Form, Formik, Field } from 'formik';
import { SignUpDTO } from '../../models/SignUpDTO';
import { useEffect, useState } from 'react';
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
import { createUser } from '../../store/actions/SignUpActions';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { useNavigate } from 'react-router-dom';
import { IRole } from '../../models/AuthDTO';

const SignUp = (state: RootState & AnyAction) => {
  const { dispatch, roles } = state;
  const navigate = useNavigate();
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
  const [admin, setAdmin] = useState(false);
  const [score, setScore] = useState(0);
  const [validImage, setValidImage] = useState(false);

  const FORM_INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'colaborador',
    image: null,
  };

  useEffect(() => {
    checkAdmin();
  }, []);

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

  const checkAdmin = () => {
    console.log(roles);
    roles.map((cargo: IRole) => {
      if (cargo.idRole === 1) {
        setAdmin(true);
      }
    });
  };

  // validação do yup
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
      image: null,
    },
    onSubmit: (
      values: SignUpDTO,
      { setSubmitting }: FormikHelpers<SignUpDTO>
    ) => {
      if (score >= 2) {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          console.log(values);
          if (validImage) {
            setupCreateUser(values);
          } else {
          }
        }, 500);
      } else {
        alert('Senha muito fraca.');
      }
    },
    validationSchema: signupSchema,
  });

  // setups createuser
  const setupCreateUser = (values: SignUpDTO) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
    };
    createUser(user, dispatch, navigate);
  };

  // sets image field
  const uploadImage = async (event: any) => {
    const image = event.target.files[0];
    console.log(image, 'image no upload');
    setupImage(image);
    const base64 = await convertBase64(image);
    formik.setFieldValue('image', base64);
  };

  // converts to base64
  const convertBase64 = (file: any) => {
    console.log(file, 'arquivo');
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

  const setupImage = (image: File) => {
    if (imageType(image) && imageSize(image)) {
      setValidImage(true);
    }
  };

  const imageType = (image: File) => {
    if (image.type.includes('image')) {
      return true;
    } else {
    }
  };

  const imageSize = (image: File) => {
    if (image.size <= 700000) {
      return true;
    } else {
      alert('arquivo muito grande');
    }
  };

  return (
    <ContainerMain>
      <ContainerSignUp>
        <LinkBack to="/">
          <AiOutlineArrowLeft />
        </LinkBack>
        <PageTitle>Cadastrar Usuário</PageTitle>
        {/* <Formik initialValues={FORM_INITIAL_VALUES} onSubmit={(values) => {}}>
          <Form>
            <StyledLabel htmlFor="name">Nome:</StyledLabel>
            <Field
              id="name"
              name="name"
              placeholder="Digite seu nome completo"
              as={InputDefault}
            />
          </Form>
        </Formik> */}

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
              type={typePassword}
              placeholder="Digite sua senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <LinkEyePassword href="#!" onClick={() => changeTypePassword()}>
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
              onBlur={formik.handleBlur}
            />
            <LinkEyeConfirmPassword
              href="#!"
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
              onChange={(event) => uploadImage(event)}
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

const mapStateToProps = (state: RootState) => ({
  name: state.auth.name,
  image: state.auth.image,
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(SignUp);
