import { useState } from "react"
import "./App.css"

function App() {
  const [text, setText] = useState("")

  const commitToPullrequest = () => {
    const regex = /-m\s+"([^"]*)"/g

    const matches: string[] = []
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      // 捕獲グループ（クォートの内側）を追加
      matches.push(match[1])
    }

    return `### ${matches[0]}\n${matches[1]}`
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <textarea
        cols={80}
        rows={15}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2"
      ></textarea>
      <button
        onClick={() => setText(commitToPullrequest)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        コミットコマンド → プルリクエスト
      </button>
    </div>
  )
}

export default App
