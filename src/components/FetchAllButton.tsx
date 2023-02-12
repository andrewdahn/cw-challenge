interface Props {
  fetchAll: () => Promise<void>;
}

const FetchAllButton: React.FC<Props> = ({ fetchAll }) => {
  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={fetchAll}
      >
        Fetch All Data
      </button>
    </div>
  );
};

export default FetchAllButton;
