import { SVGProps } from "react";

type ChevronLeftIconProps = SVGProps<SVGSVGElement>;

export const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="11"
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00022 11.2801L0.653555 6.93343C0.140221 6.42009 0.140221 5.58009 0.653555 5.06676L5.00022 0.720093"
        stroke="#505050"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
