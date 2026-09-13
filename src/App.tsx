import { useRef, useState } from "react"
import "./App.css"

function App() {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const commitToPullrequest = () => {
    const regex = /-m\s+"([^"]*)"/g

    const matches: string[] = []
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      // 捕獲グループ（クォートの内側）を追加
      matches.push(match[1])
    }

    return `#### ${matches[0]}\n${matches[1]}`
  }

  const pullrequestToProgram_todo = () => {
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
        result.push(`it("${description[1]}", async () => {})`)
      }
    })
    result.push(`})`)

    return result.join("\n")
  }

  const pullrequestToProgram_layers = () => {
    const lines = text.split("\n")
    let result: string = ""
    let level: number = 0

    lines.forEach((line) => {
      const level1 = line.match(/^###\s*(.*)/)
      const level2 = line.match(/^-\s+(.*)/)
      const level3 = line.match(/^\s+-\s+(.*)/)

      if (level1) {
        result = result + `describe('${level1[1]}', () =>{\n`
        level = 1
      } else if (level2) {
        result = result + `describe('${level2[1]}', () => {\n`
        level = 2
      } else if (level3) {
        result = result + `it('${level3[1]}', async () => {})\n`
      } else if (level > 1) {
        result = result + " })\n".repeat(level - 1)
        level = 0
      }
    })

    return result
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

  const setTextFocus = (newText: string) => {
    setText(newText)
    textareaRef.current?.focus()
  }

  const transferTestcase = () => {
    const description = text.match(/\s*it\('(.*)'/)
    if (description) {
      return `{ errorName: '${description[1]}', }`
    }
    return ""
  }

  const correctAndIncorrect = () => {
    return `describe('正常系', () => {})

describe('異常系', () => {})
`
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <textarea
        cols={80}
        rows={15}
        value={text}
        onChange={(e) => setTextFocus(e.target.value)}
        ref={textareaRef}
        className="border p-2"
      ></textarea>
      <button
        onClick={() => {
          const newText = commitToPullrequest()
          setTextFocus(newText)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        コミットコマンド → プルリクエスト
      </button>
      <button
        onClick={() => {
          const newText = pullrequestToProgram_todo()
          setTextFocus(newText)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テスト: プルリクエスト → プログラム (- [ ])
      </button>
      <button
        onClick={() => {
          const newText = pullrequestToProgram_layers()
          setTextFocus(newText)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テスト: プルリクエスト → プログラム (2階層)
      </button>
      <button
        onClick={() => {
          const newText = correctAndIncorrect()
          setTextFocus(newText)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        正常系と異常系
      </button>
      <button
        onClick={() => {
          const newText = generateTestCase()
          setTextFocus(newText)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テストケースの型定義
      </button>
      <button
        onClick={() => {
          const newText = transferTestcase()
          setTextFocus(newText)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テストデータに変換
      </button>
    </div>
  )
}

export default App
