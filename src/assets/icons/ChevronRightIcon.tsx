import { SVGProps } from "react";

type ChevronRightIcon = SVGProps<SVGSVGElement>;

export const ChevronRightIcon: React.FC<ChevronRightIcon> = (props) => {
  return (
    <svg
      {...props}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.93994 11.2801L10.2866 6.93343C10.7999 6.42009 10.7999 5.58009 10.2866 5.06676L5.93994 0.720093"
        stroke="#505050"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
