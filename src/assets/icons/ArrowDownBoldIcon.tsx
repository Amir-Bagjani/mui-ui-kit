import { SVGProps } from "react";

type ArrowDownBoldIconProps = SVGProps<SVGSVGElement>;

export const ArrowDownBoldIcon: React.FC<ArrowDownBoldIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.07976 8.00006L12.3098 8.00006L17.9198 8.00006C18.8798 8.00006 19.3598 9.16006 18.6798 9.84006L13.4998 15.0201C12.6698 15.8501 11.3198 15.8501 10.4898 15.0201L8.51976 13.0501L5.30976 9.84006C4.63976 9.16006 5.11976 8.00006 6.07976 8.00006Z"
        fill="#909090"
      />
    </svg>
  );
};
