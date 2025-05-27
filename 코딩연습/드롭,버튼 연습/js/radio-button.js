const radioItems = document.querySelectorAll('.radio-item');
const radioResult = document.getElementById('radio-result');

radioItems.forEach(function (item) {
    item.addEventListener('click', function () {
        // 기존 선택 해제
        radioItems.forEach(function (el) {
            el.classList.remove('selected');
        });
        // 현재 항목만 선택
        this.classList.add('selected');
        // 결과 표시
        radioResult.textContent = `선택한 지역: ${this.textContent.trim()}`;
    });
});