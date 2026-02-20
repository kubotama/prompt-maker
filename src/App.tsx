import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-4 p-4">
      <textarea
        cols={80}
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2"
      ></textarea>
      <button
        onClick={() => setText("コミットしてください")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        コミット
      </button>
      <button
        onClick={() =>
          setText(
            "コミットはしてください。プッシュとプルリクエストの作成は、まだしないでください",
          )
        }
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        コミットのみ
      </button>
    </div>
  );
}

export default App;
