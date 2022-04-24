import { AppDispatch } from '..';
import { ListUsersDTO } from '../../models/ListUsersDTO';
import api from '../../api';


export const listAllUsers = async ( users: ListUsersDTO, dispatch: AppDispatch ) =>{
    console.log(users, "user dentro da action")
    try {
        const {data} = await api.get('/user/listAllUser')
        console.log(data)
        const list = {users: [data], type: 'LIST_USERS'}
        console.log(list, "lista")
        dispatch (list)
    } catch (error) {
        console.log(error)
    }
}