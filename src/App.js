import React, { useState } from 'react';
import './App.css';

const drugData = [
  {
    id: 1,
    name: '타이레놀',
    ingredient: 'Acetaminophen1234567890'
  },
  {
    id: 2,
    name: '부루펜',
    ingredient: 'Ibuprofen'
  },
  {
    id: 3,
    name: '게보린',
    ingredient: 'Acetaminophen + Isopropylantipyrine + Caffeine'
  }
];

function App() {
  const [selectedDrug, setSelectedDrug] = useState(null);

  return (
    <div className="container">
      <h1>약품 검색 결과</h1>
      <table className="drug-table">
        <thead>
          <tr>
            <th>약품명</th>
            <th>성분명</th>
          </tr>
        </thead>
        <tbody>
          {drugData.map((drug) => (
            <tr
              key={drug.id}
              onClick={() => setSelectedDrug(drug)}
              className={selectedDrug?.id === drug.id ? 'selected' : ''}
            >
              <td>{drug.name}</td>
              <td>
                <span className="ellipsis" title={drug.ingredient}>
                  {drug.ingredient.length > 10
                    ? `${drug.ingredient.slice(0, 10)}...`
                    : drug.ingredient}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDrug && (
        <div className="selected-info">
          <h2>선택한 약품 정보</h2>
          <p><strong>약품명:</strong> {selectedDrug.name}</p>
          <p><strong>성분명:</strong> {selectedDrug.ingredient}</p>
        </div>
      )}
    </div>
  );
}

export default App;
