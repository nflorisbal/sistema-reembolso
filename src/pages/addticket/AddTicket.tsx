import * as Yup from 'yup';
import { useFormik, FormikHelpers, FieldArray, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {
  ContainerAddTicket,
  DivFlexItem,
  AnotherItem,
} from './AddTicket.style';
import { DivButton } from '../signup/SignUp.style';
import { TicketDTO } from '../../models/TicketDTO';
import { hasToken } from '../../utils';
import {
  StyledForm,
  ButtonDefault,
  ContainerMain,
  StyledLabel,
  InputDefault,
  DivFlexColumn,
  DivFlex,
  PageTitle,
  LinkBack,
} from '../../global.styles';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { sendNewTicket } from '../../store/actions/AddTicketActions';
import { connect } from 'react-redux';

const AddTicket = (state: RootState & AnyAction) => {
  const { token, dispatch } = state;

  const addTicketSchema = Yup.object().shape({
    title: Yup.string()
      .required('Campo obrigatório.')
      .min(3, 'Mínimo de 3 caracteres.')
      .max(30, 'Máximo de 30 caracteres.'),
    items: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string()
            .required('Campo obrigatório.')
            .min(2, 'Mínimo de 3 caracteres')
            .max(10, 'máximo de 10 caracteres'),
          name: Yup.string()
            .required('Campo obrigatório.')
            .min(3, 'Mínimo de 3 caracteres')
            .max(10, 'máximo de 10 caracteres'),
          dateItem: Yup.string()
            .required('Campo obrigatório.')
            .min(3, 'Mínimo de 3 caracteres')
            .max(10, 'máximo de 10 caracteres'),
          attachment: Yup.string()
            .required('Campo obrigatório.')
            .min(1, 'Mímino de um item')
            .max(1, 'Máximo de um item'),
        })
      )
      .min(1, 'Informe ao menos um item.'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      items: [
        {
          name: '',
          dateItem: '',
          value: '',
          image: '',
        },
      ],
    },
    onSubmit: (
      values: TicketDTO,
      { setSubmitting }: FormikHelpers<TicketDTO>
    ) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        sendNewTicket(values, dispatch, token);
        console.log(values);
        setSubmitting(false);
      }, 500);
    },
    // validationSchema: addTicketSchema,
  });

  const uploadFile = async (event: any, index: number) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    formik.setFieldValue(`items[${index}.image]`, base64);
  };

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ContainerMain>
      <ContainerAddTicket>
        <LinkBack to="/">
          <AiOutlineArrowLeft />
        </LinkBack>
        <PageTitle>Pedido de reembolso</PageTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
          <DivFlexColumn>
            <StyledLabel htmlFor="date">Título:</StyledLabel>
            <InputDefault
              id="title"
              name="title"
              placeholder="Digite o título"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </DivFlexColumn>

          <FormikProvider value={formik}>
            <FieldArray
              name="items"
              render={(ArrayHelpers) => (
                <div>
                  {formik.values.items.map((item, index) => (
                    <DivFlexItem key={index}>
                      <StyledLabel htmlFor="item">
                        Dados do pedido de reembolso:
                      </StyledLabel>
                      <InputDefault
                        name={`items[${index}.name]`}
                        id={`items[${index}.name]`}
                        value={item.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Item:"
                      />
                      <DivFlex>
                        <InputDefault
                          name={`items[${index}.dateItem]`}
                          id={`items[${index}.dateItem]`}
                          value={item.dateItem}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Data:"
                        />
                        <InputDefault
                          name={`items[${index}.value]`}
                          value={item.value}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Valor:"
                        />
                      </DivFlex>
                      <InputDefault
                        name={`items[${index}.image]`}
                        onChange={(event: any) => uploadFile(event, index)}
                        type="file"
                      />
                      <DivButton>
                        <ButtonDefault
                          type="button"
                          onClick={() => ArrayHelpers.remove(index)}
                        >
                          Remover
                        </ButtonDefault>
                      </DivButton>
                    </DivFlexItem>
                  ))}
                  <DivButton>
                    <AnotherItem
                      href="#!"
                      onClick={() =>
                        ArrayHelpers.push({
                          name: '',
                          dateItem: '',
                          value: '',
                          image: '',
                        })
                      }
                    >
                      Deseja adicionar outro item?
                    </AnotherItem>
                  </DivButton>
                </div>
              )}
            ></FieldArray>
          </FormikProvider>
          <DivButton>
            <ButtonDefault type="submit">Enviar</ButtonDefault>
          </DivButton>
        </StyledForm>
      </ContainerAddTicket>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(AddTicket);
