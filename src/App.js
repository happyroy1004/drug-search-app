// 예시 약물 데이터
const drugs = [
  { name: '가바렉스정', ingredient: 'Gabapentin', dosage: '100mg' },
  { name: '가모드정', ingredient: 'Gamotidine', dosage: '20mg' },
  { name: '가뉴틴캡슐', ingredient: 'Gabapentin', dosage: '300mg' },
  { name: '가나프리드정', ingredient: 'Ganafprid', dosage: '10mg' },
];

const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocompleteList');
const drugResults = document.getElementById('drugResults');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  console.log('🔍 입력 중 검색어:', query);

  autocompleteList.innerHTML = '';
  if (query.length === 0) {
    return;
  }

  const matched = drugs.filter(drug => drug.name.includes(query));
  console.log('🧠 드롭다운 후보:', matched.map(d => d.name));

  matched.forEach(drug => {
    const li = document.createElement('li');
    li.textContent = drug.name;
    li.addEventListener('click', () => {
      searchInput.value = drug.name;
      autocompleteList.innerHTML = '';
      performSearch(drug.name);
    });
    autocompleteList.appendChild(li);
  });
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    performSearch(query);
  }
});

function performSearch(query) {
  console.log('🔎 검색 시작 (선택 or 엔터):', query);
  const results = drugs.filter(drug => drug.name === query);
  console.log('📋 필터링된 결과:', results);

  drugResults.innerHTML = '';
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
