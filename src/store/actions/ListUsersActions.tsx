import { AppDispatch } from '..';
import { ListUsersDTO } from '../../models/ListUsersDTO';
import api from '../../api';


export const listAllUsers = async ( state: ListUsersDTO, dispatch: AppDispatch ) =>{
    try {
        const {data} = await api.get('/user/listAllUser')
        console.log(data)
        const list = {...data, type: 'LIST_USERS'}
        console.log(list, "lista")
        dispatch (list)
    } catch (error) {
        console.log(error)
    }
}