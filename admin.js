document.getElementById('add-question').addEventListener('click', function () {
    const container = document.getElementById('questions-container');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.style.opacity = '0';
    questionDiv.innerHTML = `
      <input type="text" placeholder="عنوان السؤال" class="question-title">
      <select class="question-type">
        <option value="text">نص</option>
        <option value="number">رقم</option>
        <option value="date_time">تاريخ ووقت</option>
        <option value="photo">صورة</option>
        <option value="file">ملف</option>
        <option value="audio">صوت</option>
        <option value="select_one">اختيار واحد</option>
        <option value="select_many">اختيار متعدد</option>
      </select>
      <button class="remove-question">حذف السؤال</button>
    `;
    container.appendChild(questionDiv);

    setTimeout(() => {
        questionDiv.style.opacity = '1';
        questionDiv.style.transform = 'translateY(0)';
    }, 10);

    questionDiv.querySelector('.remove-question').addEventListener('click', function () {
        questionDiv.style.opacity = '0';
        questionDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            container.removeChild(questionDiv);
        }, 300);
    });
});
document.getElementById('save-form').addEventListener('click', function () {
    const category = document.getElementById('form-category').value;
    const questions = document.querySelectorAll('.question-item');
    const formConfig = [];
    questions.forEach(item => {
        const title = item.querySelector('.question-title').value;
        const type = item.querySelector('.question-type').value;
        if (title.trim() !== "") {
            formConfig.push({ title, type });
        }
    });

    const configToSave = {
        category: category,
        questions: formConfig
    };

    localStorage.setItem('formConfig', JSON.stringify(configToSave));
    alert("بە سەرکەوتوویی هەڵگیرا!");
});
