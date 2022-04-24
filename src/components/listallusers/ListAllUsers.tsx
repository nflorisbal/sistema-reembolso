import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { AnyAction } from 'redux';

const ListAllUsers = (state:RootState & AnyAction) => {
  console.log(state, "state")
  const {dispatch, user} = state
  
  useEffect(() => {
    listAllUsers(user, dispatch);
  }, []);
  console.log(user, "user")
  return (
    <div><h1>Lista de usuários</h1>
    {}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.list.user,
  
});

export default connect(mapStateToProps)(ListAllUsers);
