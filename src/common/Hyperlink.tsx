interface Props {
  link: string;
  label: string;
  styling: string;
}

const Hyperlink: React.FC<Props> = ({ link, label, styling }) => {
  return (
    <a href={link} target='_blank' rel='noreferrer' className={styling}>
      <span className='px-1 mx-1 outline rounded'>{label}</span>
    </a>
  );
};

export default Hyperlink;
