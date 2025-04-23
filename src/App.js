import React, { useState } from 'react';
import './App.css';
import drugData from './drugData.json'; // 이 경로는 실제 위치에 맞게 조정해주세요

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setSuggestions([]);
      setFilteredData([]);
    } else {
      const matchedSuggestions = drugData
        .filter((item) => item.제품명.includes(value))
        .map((item) => item.제품명);
      const uniqueSuggestions = [...new Set(matchedSuggestions)];
      setSuggestions(uniqueSuggestions);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    const filtered = drugData.filter((item) => item.제품명 === suggestion);
    setFilteredData(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = drugData.filter((item) => item.제품명 === searchTerm);
    setFilteredData(filtered);
  };

  return (
    <div className="app-container">
      <div className="search-box">
        <h2>약물 검색</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="제품명을 입력하세요"
            className="search-input"
          />
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {filteredData.length > 0 && (
          <table className="result-table">
            <thead>
              <tr>
                <th>약품명</th>
                <th>성분명</th>
                <th>용량</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.제품명}</td>
                  <td>{item.성분명}</td>
                  <td>{item.용량}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
