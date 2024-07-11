export default function Blockquote({ title, description }: { title: string, description: string }) {
  return (
    <blockquote className="bg-white text-gray-900 p-4 rounded-md">
      <h3 className="uppercase tracking-widest text-sm font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </blockquote>
  )
}