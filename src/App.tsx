import { useEffect, useState } from 'react'
import Navbar from './Navbar';

function App() {
  const savedUrl = localStorage.getItem('csvUrl') || '';

  const [data, setData] = useState<string[][]>([]);

  const fetchCSV = (url: string) => {
    fetch(url)
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').map(row => row.split(','));
        setData(rows);
      });
  }

  useEffect(() => {
    document.title = '座標マップビュアー';

    if (savedUrl) {
      fetchCSV(savedUrl);
    }
  }, []);

  return (
    <>
      <Navbar onFetch={fetchCSV} savedUrl={savedUrl} />
      <table>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
