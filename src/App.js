const drugData = [
  { name: "가나티란정", ingredient: "Mosapride", dose: "citrate" },
  { name: "가모드정", ingredient: "Omeprazole", dose: "20mg" },
  { name: "가뉴틴캡슐", ingredient: "Gabapentin", dose: "300mg" },
  { name: "가바렉스정", ingredient: "Gabapentin", dose: "300mg" },
  { name: "가나프리드정", ingredient: "Mosapride", dose: "5mg" },
  // 여기에 추가 가능
];

const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocomplete-list");
const resultsTable = document.querySelector("#resultsTable tbody");

// 자동완성 리스트 렌더링
searchInput.addEventListener("input", () => {
  const input = searchInput.value.trim().toLowerCase();
  autocompleteList.innerHTML = "";

  if (input === "") return;

  const filtered = drugData.filter(drug =>
    drug.name.includes(input)
  );

  filtered.forEach(drug => {
    const item = document.createElement("li");
    item.textContent = drug.name;
    item.addEventListener("click", () => {
      searchInput.value = drug.name;
      autocompleteList.innerHTML = "";
      showResults(drug.name); // 드롭다운 선택 시도 정확 검색
    });
    autocompleteList.appendChild(item);
  });
});

// 엔터로 검색
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    showResults(searchInput.value.trim());
    autocompleteList.innerHTML = "";
  }
});

// 검색결과 필터링 및 렌더링
function showResults(query) {
  const result = drugData.filter(drug =>
    drug.name === query
  );

  resultsTable.innerHTML = "";

  result.forEach(drug => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${drug.name}</td>
      <td>${drug.ingredient}</td>
      <td>${drug.dose}</td>
    `;
    resultsTable.appendChild(row);
  });
}
