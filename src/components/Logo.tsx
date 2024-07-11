export default function Logo({ label = 'SITES' }: { label?: string }) {
  return (
    <>
      <span
        className="text-white font-bold text-3xl lg:text-[3.5rem]"
      >
        <small>ez</small>{`{${label}}`}
      </span>
    </>
  )
}