import classNames from "classnames";

export default function Header(props: React.ComponentProps<"header">) {
  const { className, ...rest } = props;
  return (
    <header 
      {...rest} 
      className={
        classNames(
          'flex gap-4 p-6 lg:p-12 justify-center items-center bg-gray-600',
          className || ''
        )
      }
    />
  )
}