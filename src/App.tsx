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

  const pullrequestToProgram = () => {
    const lines = text.split("\n")
    const result: string[] = []

    lines.forEach((line) => {
      const title = line.match(/^###\s*(.*)/)
      if (title) {
        if (result.length > 0) {
          result.push("})")
        }
        result.push(`describe("${title[1]}", () =>{`)
      }

      const description = line.match(/\[\s*\]\s*(.*)/)
      if (description) {
        result.push(`it("${description[1]}", () => {})`)
      }
    })
    result.push(`})`)

    return result.join("\n")
  }

  const generateTestCase = () => {
    return `type TestCase = {
    errorName: string
    status: number
  }

  const testCases: TestCase[] = [
  {
  }]`
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
      <button
        onClick={() => {
          setText(pullrequestToProgram)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テスト: プルリクエスト → プログラム
      </button>
      <button
        onClick={() => {
          setText(generateTestCase)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テストケースの型定義
      </button>
    </div>
  )
}

export default App
