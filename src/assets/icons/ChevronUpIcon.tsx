import { SVGProps } from "react";

type ChevronDownIconProps = SVGProps<SVGSVGElement>;

export const ChevronUpIcon: React.FC<ChevronDownIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2802 10.0333L8.93355 5.68664C8.42021 5.1733 7.58022 5.1733 7.06688 5.68664L2.72021 10.0333"
        stroke="#505050"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
