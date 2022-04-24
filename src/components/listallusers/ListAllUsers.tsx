import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { AnyAction } from 'redux';

const ListAllUsers = (state:RootState & AnyAction) => {
  console.log(state, "state")
  const {dispatch, users, loading} = state
  const [hasList, setHasList] = useState(false)
  
  
  useEffect(() => {
    if (users.length === 1){
    listAllUsers(users, dispatch);
    }
    // if (users.length > 1){
    //   setHasList(true)
    //   setLoading(false)
    //   console.log('entrou')
    // }
  }, [users]);


  if(loading){
    return (<div>Loading</div>)
  }

  console.log(users, "user")
  return (
    <div><h1>Lista de usuários</h1>
    {users.map((user:any)=>(
      <div key={user.idUser}><p>{user.name}</p></div>
    ))}
    <h2>oi</h2>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.list.users,
  loading: state.list.loading,
});

export default connect(mapStateToProps)(ListAllUsers);
