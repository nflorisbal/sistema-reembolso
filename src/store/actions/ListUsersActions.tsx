import { AppDispatch } from '..';
import { ListUsersDTO } from '../../models/ListUsersDTO';
import api from '../../api';


export const listAllUsers = async ( users: ListUsersDTO, dispatch: AppDispatch ) =>{
    console.log(users, "user dentro da action")
    try {
        const {data} = await api.get('/user/listAllUser')
        const list = {users: data, type: 'LIST_USERS'}
        dispatch (list)
    } catch (error) {
        console.log(error)
    }
}