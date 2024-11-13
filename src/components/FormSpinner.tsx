import Spinner from "./Spinner";

export default function FormSpinner({ color }: { color?: string }) {
  return (
    <span className="absolute spinner h-full w-full top-0 left-0 flex place-content-center bg-inherit rounded-[inherit] opacity-0 group-[.loading]:opacity-100 pointer-events-none"><Spinner color={color} /></span>
  )
}