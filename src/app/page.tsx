export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm space-y-6">
        <p className="text-lg">RAG over GTC</p>
        <p>Use <b>Library</b> to select documents used for asking questions.<br></br>
          Then ask one question over multiple docs on <b>Ask</b> page.</p>
      </div>
    </main>
  )
}
