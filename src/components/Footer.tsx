import Blockquote from "./Blockquote";

export default function Footer({
  quotes = []
}: {
  quotes?: { title: string, description: string }[]
}) {
  return (
    <>
      <footer className="flex flex-col gap-12 p-4 py-6 lg:px-0">
        {quotes?.length > 0 && (
          <div className="max-w-[800px] w-full mx-auto">
            <h2 className='font-bold text-2xl uppercase text-white mb-4'>FAQs</h2>
            <div className="flex flex-col gap-4">
              {quotes?.map((q, i) => <Blockquote {...q} key={i} />)}
            </div>
          </div>
        )}
        <div className="max-w-[800px] w-full mx-auto">
          <h2 className='font-bold text-2xl uppercase text-white mb-4'>Other EZ sites</h2>
          <ul className="flex gap-4">
            <li><a href='https://ezpdf.rocks' target="_blank" className="text-white">ezPDF</a></li>
            <li><a href='https://ezlinksite.vercel.app' target="_blank" className="text-white">ezLINKS</a></li>
            <li><a href='https://ezjson.vercel.app' target="_blank" className="text-white">ezJSON</a></li>
          </ul>
        </div>
        <div className="max-w-[800px] w-full mx-auto">
          <h2 className='font-bold text-2xl uppercase text-white mb-4'>About</h2>
          <ul className="flex gap-4">
            <li><a href='https://linkedin.com/in/alex-wyett-adams' target="_blank" className="text-white">LinkedIn</a></li>
            <li><a href='https://twitter.com/AlexWyett' target="_blank" className="text-white">Twitter</a></li>
          </ul>
        </div>
      </footer>
    </>
  )
}