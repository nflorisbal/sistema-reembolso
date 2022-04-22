import {
  useFormik,
  FormikHelpers,
  FieldArray,
  FormikProvider,
} from 'formik';
import { TicketDTO } from '../../models/TicketDTO';
import * as Yup from 'yup';
import { StyledForm, ButtonDefault, ContainerMain, StyledLabel, InputDefault, DivFlexColumn, DivFlex, PageTitle, LinkBack, } from '../../global.styles'
import { ContainerAddTicket, DivFlexItem, AnotherItem } from './AddTicket.style';
import { DivButton } from '../signup/SignUp.style';
import {
  AiOutlineArrowLeft,
} from 'react-icons/ai';

const AddTicket = () => {
  const addTicketSchema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório.'),
    totalSum: Yup.string().required('Campo obrigatório.'),
    items: Yup.array().of(Yup.object().shape({
      sum: Yup.string().required('Campo obrigatório.'),
      nameItem: Yup.string().required('Campo obrigatório.'),
      dateItem: Yup.string().required('Campo obrigatório.'),
      attachment: Yup.string().required('Campo obrigatório.'),
    })).min(1, "Informe ao menos um item.")
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
  return (
    <ContainerMain>
      <LinkBack to="/"><AiOutlineArrowLeft /></LinkBack>
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
                    <StyledLabel htmlFor="item">Dados do pedido de reembolso:</StyledLabel>
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
                      value={item.attachment}
                      onChange={formik.handleChange}
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
                href='#'
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
