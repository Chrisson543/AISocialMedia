import { SVGProps } from "react";

export default function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M4 6h24v16H9l-5 5V6z" />
    </svg>
  );
}
