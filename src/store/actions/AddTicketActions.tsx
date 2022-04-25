import { AppDispatch } from '..';
import api from '../../api';
import { TicketDTO } from '../../models/TicketDTO';

export const sendNewTicket = async (ticket: TicketDTO, dispatch: AppDispatch, token: any) =>{
    console.log(ticket)
    try {
        await api.post('/refund/', ticket, api.defaults.headers.common['Authorization'] = token)
        const stateTicket = {...ticket, type: 'ADD_TICKET'}
        dispatch(stateTicket)
    } catch (error) {
        console.log(error)
    }
}

