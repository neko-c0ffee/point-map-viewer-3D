import { useState, useEffect } from 'react';
import './scss/CsvURLInput.scss'

function CsvURLInput({ onFetch, initialUrl }: { onFetch: (url: string) => void; initialUrl: string }) {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
	const savedUrl = localStorage.getItem('csvUrl');
	if (savedUrl) {
		setUrl(savedUrl);
		onFetch(savedUrl);
	}
  }, []);

  const handleFetch = () => {
	localStorage.setItem('csvUrl', url);
	onFetch(url);
  }

  return (
    <div className='input-container'>
      <input
        type='text'
        placeholder='CSV の URL を入力'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleFetch}>決定</button>
    </div>
  );
}

export default CsvURLInput;