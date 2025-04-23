import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <div className="App">
      <h2>약품 검색</h2>
      <input
        type="text"
        placeholder="약품명이나 성분명을 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {results.length > 0 && (
        <>
          <h2>약품 검색 결과</h2>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>약품명</th>
                <th>성분명</th>
              </tr>
            </thead>
            <tbody>
              {results.map((drug, index) => (
                <tr key={index}>
                  <td>{drug.name}</td>
                  <td>{drug.ingredient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
