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

const AddTicket = () => {
  const addTicketSchema = Yup.object().shape({
    title: Yup.string()
      .required('Campo obrigatório.')
      .min(3, 'Mínimo de 3 caracteres.')
      .max(30, 'Máximo de 30 caracteres.'),
    items: Yup.array()
      .of(
        Yup.object().shape({
          sum: Yup.string()
            .required('Campo obrigatório.')
            .min(3, 'Mínimo de 3 caracteres')
            .max(10, 'máximo de 10 caracteres'),
          nameItem: Yup.string()
            .required('Campo obrigatório.')
            .min(3, 'Mínimo de 3 caracteres')
            .max(10, 'máximo de 10 caracteres'),
          dateItem: Yup.string()
            .required('Campo obrigatório.')
            .min(3, 'Mínimo de 3 caracteres')
            .max(10, 'máximo de 10 caracteres'),
          attachment: Yup.string().required('Campo obrigatório.'),
        })
      )
      .min(1, 'Informe ao menos um item.')
      .max(10, 'Máximo de 10 items.'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      totalSum: '',
      situation: 'aberto',
      items: [
        {
          nameItem: '',
          dateItem: '',
          sum: '',
          attachment: '',
        },
      ],
    },
    onSubmit: (
      values: TicketDTO,
      { setSubmitting }: FormikHelpers<TicketDTO>
    ) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        console.log(values);
        setSubmitting(false);
      }, 500);
    },
    validationSchema: addTicketSchema,
  });

  const uploadFile = async (event: any, index: number) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    formik.setFieldValue(`items[${index}.attachment]`, base64);
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
  }, []);

  return (
    <ContainerMain>
      <LinkBack to="/">
        <AiOutlineArrowLeft />
      </LinkBack>
      <ContainerAddTicket>
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
            />
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="totalSum">Total:</StyledLabel>
            <InputDefault
              id="totalSum"
              name="totalSum"
              placeholder="Digite o valor completo"
              value={formik.values.totalSum}
              onChange={formik.handleChange}
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
                        name={`items[${index}.nameItem]`}
                        id={`items[${index}.nameItem]`}
                        value={item.nameItem}
                        onChange={formik.handleChange}
                        placeholder="Item:"
                      />
                      <DivFlex>
                        <InputDefault
                          name={`items[${index}.dateItem]`}
                          id={`items[${index}.dateItem]`}
                          value={item.dateItem}
                          onChange={formik.handleChange}
                          placeholder="Data:"
                        />
                        <InputDefault
                          name={`items[${index}.sum]`}
                          value={item.sum}
                          onChange={formik.handleChange}
                          placeholder="Valor:"
                        />
                      </DivFlex>
                      <InputDefault
                        name={`items[${index}.attachment]`}
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
                          nameItem: '',
                          dateItem: '',
                          sum: '',
                          attachment: '',
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

export default AddTicket;
