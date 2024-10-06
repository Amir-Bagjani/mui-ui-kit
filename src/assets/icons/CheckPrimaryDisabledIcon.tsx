import { SVGProps } from "react";

type CheckPrimaryDisabledIconProps = SVGProps<SVGSVGElement>;

export const CheckPrimaryDisabledIcon: React.FC<
  CheckPrimaryDisabledIconProps
> = (props) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#A0CFD3" />
      <path
        d="M7.71484 11.9871L10.4346 14.5716L16.2863 9.42871"
        stroke="#F4F4F4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
