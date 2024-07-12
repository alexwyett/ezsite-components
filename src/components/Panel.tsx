import classNames from "classnames";

export function Div(props: React.ComponentProps<"div"> & { defaultClassNames: string }) {
  const { className, defaultClassNames, ...rest } = props;
  return (
    <div 
      {...rest} 
      className={
        classNames(
          defaultClassNames,
          className || ''
        )
      }
    />
  )
}

export function PanelInner(props: React.ComponentProps<"div">) {
  return (
    <Div 
      {...props} 
      defaultClassNames='flex flex-col gap-6 max-w-[800px] w-full mx-auto relative'
    />
  )
}

export function PanelOuter(props: React.ComponentProps<"div">) {
  return (
    <Div defaultClassNames='px-4 lg:px-0 py-4 lg:py-6 bg-gray-500' {...props} />
  )
}

export default function Panel(props: React.ComponentProps<"div">) {
  return (
    <PanelOuter className='px-4 lg:px-0 py-4 lg:py-6 bg-gray-500'>
      <PanelInner {...props} />
    </PanelOuter>
  )
}