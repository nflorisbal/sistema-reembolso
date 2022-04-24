import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { AnyAction } from 'redux';

const ListAllUsers = (state:RootState & AnyAction) => {
  console.log(state, "state")
  const {dispatch, users} = state
  
  useEffect(() => {
    listAllUsers(users, dispatch);
  }, []);

  
  console.log(users, "user")
  return (
    <div><h1>Lista de usuários</h1>
    {users.map((user:any)=>(
      <p key={user.idUser}>{user.name}</p>
    ))}
    <h2>oi</h2>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.list.users,
  
});

export default connect(mapStateToProps)(ListAllUsers);
