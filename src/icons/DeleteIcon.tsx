type IconType = {
  width?: string;
  height?: string;
  className?: string;
};

export default function DeleteIcon(props: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || "20px"}
      height={props.height || "20px"}
      viewBox="0 0 24 24"
      className={props.className}
    >
      <path
        fill="currentColor"
        d="M5 21V6H4V4h5V3h6v1h5v2h-1v15H5Zm2-2h10V6H7v13Zm2-2h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
      ></path>
    </svg>
  );
}
