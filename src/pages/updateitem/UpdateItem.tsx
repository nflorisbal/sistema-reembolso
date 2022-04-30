import { useFormik } from 'formik';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ContainerMain, LinkBack, PageTitle } from '../../global.styles';
import { RootState } from '../../store';
import { hasToken } from '../../utils';
import { ContainerAddTicket } from './UpdateItem.style';

const UpdateItem = (state: RootState & AnyAction) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dispatch, token } = state;

  const formik = useFormik({
    initialValues: {
      items: {
        name: '',
        dateItem: '',
        value: '',
        image: '',
      },
    },
    onSubmit: () => {},
  });

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
        <PageTitle>Atualizar Item</PageTitle>
      </ContainerAddTicket>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(UpdateItem);
