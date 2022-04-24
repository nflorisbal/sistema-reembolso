import { AppDispatch } from '..';
import api from '../../api';
import { TicketDTO } from '../../models/TicketDTO';

const sendNewTicket = async (ticket: TicketDTO, dispatch: AppDispatch) =>{
    try {
        await api.post('/refund', ticket)
    } catch (error) {
        
    }
}