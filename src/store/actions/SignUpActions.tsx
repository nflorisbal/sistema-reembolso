import { AppDispatch } from '..';
import { SignUpDTO } from '../../models/SignUpDTO';
import api from '../../api';
import { handleLogin } from './AuthActions';

export const createUser = async ( newUser: SignUpDTO, dispatch:AppDispatch, navigate: Function) =>{
    console.log(newUser, "dentro do actions")
    try {
        await api.post('/user/saveUser', newUser)
        const stateNewUser = {...newUser, type: 'CREATE_USER' }
        dispatch(stateNewUser)
        setupLoginAfterPost(newUser, dispatch, navigate)
    } catch (error) {
        console.log(error)
    }
}

const setupLoginAfterPost = (user: SignUpDTO, dispatch: AppDispatch, navigate: Function) => {
    const loginNewUser = {
        login: user.email,
        password: user.password,
    }
    // handleLogin(loginNewUser, dispatch, navigate)
}