import { useEffect, useState } from "react";

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
    <div>
      	<h1>AI Digest</h1>
	<h2>{data?.title}</h2>

	{
		Object.entries(data || {}).map(
			([title,content]) => (
				<div key={title}>
					<h3>{title}</h3>
					<p>{content}</p>
				</div>
			)	
		)
	}
    </div>
  );
}

export default App;
