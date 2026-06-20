import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://yfjxpc4c43.execute-api.ap-northeast-1.amazonaws.com/digest";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDigest = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDigest();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>データの取得に失敗しました: {error}</p>
      </div>
    );
  }

  const isContentObject =
    data?.content &&
    typeof data.content === "object" &&
    !Array.isArray(data.content);

  const chatGptUrl = data?.referenceUrl
    ? `https://chatgpt.com/?q=${encodeURIComponent(data.referenceUrl)}`
    : null;

  return (
    <div className="container">
      <header className="header">
        <h1>AI Digest</h1>
      </header>
      <main>
        <div className="meta">
          <span className="date">{data?.date}</span>
          <h2 className="title">{data?.title}</h2>
        </div>
        <div className="content">
          {Object.entries(isContentObject ? data.content : {}).map(
            ([key, value]) => (
              <div key={key} className="section">
                <h3>{key}</h3>
                <p>
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value)}
                </p>
              </div>
            )
          )}
        </div>
        {data?.referenceUrl && (
          <div className="reference">
            <div>
              参照先URL:{" "}
              <a
                href={data.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.referenceUrl}
              </a>
            </div>
            <div>
              chatGPTに聞く:{" "}
              <a href={chatGptUrl} target="_blank" rel="noopener noreferrer">
                {chatGptUrl}
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
