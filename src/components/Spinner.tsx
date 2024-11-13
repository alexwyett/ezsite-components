import classNames from "classnames";
import { SVGAttributes } from "react";

type SpinnerProps = SVGAttributes<HTMLOrSVGElement> & {
  ticked?: boolean;
  color?: string;
};

export default function Spinner(props: SpinnerProps) {
  const { ticked, color, ...rest } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" data-ticked={ticked ? 'true' : 'false'} viewBox="-10 -10 120 120" width='30' {...rest}>
      <circle 
        cx="50"
        cy="50"
        r="46"
        className={
          classNames(
            "fill-none",
            color || "stroke-slate-500",
            {
              'animate-spin': !ticked,
              'duration-400': ticked
            }
          )
        }
        style={{
          stroke: "3",
          strokeWidth: "12",
          transformOrigin: '50px 50px 0',
          strokeDashoffset: ticked ? '66' : '1000',
          strokeDasharray: ticked ? '1000' : '314',
          transition: 'stroke-dasharray 2s ease-out'
        }}
      />
      <polyline 
        fill="none" 
        strokeWidth={12} 
        strokeLinejoin="round" 
        strokeMiterlimit={10} 
        points="25,55 45,70 75,33"
        style={{
          strokeDasharray: ticked ? 1000 : 0,
          strokeDashoffset: ticked ? 1000 : 0
        }}
        className={
          classNames(
            "stroke-slate-500",
            {
              'animate-tickLine': ticked,
              'opacity-0': !ticked,
              'opacity-100': ticked
            }
          )
        }
      />
    </svg>
  )
}