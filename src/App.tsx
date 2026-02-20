import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <textarea
        cols={80}
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2"
      ></textarea>
      <button
        onClick={() => setText("クリックして設定された文字列")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        文字列を設定
      </button>
    </div>
  );
}

export default App;
