import api from "../../api";
import { AuthDTO } from "../../models/AuthDTO";

export const handleLogin = async (values: AuthDTO) => {  
  try {
    const { data } = await api.post('/auth', values);
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = () => {};
