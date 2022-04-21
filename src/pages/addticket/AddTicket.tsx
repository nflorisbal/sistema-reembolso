import {
  useFormik,
  FormikHelpers,
  FieldArray,
  FormikProvider,
} from 'formik';
import { TicketDTO } from '../../models/TicketDTO';
import * as Yup from 'yup';
import { StyledForm, ButtonDefault, ContainerMain, StyledLabel, InputDefault } from '../../global.styles'

const AddTicket = () => {
  const addTicketSchema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório.'),
    date: Yup.string().required('Campo obrigatório.'),
    totalSum: Yup.string().required('Campo obrigatório.'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
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
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledLabel htmlFor="date">Título:</StyledLabel>
        <InputDefault
          id="title"
          name="title"
          placeholder="Digite seu título completo"
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <StyledLabel htmlFor="date">Data:</StyledLabel>
        <InputDefault
          id="date"
          name="date"
          placeholder="Digite seu título completo"
          value={formik.values.date}
          onChange={formik.handleChange}
        />

        <StyledLabel htmlFor="totalSum">Total:</StyledLabel>
        <InputDefault
          id="totalSum"
          name="totalSum"
          placeholder="Digite seu título completo"
          value={formik.values.totalSum}
          onChange={formik.handleChange}
        />

        <FormikProvider value={formik}>
          <FieldArray
            name="items"
            render={(ArrayHelpers) => (
              <div>
                {formik.values.items.map((item, index) => (
                  <div key={index}>
                    <InputDefault
                      name={`items[${index}.nameItem]`}
                      id={`items[${index}.nameItem]`}
                      value={item.nameItem}
                      onChange={formik.handleChange}
                    />
                    <InputDefault
                      name={`items[${index}.dateItem]`}
                      id={`items[${index}.dateItem]`}
                      value={item.dateItem}
                      onChange={formik.handleChange}
                    />
                    <InputDefault
                      name={`items[${index}.sum]`}
                      value={item.sum}
                      onChange={formik.handleChange}
                    />
                    <InputDefault
                      name={`items[${index}.attachment]`}
                      value={item.attachment}
                      onChange={formik.handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => ArrayHelpers.remove(index)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    ArrayHelpers.push({
                      nameItem: '',
                      dateItem: '',
                      sum: '',
                      attachment: '',
                    })
                  }
                >
                  Adicionar outro item
                </button>
              </div>
            )}
          ></FieldArray>
        </FormikProvider>
        <ButtonDefault type="submit">Enviar</ButtonDefault>
      </StyledForm>
    </ContainerMain>
  );
};

export default AddTicket;
