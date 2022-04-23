import { AppDispatch } from '..';
import { SignUpDTO } from '../../models/SignUpDTO';
import api from '../../api';

export const createUser = async ( newUser: SignUpDTO, dispatch:AppDispatch) =>{
    console.log(newUser, "dentro do actions")
    try {
        api.post('/user/saveUser', newUser)
        const stateNewUser = {...newUser, type: 'CREATE_USER' }
        dispatch(stateNewUser)
    } catch (error) {
        console.log(error)
    }
}