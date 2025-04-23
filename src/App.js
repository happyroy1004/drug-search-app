// 예시 데이터
const drugs = [
  { name: '가나티린정30mg', ingredient: 'Mosapride', dosage: '30mg' },
  { name: '가나티린정50mg', ingredient: 'Mosapride', dosage: '50mg' },
  { name: '가모드정', ingredient: 'MosaprideCitrate', dosage: '5.29mg' },
  { name: '가나프리드정', ingredient: 'ItoprideHcl', dosage: '50mg' },
  { name: '가뉴틴캡슐300mg', ingredient: 'Gabapentin', dosage: '300mg' },
  // 필요 시 더 추가
];

const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocompleteList');
const drugResults = document.getElementById('drugResults');

// 자동완성 제안
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  console.log('입력값 :', query);

  autocompleteList.innerHTML = '';
  if (query.length === 0) return;

  const matched = drugs.filter(drug => drug.name.includes(query));
  console.log('자동완성 제안 :', matched);

  matched.forEach(drug => {
    const li = document.createElement('li');
    li.textContent = drug.name;

    li.addEventListener('click', () => {
      console.log('✅ 선택한 드롭다운 항목:', drug.name);
      searchInput.value = drug.name;
      autocompleteList.innerHTML = '';
      performSearchByIncludes(drug.name); // ⬅ 포함 검색 수행
    });

    autocompleteList.appendChild(li);
  });
});

// 엔터 입력 시 검색
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    performSearchByIncludes(query);
    autocompleteList.innerHTML = '';
  }
});

// 포함 검색 함수
function performSearchByIncludes(query) {
  const results = drugs.filter(drug => drug.name.includes(query));
  console.log('📋 검색 결과:', results);

  drugResults.innerHTML = '';
  if (results.length === 0) {
    drugResults.innerHTML = '<tr><td colspan="3">검색 결과 없음</td></tr>';
    return;
  }

  results.forEach(drug => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${drug.name}</td>
      <td>${drug.ingredient}</td>
      <td>${drug.dosage}</td>
    `;
    drugResults.appendChild(row);
  });
}
