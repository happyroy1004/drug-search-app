import React, { useState } from "react";
import data from "./drugData.json";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [sameDoseOnly, setSameDoseOnly] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const lower = value.toLowerCase();
    const filtered = data
      .filter((item) => item["약품명"]?.toLowerCase().startsWith(lower))
      .slice(0, 10);
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (item) => {
    setQuery(item["약품명"]);
    setSelectedDrug(item);
    setSuggestions([]);
  };

  const getRelatedDrugs = () => {
    if (!selectedDrug) return [];
    return data.filter((item) => {
      const sameIngredient = item["성분명"] === selectedDrug["성분명"];
      const sameDose = item["용량"] === selectedDrug["용량"];
      return sameDoseOnly ? sameIngredient && sameDose : sameIngredient;
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">약물 검색</h1>
        <div className="input-area">
          <input
            type="text"
            value={query}
            placeholder="약품명 입력"
            onChange={handleInputChange}
            className="input"
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="dropdown">
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                className="dropdown-item"
                onClick={() => handleSuggestionClick(item)}
              >
                {item["약품명"]}
              </li>
            ))}
          </ul>
        )}

        {selectedDrug && (
          <>
            <p>
              <strong>선택한 약품:</strong> {selectedDrug["약품명"]}
            </p>
            <label>
              <input
                type="checkbox"
                checked={sameDoseOnly}
                onChange={() => setSameDoseOnly((prev) => !prev)}
              />
              동일 용량만 보기
            </label>
            <table className="table">
              <thead>
                <tr>
                  <th>약품명</th>
                  <th>성분명</th>
                  <th>용량</th>
                  <th>제조사</th>
                  <th>제형</th>
                </tr>
              </thead>
              <tbody>
                {getRelatedDrugs().map((item, idx) => (
                  <tr key={idx}>
                    <td>{item["약품명"]}</td>
                    <td title={item["성분명"]}>
                      {item["성분명"].length > 10
                        ? item["성분명"].slice(0, 10) + "..."
                        : item["성분명"]}
                    </td>
                    <td>{item["용량"]}</td>
                    <td>{item["제조사"]}</td>
                    <td>{item["제형"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="returnBtn" onClick={() => setSelectedDrug(null)}>
              돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
