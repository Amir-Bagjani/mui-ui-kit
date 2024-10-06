import { SVGProps } from "react";

type ArrowLeftBoldIconProps = SVGProps<SVGSVGElement>;

export const ArrowLeftBoldIcon: React.FC<ArrowLeftBoldIconProps> = (props) => {
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
        d="M12.0002 6.21997V9.77997C12.0002 11.9933 10.4335 12.8933 8.52016 11.7933L7.66683 11.3C7.46016 11.18 7.3335 10.96 7.3335 10.72V5.27997C7.3335 5.03997 7.46016 4.81997 7.66683 4.69997L8.52016 4.20664C10.4335 3.10664 12.0002 4.00664 12.0002 6.21997Z"
        fill="#707070"
      />
      <path
        d="M6.66687 5.85998V10.1466C6.66687 10.4066 6.38687 10.5666 6.16687 10.4333L5.43353 10.0066C3.5202 8.90664 3.5202 7.09331 5.43353 5.99331L6.16687 5.56664C6.38687 5.43998 6.66687 5.59998 6.66687 5.85998Z"
        fill="#707070"
      />
    </svg>
  );
};
