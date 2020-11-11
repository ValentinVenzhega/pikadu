// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');



const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;


const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');

const listUsers = [{
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'maks'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks'
  },
];

const setUsers = {
  user: null,
  // авторизация
  logIn(email, password, handler) {
    // проверка на валидность
    if (!regExpValidEmail.test(email)) {
      alert('email не валид');
      return;
    }

    const user = this.getUser(email);
    // проверка пароля
    if (user && user.password === password) {
      // теперь авторизовываемся
      this.autorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }


  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    // проверка на валидность
    if (!regExpValidEmail.test(email)) {
      alert('email не валид');
      return;
    }

    // прок=верка, чтобы нельзя было зайти без ввода данных
    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return;
    };

    // получение пользователя по email и доваляем пользователя 
    if (!this.getUser(email)) {
      const user = {
        email,
        password,
        displayName: email.substring(0, email.indexOf('@'))
      };
      // добавляем пользователя
      listUsers.push(user);
      // авторизуется пользователь успешно
      this.autorizedUser(user);
      // меняем блоки
      handler();
    } else {
      alert('Пользователь с таким email уже зарегестрирован')
    }
  },

  editUser(userName, userPhoto, handler) {
    // обновляем имя
    if (userName) {
      this.user.displayName = userName;
    }
    // обновляем фото
    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  },
  // перебираем массив и ищем пользователя с таким email
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  // записываем user в user
  autorizedUser(user) {
    this.user = user;
  }
};

// действия после авторизации
const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user:', user);

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};


// добавляем посты
const showAllPosts = () => {
  postsWrapper.innerHTML = ''

}

const init = () => {

  // вход
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    // получаем данные из полей input
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  // регистрация
  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    // получаем данные из полей input
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  // выход
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  //добавляем класс
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });


  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  // отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});

