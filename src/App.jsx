import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDigest = async () => {
      const response = await fetch(
        "https://yfjxpc4c43.execute-api.ap-northeast-1.amazonaws.com/digest"
      );
      const result = await response.json();
      console.log(result);
      setData(result);
    };

    fetchDigest();
  }, []);

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
          {Object.entries(data?.content || {}).map(([key, value]) => (
            <div key={key} className="section">
              <h3>{key}</h3>
              <p>{String(value)}</p>
            </div>
          ))}
        </div>
        {data?.referenceUrl && (
          <div className="reference">
            参照先URL:{" "}
            <a href={data.referenceUrl} target="_blank" rel="noopener noreferrer">
              {data.referenceUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
