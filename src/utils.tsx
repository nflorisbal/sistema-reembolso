export const hasToken = () => {
  return localStorage.getItem('token');
}

export const switchRole = (idRole:number) =>{
  switch (idRole){
    case 1:
      return "Administrador"
    
    case 2:
      return "Financeiro"
    
    case 3:
      return "Gestor"
    
    case 4:
      return "Colaborador"
    default:
    return "Funcionário"
  }
}