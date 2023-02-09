interface Props {
  setCurrent: () => void;
  setPrevious: () => void;
  currentPage: number;
  lastPage: number;
}

/*
  Button group for selecting previous and next pages in regards to pagination
*/
const PaginationButtons: React.FC<Props> = ({
  setCurrent,
  setPrevious,
  currentPage,
  lastPage,
}) => {
  return (
    <div className='flex justify-center content-center py-4'>
      <button
        className='mr-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full'
        disabled={currentPage === 1}
        onClick={setPrevious}
      >
        Previous
      </button>
      <button
        className='ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        disabled={currentPage === lastPage}
        onClick={setCurrent}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
