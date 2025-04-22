import React, { useState } from "react";
import data from "./drugData.json"; // 데이터 파일 경로 확인하세요.

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [sameDoseOnly, setSameDoseOnly] = useState(false);

  // 입력 변화 처리 (자동완성)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]); // 입력값이 없으면 제안 목록 초기화
      return;
    }

    // 대소문자 구분 없이 약품명 필터링 (약품명만 기준)
    const lower = value.toLowerCase();
    const filtered = data
      .filter((item) =>
        item["약품명"]?.toLowerCase().startsWith(lower) // '시작하는' 단어만 필터링
      )
      .slice(0, 10); // 최대 10개 제안

    console.log("입력값: ", value); // 입력값 확인
    console.log("자동완성 제안: ", filtered); // 자동완성 제안 확인
    setSuggestions(filtered);
  };

  // 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    console.log("검색어: ", query); // 검색어 로그 출력
    const filtered = data.filter((item) =>
      item["약품명"]?.toLowerCase().includes(query.toLowerCase()) // 검색어 포함된 약품명
    );
    console.log("검색 결과: ", filtered); // 검색 결과 로그 출력
    setResults(filtered);
    setSelectedDrug(null);
    setSuggestions([]);
  };

  // 제안 항목 클릭 시 검색
  const handleSuggestionClick = (item) => {
    setQuery(item["약품명"]);
    handleSearch();
  };

  // 선택한 약물의 상세보기 처리
  const handleSelectDrug = (drug) => {
    setSelectedDrug(drug);
    setSameDoseOnly(false); // 선택한 약물의 용량 필터링을 비활성화
  };

  // 동일 성분과 용량을 가진 약물들 가져오기
  const getRelatedDrugs = () => {
    if (!selectedDrug) return [];
    return data.filter((item) => {
      const sameIngredient = item["성분명"] === selectedDrug["성분명"];
      const sameDose = item["용량"] === selectedDrug["용량"];
      return sameDoseOnly ? sameIngredient && sameDose : sameIngredient;
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>약물 검색</h1>
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <div style={styles.searchArea}>
            <input
              type="text"
              value={query}
              placeholder="약품명 입력"
              onChange={handleInputChange}
              style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>
              검색
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul style={styles.dropdown}>
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  style={styles.dropdownItem}
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item["약품명"]} {/* 약품명만 표시 */}
                </li>
              ))}
            </ul>
          )}
        </div>

        {!selectedDrug ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>약품명</th>
                <th>성분명</th>
                <th>용량</th>
              </tr>
            </thead>
            <tbody>
              {results.map((drug, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleSelectDrug(drug)}
                  style={styles.row}
                >
                  <td>{drug["약품명"]}</td>
                  <td>{drug["성분명"]}</td>
                  <td>{drug["용량"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <p>
              <strong>선택한 약품:</strong> {selectedDrug["약품명"]}
            </p>
            <label>
              <input
                type="checkbox"
                checked={sameDoseOnly}
                onChange={() => setSameDoseOnly((prev) => !prev)}
              />{" "}
              동일 용량만 보기
            </label>
            <table style={styles.table}>
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
                  <tr key={idx} style={styles.row}>
                    <td>{item["약품명"]}</td>
                    <td>{item["성분명"]}</td>
                    <td>{item["용량"]}</td>
                    <td>{item["제조사"]}</td>
                    <td>{item["제형"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setSelectedDrug(null)}
              style={styles.returnBtn}
            >
              돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f9fafb",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 15px rgba(0,0,0,0.05)",
    maxWidth: "640px",
    width: "100%",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textAlign: "center",
  },
  searchArea: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "8px 0 0 8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0 1rem",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "0 8px 8px 0",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "white",
    border: "1px solid #ccc",
    borderTop: "none",
    listStyle: "none",
    margin: 0,
    padding: 0,
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "0.5rem",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem",
    marginTop: "1rem",
  },
  row: {
    cursor: "pointer",
    borderTop: "1px solid #eee",
  },
  returnBtn: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#007bff",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default App;
