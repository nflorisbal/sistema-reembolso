import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { PageButton } from './Pagination.style';

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: Function;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: IPaginationProps) => {
  return (
    <>
      <PageButton
        disabled={currentPage ? false : true}
        onClick={() => {
          if (currentPage) setCurrentPage(currentPage - 1);
        }}
      >
        <FaStepBackward />
      </PageButton>
      <PageButton
        disabled={
          currentPage === totalPages - 1 || totalPages === 0 ? true : false
        }
        onClick={() => {
          if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
        }}
      >
        <FaStepForward />
      </PageButton>
    </>
  );
};

export default Pagination;
