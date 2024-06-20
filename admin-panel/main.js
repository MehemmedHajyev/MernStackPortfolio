let projects = [];
let services = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '1' && password === '1') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('admin-name').innerText = username;
    } else {
        alert('Geçersiz kullanıcı adı veya şifre');
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById(sectionId).style.display = 'block';
}

function showForm(type, formId, index) {
    const formTitle = document.getElementById('form-title');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectImage = document.getElementById('project-image');
    const projectImgPreview = document.getElementById('project-img-preview');

    if (type === 'create') {
        formTitle.innerText = 'Yeni Proje Ekle';
        projectTitle.value = '';
        projectDescription.value = '';
        projectImage.value = '';
        projectImgPreview.src = '';
    } else if (type === 'edit') {
        formTitle.innerText = 'Proje Düzenle';
        projectTitle.value = projects[index].title;
        projectDescription.value = projects[index].description;
        projectImage.value = '';
        projectImgPreview.src = projects[index].image || '';
        projectTitle.setAttribute('data-index', index);
    }

    document.getElementById(formId).style.display = 'block';

    // Dinamik resim yükleme işlevselliği ekleyin
    const inputImg = document.getElementById('project-image');
    const imgPreview = document.getElementById('project-img-preview');
    inputImg.addEventListener('change', () => {
        imgPreview.src = URL.createObjectURL(inputImg.files[0]);
    });
}

function cancelForm() {
    document.getElementById('portfolio-form').style.display = 'none';
    document.getElementById('services-form').style.display = 'none';
}

function saveProject(type) {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    
    const title1 = document.getElementById('service-title').value;
    const description1 = document.getElementById('service-description').value;



    const imageInput = document.getElementById('project-image');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

    const index = document.getElementById('project-title').getAttribute('data-index');

    const newProject = { title, description, image };

    if (title && description) {
        if (type === 'portfolio') {
            if (index) {
                projects[index] = newProject;
            } else {
                projects.push(newProject);
            }
            renderProjects('portfolio-list');
        } if (type === 'services') {
            if (index) {
                services[index] = newProject;
            } else {
                services.push(newProject);
            }
            renderProjects('services-list');
        }
        cancelForm();
    } else {
        alert('Lütfen tüm alanları doldurun');
    }
}

function renderProjects(targetId) {
    const target = document.getElementById(targetId);
    target.innerHTML = '';

    const items = targetId === 'portfolio-list' ? projects : services;

    items.forEach((item, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.title}" class="img">
            <button onclick="editProject(${index}, '${targetId}')">Düzenle</button>
            <button onclick="deleteProject(${index}, '${targetId}')">Sil</button>
        `;
        target.appendChild(projectElement);
    });
}

function editProject(index, targetId) {
    showForm('edit', targetId === 'portfolio-list' ? 'portfolio-form' : 'services-list', 'services-form', index);
}

function deleteProject(index, targetId) {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
        if (targetId === 'portfolio-list') {
            projects.splice(index, 1);
        } else {
            services.splice(index, 1);
        }
        renderProjects(targetId);
    }
}

// Dinamik resim yükleme işlevselliği her form için
function addDynamicImageUpload(formId, imgId) {
    const input = document.querySelector(`#${formId} .input-img`);
    const image = document.querySelector(`#${formId} .img`);
    input.addEventListener('change', () => {
        image.src = URL.createObjectURL(input.files[0]);
    });
}

// Admin image-add
addDynamicImageUpload('portfolio-form', 'project-img-preview');
addDynamicImageUpload('services-form', 'service-img-preview');
