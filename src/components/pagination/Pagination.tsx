import { connect } from 'react-redux';
// import { AnyAction } from 'redux';
// import { ListUsersDTO } from '../../models/ListUsersDTO';
// import { RootState } from '../../store';

// interface PaginationProps {

// }


// const Pagination = (
//   { totalPages }: ListUsersDTO & AnyAction,
//   currentPage: number,
//   setCurrentPage: Function
// ) => {
//   return (
//     <>
//       <button
//         onClick={() => {
//           if (currentPage) setCurrentPage(currentPage - 1);
//         }}
//       >
//         Anterior
//       </button>
//       <button
//         onClick={() => {
//           if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//         }}
//       >
//         Próxima
//       </button>
//     </>
//   );
// };

// const mapStateToProps = (state: RootState) => ({
//   pages: state.list.totalPages,
// });

// export default connect(mapStateToProps)(Pagination);
