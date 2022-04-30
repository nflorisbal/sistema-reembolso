import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { Block } from 'notiflix';
import StatusEnum from '../../enums/Status';
import { RootState } from '../../store';
import {
  deleteTicket,
  listTickets,
} from '../../store/actions/ListTicketsActions';
import {
  ContainerFind,
  ContainerListTicket,
  DivItem,
  DivPagButtons,
  DivTicket,
  InputFind,
  LineItem,
  LineTicket,
} from './ListTickets.style';
import Pagination from '../pagination/Pagination';
import { ButtonAction, ButtonDefault, ContainerMain, DivFlex, InputDefault, LabelError, PageTitle, StyledLabel } from '../../global.styles';
import { updateStatusTicket } from '../../store/actions/AddTicketActions';
import { fixBase64 } from '../../utils';
import { Theme } from '../../theme';
import { FieldArray, FormikHelpers, useFormik, ArrayHelpers, FormikProvider, ErrorMessage } from 'formik';
import { TicketDTO } from '../../models/TicketDTO';
import { AnotherItem, DivFlexItem } from '../../pages/addticket/AddTicket.style';
import InputMask from 'react-input-mask';
import { DivButton } from '../../pages/signup/SignUp.style';

const MIN_LENGTH = 2;

const ListTickets = (state: RootState & AnyAction) => {
  const { ticketsList, dispatch, token, roles, pages } = state;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const userRole = roles[0]?.role;
  const [editTitle, setEditTitle] = useState(false)
  const [editItem, setEditItem] = useState(false)

  useEffect(() => {
    Block.circle('.listTickets');
    listTickets(dispatch, token, currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const handleSearch = (value: string) => {
    if (value === '') {
      Block.circle('.listTickets');
      listTickets(dispatch, token, currentPage);
    } else if (value.length > MIN_LENGTH) {
      // Block.circle('.listTickets');
    }
  };

  const handleDelete = async (id: number) => {
    Block.circle('.listTickets');
    await deleteTicket(token, id);
    listTickets(dispatch, token, currentPage);
  };

  const setupAprovar = async (id: number) => {
    if (userRole === 'ROLE_GESTOR') {
      const newStatus = { status: 1 };
      await updateStatusTicket(id, newStatus, token);
    }
    if (userRole === 'ROLE_FINANCEIRO') {
      const newStatus = { status: 4 };
      await updateStatusTicket(id, newStatus, token);
    }
    listTickets(dispatch, token, currentPage);
  };

  const setupReprovar = async (id: number) => {
    if (userRole === 'ROLE_GESTOR') {
      const newStatus = { status: 2 };
      await updateStatusTicket(id, newStatus, token);
    }
    if (userRole === 'ROLE_FINANCEIRO') {
      const newStatus = { status: 3 };
      await updateStatusTicket(id, newStatus, token);
    }
    listTickets(dispatch, token, currentPage);
  };

  console.log(ticketsList);

  const formikTitle = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (
      values: any,
      { setSubmitting }: FormikHelpers<any>
    ) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        

        setSubmitting(false);
      }, 500);
    },
    //validationSchema: addTicketSchema,
  });

  const formikItem = useFormik({
    initialValues: {
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
      values: any,
      { setSubmitting }: FormikHelpers<any>
    ) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        

        setSubmitting(false);
      }, 500);
    },
    //validationSchema: addTicketSchema,
  });

  const setupEditItem = (item:any) =>{
    console.log(item, "item")
    setEditItem(!editItem)
    formikItem.setFieldValue(`items[0.name]`, item.name)
    formikItem.setFieldValue(`items[0.dateItem]`, item.dateItem)
    formikItem.setFieldValue(`items[0.value]`, item.value)
  }

  return (
    <ContainerMain>
      <ContainerListTicket className="listTickets">
        <PageTitle>Tickets</PageTitle>
        {userRole !== 'ROLE_COLABORADOR' && (
          <ContainerFind>
            <InputFind
              name="find"
              placeholder="Buscar usuário por nome"
              onChange={(event) => handleSearch(event.target.value)}
            />
          </ContainerFind>
        )}
        <LineTicket id="header">
          <p>Usuário</p>
          <p>Título</p>
          <p>Solicitado em</p>
          <p>Total</p>
          <p>Status</p>
          <p>Ações</p>
        </LineTicket>
        {ticketsList.map((ticket: any) => 
           (<DivTicket key={ticket.idRefund}>
            <LineTicket>
              <div>{ticket.name}</div>
              {editTitle ?  <InputDefault
              id="title"
              name="title"
              placeholder="Digite o título"
              value={formikTitle.values.title}
              onChange={formikTitle.handleChange}
              onBlur={formikTitle.handleBlur}
            /> : <div>{ticket.title}</div>}
              <div>{ticket.date}</div>
              <div>{ticket.value}</div>
              <div>{StatusEnum[ticket.status]}</div>
              {userRole !== 'ROLE_COLABORADOR' ? (
                <div>
                  <ButtonAction
                    color="#29CC97"
                    onClick={() => setupAprovar(ticket.idRefund)}
                  >
                    Aprovar
                  </ButtonAction>
                  <ButtonAction
                    color="#F12B2C"
                    onClick={() => setupReprovar(ticket.idRefund)}
                  >
                    Reprovar
                  </ButtonAction>
                </div>
              ) : (
                <div>
                  <ButtonAction
                    color={Theme.color.primaryPure}
                    onClick={() => console.log('editar')}
                    disabled={ticket.status !== 'ABERTO'}
                  >
                    Editar
                  </ButtonAction>
                  <ButtonAction
                    color="#F12B2C"
                    onClick={() => handleDelete(ticket.idRefund)}
                    disabled={ticket.status !== 'ABERTO'}
                  >
                    Excluir
                  </ButtonAction>
                </div>
              )}
            </LineTicket>
            <DivItem>
              <LineItem id="header">
                <p>Item</p>
                <p>Ocorreu em</p>
                <p>Valor</p>
                <p>Comprovante</p>
              </LineItem>
              {ticket.items.map((item: any) => (
                <LineItem key={`i-${item.idItem}`}>
                  <a href="#!" onClick={()=> setupEditItem(item)}>Deseja editar esse item?</a>
                  {editItem ? 
                  <FormikProvider value={formikItem}>
                  <FieldArray
                    name="items"
                    render={(ArrayHelpers) => (
                      <div>
                        {formikItem.values.items.map((item, index) => (
                          <DivFlexItem key={index}>
                            <StyledLabel htmlFor="item">
                              Dados do pedido de reembolso:
                            </StyledLabel>
                            <InputDefault
                              name={`items[${index}.name]`}
                              id={`items[${index}.name]`}
                              value={item.name}
                              onChange={formikItem.handleChange}
                              onBlur={formikItem.handleBlur}
                              placeholder="Item:"
                            />
                            <DivFlex>
                              <InputDefault
                                name={`items[${index}.dateItem]`}
                                id={`items[${index}.dateItem]`}
                                value={item.dateItem}
                                onChange={formikItem.handleChange}
                                onBlur={formikItem.handleBlur}
                                placeholder="Data:"
                                as={InputMask}
                                mask="99/99/9999"
                              />
                              <InputDefault
                                name={`items[${index}.value]`}
                                value={item.value}
                                onChange={formikItem.handleChange
                                  //setupValue(e.target.value, `items[${index}.value]`)
                                }
                                onBlur={formikItem.handleBlur}
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
                                formikItem.setFieldValue(
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
                  : <>
                  <p>{item.name}</p>
                  <p>{item.dateItem}</p>
                  <p>{item.value}</p>
                  <a
                    href={fixBase64(item.imageString)}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    Anexo
                  </a>
                  </>}
                </LineItem>
              ))}
            </DivItem>
          </DivTicket>
        ))}
        <DivPagButtons>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={pages}
          />
        </DivPagButtons>
      </ContainerListTicket>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  ticketsList: state.tickets.ticketsList,
  pages: state.tickets.totalPages,
  token: state.auth.token,
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(ListTickets);
