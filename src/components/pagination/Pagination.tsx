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
      <button
        onClick={() => {
          if (currentPage) setCurrentPage(currentPage - 1);
        }}
      >
        Anterior
      </button>
      <button
        onClick={() => {
          if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
        }}
      >
        Próxima
      </button>
    </>
  );
};

export default Pagination;
