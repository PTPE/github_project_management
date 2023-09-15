type ExitType = {
  className?: string;
  onClick?: () => void;
};

export default function Exit(props: ExitType) {
  return (
    <div
      className={`relative cursor-pointer w-5 h-5 ${props.className} flex items-center justify-center`}
      onClick={props.onClick}
    >
      <div className="w-full h-[2px] absolute rotate-[45deg] bg-black"></div>
      <div className="w-full h-[2px] absolute rotate-[-45deg] bg-black"></div>
    </div>
  );
}
