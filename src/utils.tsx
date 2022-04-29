export const hasToken = () => {
  return localStorage.getItem('token');
};

export const switchRole = (idRole: number) => {
  switch (idRole) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Financeiro';
    case 3:
      return 'Gestor';
    case 4:
      return 'Colaborador';
    default:
      return 'Funcionário';
  }
};

export const fixBase64 = (file:string) =>{
  
  if(file.charAt(0) === "i"){
    const newBase64 = `data:image/png;base64, ${file}`
    return newBase64
  }else if(file.charAt(0) === "/"){
    const newBase64 = `data:image/jpeg;base64, ${file}`
    return newBase64
  }else{
    const newBase64 = `data:application/pdf;base64, ${file}`
    return newBase64
  }
}
