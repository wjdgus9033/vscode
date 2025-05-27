const dropdown = document.querySelector('.dropdown');
const selected = document.querySelector('.dropdown-selected');
const options = document.querySelectorAll('.dropdown-list li');
const dropdownList = document.querySelector('.dropdown-list');
const result = document.getElementById('result');

// 드롭다운 클릭 시 목록 노출/숨김
selected.addEventListener('click', function () {
    dropdownList.classList.toggle('show');
});

// 옵션 선택 시 처리
options.forEach(function (option) {
    option.addEventListener('click', function () {
        selected.textContent = this.textContent;
        dropdownList.classList.remove('show'); 
        result.textContent = `선택한 직업: ${this.textContent}`;
    });
});

// 외부 클릭 시 메뉴 닫기
document.addEventListener('click', function (event) {
    console.log(event.target);
    if (!dropdown.contains(event.target)) {
        dropdownList.classList.remove('show');
    }
});