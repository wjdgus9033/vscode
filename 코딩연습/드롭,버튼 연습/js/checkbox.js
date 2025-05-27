const checkboxItems = document.querySelectorAll('.checkbox-item');
const checkboxResult = document.getElementById('checkbox-result');

checkboxItems.forEach(function (item) {
    item.addEventListener('click', function () {
        // 선택/해제 토글
        this.classList.toggle('checked');
        showSelectedOptions();
    });
});

function showSelectedOptions() {
    const selected = [];
    checkboxItems.forEach(function (item) {
        if (item.classList.contains('checked')) {
            selected.push(item.textContent.trim());
        }
    });
    if (selected.length > 0) {
        checkboxResult.textContent = `선택한 취미: ${selected.join(', ')}`;
    } else {
        checkboxResult.textContent = '선택해 주세여';
    }
}