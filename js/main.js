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

// создаем посты
const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'maks@mail.com',
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголовок поста2',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aut veniam saepe minus dicta asperiores nisi quos perferendis deserunt maiores explicabo illum delectus adipisci eligendi a ipsum, repudiandae esse totam, ad incidunt nobis quam dolore. Sint eum ea nulla veritatis, laboriosam ex odit reiciendis nam repellat voluptates, molestias, accusamus in maiores corporis ut! Alias molestiae laboriosam voluptates deserunt cum quibusdam.',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: 'kate@mail.com',
      date: '10.11.2020, 20:54:00',
      like: 45,
      comments: 10,
    },
    {
      title: 'Заголовок поста3',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: 'kate@mail.com',
      date: '10.11.2020, 20:54:00',
      like: 55,
      comments: 10,
    }
  ]

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
  let postsHTML = '';
 // деструктивное присвоение { title, text, date }
  setPosts.allPosts.forEach(({ title, text, date, tags, like, comments }) => {

    postsHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${text}</p>
        <div class="tags">
          <a href="#" class="tag">${tags}</a>
        </div>
      </div>
      <div class="post-footer">
        <div class="post-buttons">
          <button class="post-button likes">
            <svg width="19" height="20" class="icon icon-like">
              <use xlink:href="img/icons.svg#like"></use>
            </svg>
            <span class="likes-counter">${like}</span>
          </button>
          <button class="post-button comments">
            <svg width="21" height="21" class="icon icon-comment">
              <use xlink:href="img/icons.svg#comment"></use>
            </svg>
            <span class="comments-counter">${comments}</span>
          </button>
          <button class="post-button save">
            <svg width="19" height="19" class="icon icon-save">
              <use xlink:href="img/icons.svg#save"></use>
            </svg>
          </button>
          <button class="post-button share">
            <svg width="17" height="19" class="icon icon-share">
              <use xlink:href="img/icons.svg#share"></use>
            </svg>
          </button>
        </div>
        <div class="post-author">
          <div class="author-about">
            <a href="#" class="author-username">arteislamov</a>
            <span class="post-time">5 минут назад</span>
          </div>
          <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
        </div>
      </div>
    </section>
    `;
  })
  postsWrapper.innerHTML = postsHTML;
};

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
// инициализация после полной загрузки сайта
document.addEventListener('DOMContentLoaded', () => {
  init();
});

