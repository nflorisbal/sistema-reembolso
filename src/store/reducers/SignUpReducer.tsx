import { AnyAction } from "redux";
import { SignUpDTO } from "../../models/SignUpDTO";

export const INITIAL_STATE_SIGNUP = {
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    role:  "",
    image:  "",
}

const signUpReducer = (state: SignUpDTO = INITIAL_STATE_SIGNUP, action: any) =>{
    switch (action.type) {
        case 'CREATE_USER':
          return {
            ...state,
            name: action.name,
            password: action.password,
            confirmPassword: action.confirmPassword,
            role: action.role,
            email: action.email,
            image: action.image,
          };
        default:
          return state;
      }
      
    };

    export default signUpReducer;
