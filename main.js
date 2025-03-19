function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function generateFormFields() {
    const form = document.getElementById('dynamicForm');
    while (form.firstChild && form.firstChild.tagName !== "BUTTON") {
        form.removeChild(form.firstChild);
    }
    let config = localStorage.getItem('formConfig');
    if (!config) {
        const info = document.createElement('p');
        info.textContent = "لەلایەن ئیدارەوە هیچ فۆڕمێک دروست نەکراوە بۆ ئەم بەشە.";
        form.insertBefore(info, form.firstChild);
        return;
    }
    config = JSON.parse(config);
    if (window.formType !== config.category && config.category !== "all") {
        const info = document.createElement('p');
        info.textContent = "لەلایەن ئیدارەوە هیچ فۆڕمێک دروست نەکراوە بۆ ئەم بەشە.";
        form.insertBefore(info, form.firstChild);
        return;
    }
    config.questions.forEach((question, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-field';
        const label = document.createElement('label');
        label.textContent = question.title;
        label.htmlFor = `field_${index}`;
        wrapper.appendChild(label);
        let input;
        switch (question.type) {
            case 'text':
                input = document.createElement('input');
                input.type = 'text';
                break;
            case 'number':
                input = document.createElement('input');
                input.type = 'number';
                break;
            case 'date_time':
                input = document.createElement('input');
                input.type = 'datetime-local';
                break;
            case 'photo':
                input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                break;
            case 'file':
                input = document.createElement('input');
                input.type = 'file';
                break;
            case 'audio':
                input = document.createElement('input');
                input.type = 'file';
                input.accept = 'audio/*';
                break;
            case 'select_one':
                input = document.createElement('select');
                ['خيار 1', 'خيار 2'].forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    input.appendChild(option);
                });
                break;
            case 'select_many':
                const checkboxWrapper = document.createElement('div');
                ['خيار 1', 'خيار 2', 'خيار 3'].forEach(opt => {
                    const checkboxLabel = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = `field_${index}`;
                    checkbox.value = opt;
                    checkboxLabel.appendChild(checkbox);
                    checkboxLabel.appendChild(document.createTextNode(opt));
                    checkboxWrapper.appendChild(checkboxLabel);
                });
                wrapper.appendChild(checkboxWrapper);
                form.insertBefore(wrapper, form.lastElementChild);
                return;
            default:
                input = document.createElement('input');
                input.type = 'text';
        }
        input.id = `field_${index}`;
        input.name = `field_${index}`;
        wrapper.appendChild(input);
        form.insertBefore(wrapper, form.lastElementChild);
    });
    form.onsubmit = function (e) {
        e.preventDefault();
        saveSubmission();
    };
}

function saveSubmission() {
    const form = document.getElementById('dynamicForm');
    const formData = {};
    let config = localStorage.getItem('formConfig');
    if (!config) {
        showToast("لا توجد إعدادات للنموذج محفوظة.", "error");
        return;
    }
    config = JSON.parse(config);
    config.questions.forEach((question, index) => {
        const fieldId = `field_${index}`;
        let value;
        if (question.type === 'select_many') {
            const checkboxes = document.getElementsByName(fieldId);
            value = [];
            Array.from(checkboxes).forEach(cb => {
                if (cb.checked) {
                    value.push(cb.value);
                }
            });
        } else if (['photo', 'file', 'audio'].includes(question.type)) {
            const input = document.getElementById(fieldId);
            value = input.files.length > 0 ? input.files[0].name : "";
        } else {
            const input = document.getElementById(fieldId);
            value = input.value;
        }
        formData[question.title] = value;
    });
    const submission = {
        formType: window.formType || "غير محدد",
        data: formData,
        timestamp: new Date().toISOString()
    };
    let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));
    showToast("بە سەرکەوتوویی هەڵگیرا!", "success");
    form.reset();
}

function displaySubmissions() {
    const container = document.getElementById('submissionsContainer');
    container.innerHTML = "";
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    if (submissions.length === 0) {
        container.textContent = "لە ئێستادا هیچ فۆڕمێک هەڵنەگیراوە.";
        return;
    }
    submissions.forEach((sub, index) => {
        const subDiv = document.createElement('div');
        subDiv.className = 'submission';
        subDiv.style.opacity = '0';
        subDiv.style.transform = 'translateY(20px)';
        const heading = document.createElement('h3');
        heading.textContent = `نوع النموذج: ${sub.formType} - ${new Date(sub.timestamp).toLocaleString()}`;
        subDiv.appendChild(heading);
        const ul = document.createElement('ul');
        for (const key in sub.data) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${sub.data[key]}`;
            ul.appendChild(li);
        }
        subDiv.appendChild(ul);
        container.appendChild(subDiv);
        setTimeout(() => {
            subDiv.style.opacity = '1';
            subDiv.style.transform = 'translateY(0)';
        }, index * 100);
    });
}