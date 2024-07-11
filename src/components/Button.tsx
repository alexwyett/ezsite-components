import classNames from "classnames";

export default function Button(props: React.ComponentProps<"button">) {
  const { className, ...rest } = props;
  return (
    <button 
      {...rest} 
      className={
        classNames(
          'cursor-pointer disabled:cursor-not-allowed text-gray-800 tracking-widest bg-white rounded-full font-bold uppercase text-xs border-[3px] border-gray-500 disabled:border-gray-700 p-2 px-6',
          className || ''
        )
      }
    />
  )
}