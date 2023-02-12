interface Props {
  link: string;
  label: string;
  styling: string;
}

/*
  Component to redirect users
*/
const Hyperlink: React.FC<Props> = ({ link, label, styling }) => {
  return (
    <a href={link} target='_blank' rel='noreferrer' className={styling}>
      <span className='px-1 mx-1'>{label}</span>
    </a>
  );
};

export default Hyperlink;
