import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ListUsersDTO } from '../../models/ListUsersDTO';
import { RootState } from '../../store';

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: Function;
}

const Pagination = (
  { pages }: ListUsersDTO & AnyAction,
  { currentPage, setCurrentPage }: IPaginationProps
) => {
  console.log(pages);
  console.log(currentPage);
  console.log(setCurrentPage);
  
  return (
    <>
      <button
        onClick={() => {
          if (currentPage) setCurrentPage(currentPage - 1);
        }}
      >
        Anterior
      </button>
      <button
        onClick={() => {
          if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
        }}
      >
        Próxima
      </button>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  pages: state.list.totalPages,
});

export default connect(mapStateToProps)(Pagination);
