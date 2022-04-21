import {
  useFormik,
  FormikHelpers,
  FieldArray,
  ArrayHelpers,
  Field,
  FormikProvider
} from 'formik';
import { TicketDTO } from '../../models/TicketDTO';
import * as Yup from 'yup';

const AddTicket = () => {
  const addTicketSchema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório.'),
    name: Yup.string().required('Campo obrigatório.'),
    date: Yup.string().required('Campo obrigatório.'),
    totalSum: Yup.string().required('Campo obrigatório.'),
    sum: Yup.string().required('Campo obrigatório.'),
    nameItem: Yup.string().required('Campo obrigatório.'),
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
        console.log(values)
        setSubmitting(false);
        
      }, 500);
    },
    // validationSchema: addTicketSchema,
  });
  return (
    <div>
        
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Nome:</label>
      <input
        id="title"
        name="title"
        placeholder="Digite seu nome completo"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
          <FormikProvider value={formik}>
        <FieldArray
          name="items"
          render={(ArrayHelpers) => (
            <div>
              {formik.values.items.map((item, index) => (
                <div key={index}>
                  <input
                    name={`items[${index}.nameItem]`}
                    id={`items[${index}.nameItem]`}
                    value={item.nameItem}
                    onChange={formik.handleChange}
                  />
                  <input
                    name={`items[${index}.dateItem]`}
                    id={`items[${index}.dateItem]`}
                    value={item.dateItem}
                    onChange={formik.handleChange}
                  />
                  <input
                    name={`items[${index}.sum]`}
                    value={item.sum}
                    onChange={formik.handleChange}
                  />
                  <input
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
                  ArrayHelpers.push({ nameItem: '', dateItem: '', sum:'', attachment:'' })
                }
              >
                Adicionar outro item
              </button>
            </div>
          )}
        ></FieldArray>
        </FormikProvider>
        <button type="submit">oi</button>
      </form>
      
    </div>
  );
};

export default AddTicket;
