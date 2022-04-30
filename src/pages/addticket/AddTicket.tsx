import * as Yup from 'yup';
import {
  useFormik,
  FormikHelpers,
  FieldArray,
  FormikProvider,
  ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  DivError,
  LabelError,
} from '../../global.styles';
import { RootState } from '../../store';
import { sendNewTicket } from '../../store/actions/AddTicketActions';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import InputMask from 'react-input-mask';

const AddTicket = (state: RootState & AnyAction) => {
  const { token, dispatch, email } = state;
  const [size, setSize] = useState(0);

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
          // image: Yup.string()
          //   .required('Campo obrigatório.')
          //   .min(1, 'Mímino de um item')
          //   .test(
          //     'sizeType',
          //     'O arquivo deve ter o tamanho máximo de 800kb (Extensões suportadas png/jpeg/pdf)',
          //     (value) => {
          //       if (value !== undefined) {
          //         return (
          //           (size <= 800000 && value.includes('image')) ||
          //           value.includes('pdf')
          //         );
          //       }
          //       return true;
          //     }
          //   ),
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
    validationSchema: addTicketSchema,
  });

  const checkFileSize = (base64: string) => {
    const base64Length = base64.length - 'data:image/png;base64'.length;
    console.log(base64Length, 'base');
    const sizeBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
    const sizeKb = sizeBytes / 1000;
    setSize(sizeKb);
  };

  const uploadFile = async (event: any, index: number) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      const base64: string = (await convertBase64(file)) as string;
      formik.setFieldValue(`items[${index}.image]`, base64);
      checkFileSize(base64);
    }
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

  function formatReal(int: any) {
    let tmp = int + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');

    return tmp;
  }
  const setupValue = (value: any, index: any) => {
    if (value !== '') {
      const onlyNumbers = value.replace(/\D+/g, '');
      const money = parseInt(onlyNumbers.replace(/[\D]+/g, ''));
      if(!isNaN(money)){
      formik.setFieldValue(index, formatReal(money));
      }
    }else if (value === ""){
      formik.setFieldValue(index, "")
    }
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
            {formik.errors.title && formik.touched.title ? (
              <DivError>{formik.errors.title}</DivError>
            ) : null}
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
                          as={InputMask}
                          mask="99/99/9999"
                        />
                        <InputDefault
                          name={`items[${index}.value]`}
                          value={item.value}
                          onChange={(e) =>
                            setupValue(e.target.value, `items[${index}.value]`)
                          }
                          onBlur={formik.handleBlur}
                          placeholder="Valor:"
                        />
                        <ErrorMessage
                          name={`items.${index}.value`}
                          component="div"
                          className="field-error"
                        />
                      </DivFlex>
                      <InputDefault
                        name={`items[${index}.image]`}
                        onChange={(event: any) =>
                          formik.setFieldValue(
                            `items[${index}.image]`,
                            event.target.files?.[0]
                          )
                        }
                        type="file"
                      />
                      <ErrorMessage
                        name={`items.${index}.image`}
                        component={LabelError}
                        className="field-error"
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
  email: state.auth.email,
});

export default connect(mapStateToProps)(AddTicket);
