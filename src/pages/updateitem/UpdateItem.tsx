import { useFormik } from 'formik';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import {
  ButtonDefault,
  ContainerMain,
  DivError,
  DivFlexColumn,
  InputDefault,
  LinkBack,
  PageTitle,
  StyledForm,
  StyledLabel,
} from '../../global.styles';
import { RootState } from '../../store';
import { hasToken } from '../../utils';
import { ContainerAddTicket } from './UpdateItem.style';
import moment from 'moment';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { DivButton } from '../signup/SignUp.style';
import {
  getItemById,
  updateItemAction,
} from '../../store/actions/AddTicketActions';

const UpdateItem = (state: RootState & AnyAction) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dispatch, token, items, nameItem } = state;

  console.log(items);

  const updateTicketSchema = Yup.object().shape({
    value: Yup.string()
      .required('Campo obrigatório')
      .min(2, 'Mínimo de 3 caracteres')
      .max(10, 'máximo de 10 caracteres'),
    name: Yup.string()
      .required('Campo obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(20, 'máximo de 20 caracteres'),
    dateItem: Yup.string()
      .required('Campo obrigatório')
      .test('dateItem', 'Data inválida.', (value) => {
        const now = moment().format('DD/MM/YYYY');
        if (moment(value, 'DD/MM/YYYY').isSameOrBefore(moment())) {
          return true;
        }
        return false;
      }),
    image: Yup.mixed().test(
      'sizeType',
      'O arquivo deve ter o tamanho máximo de 800kb (Extensões suportadas png/jpeg/pdf)',
      (value) => {
        if (value !== undefined && value !== null) {
          return (
            (value.size <= 800000 && value.type.includes('image')) ||
            (value.size <= 800000 && value.type.includes('pdf'))
          );
        }
        return true;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      dateItem: '',
      value: '',
      image: '',
    },
    onSubmit: (values) => {
      updateItemAction(values, token, id);
    },
    validationSchema: updateTicketSchema,
  });

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const formatReal = (int: any) => {
    let tmp = int + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');

    return tmp;
  };

  const setupValue = (value: any) => {
    if (value !== '') {
      const onlyNumbers = value.replace(/\D+/g, '');
      const money = parseInt(onlyNumbers.replace(/[\D]+/g, ''));
      if (!isNaN(money)) {
        formik.setFieldValue('value', formatReal(money));
      }
    } else if (value === '') {
      formik.setFieldValue('value', '');
    }
  };

  const setValuesBeforeUpdate = () => {
    items.map((item: any) => {
      formik.setFieldValue('name', item.name);
      formik.setFieldValue('value', item.value.toString());
      formik.setFieldValue('dateItem', item.dateItem);
    });
  };

  useEffect(() => {
    if (id) {
      getItemById(id, dispatch, token);
      setValuesBeforeUpdate();
    }
  }, [items.length]);

  return (
    <ContainerMain>
      <ContainerAddTicket>
        <LinkBack to="/">
          <AiOutlineArrowLeft />
        </LinkBack>
        <PageTitle>Atualizar Item</PageTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
          <DivFlexColumn>
            <StyledLabel htmlFor="name">Item:</StyledLabel>
            <InputDefault
              id="name"
              name="name"
              placeholder="Digite o item"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <DivError>{formik.errors.name}</DivError>
            ) : null}
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="dateItem">Data:</StyledLabel>
            <InputDefault
              name="dateItem"
              id="dateItem"
              value={formik.values.dateItem}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Digite a data"
              as={InputMask}
              mask="99/99/9999"
            />
            {formik.errors.name && formik.touched.name ? (
              <DivError>{formik.errors.name}</DivError>
            ) : null}
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="Valor">Valor:</StyledLabel>
            <InputDefault
              name="value"
              value={formik.values.value}
              onChange={(e) => setupValue(e.target.value)}
              onBlur={formik.handleBlur}
              placeholder="Digite o valor"
            />
            {formik.errors.value && formik.touched.value ? (
              <DivError>{formik.errors.value}</DivError>
            ) : null}
          </DivFlexColumn>

          <DivFlexColumn>
            <StyledLabel htmlFor="image">Anexo:</StyledLabel>
            <InputDefault
              name="image"
              onChange={(event: any) =>
                formik.setFieldValue('image', event.target.files?.[0])
              }
              type="file"
            />
            {formik.errors.image && formik.touched.image ? (
              <DivError>{formik.errors.image}</DivError>
            ) : null}
          </DivFlexColumn>
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
  items: state.add.items,
  nameItem: state.add.items.name,
});

export default connect(mapStateToProps)(UpdateItem);