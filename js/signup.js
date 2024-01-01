const html = document.querySelector('html');
const logo = document.querySelectorAll('.nav__logo');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navigator = document.querySelector('.nav');
const moblieNavigator = document.querySelector('.m__nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const goToTop = function () {html.scrollIntoView({'behavior': 'smooth'});};
//modal window


window.onbeforeunload = console.log('refresh')

// 회원가입
function signup() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const emailInput = document.getElementById('email');

    const enteredID = usernameInput.value;
    const enteredPassword = passwordInput.value;
    const enteredName = nameInput.value;
    const enteredAddress = addressInput.value;
    const enteredEmail = emailInput.value;

    if (!isValidID(enteredID)) {
      alert('ID는 영문과 숫자의 혼합으로 작성해야 합니다.');
      return;
    }

    if (!isValidPassword(enteredPassword)) {
      alert('비밀번호는 영문과 숫자로 7자리 이상, 12자리 이하로만 가능합니다.');
      return;
    }

    if (!isValidName(enteredName)) {
      alert('이름은 영문 및 한글만 입력 가능합니다.');
      return;
    }

    const newUser = signupUser(enteredID, enteredPassword, enteredName, enteredAddress, enteredEmail);

    if (newUser) {
      saveUser(newUser);
      alert('회원가입이 완료되었습니다.');
      window.location.href = 'index.html';
    } else {
      alert('이미 존재하는 사용자 ID입니다. 다른  선택하세요.');
    }
  }

  function signupUser(ID, password, name, address, email) {
    const users = getUsers();

    if (users.some(user => user.ID === ID)) {
      return null;
    }

    const newUser = { ID, password, name, address, email };
    return newUser;
  }

  function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  function isValidID(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  }

  function isValidPassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{7,12}$/;
    return regex.test(password);
  }

  function isValidName(name) {
    const regex = /^[가-힣a-zA-Z]+$/;
    return regex.test(name);
  }



  //페이지 환경 변화, 로고 클릭 시 최상단으로 이동
// onresize = () => {goToTop();};
window.addEventListener('load', goToTop());
for(i = 0; i < logo.length; i++) {
    logo[i].addEventListener('click',() => {goToTop();});
}

///menu

const handleHover = function(e) {
    if(e.target.classList.contains('nav__link')){
        const link = e.target; //마우스 호버든 어떤 이벤트의 타겟이 된 <a></a>요소
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if(el !== link) {
                el.style.opacity = this;
            }
        })
        logo.style.opacity = this;
    }
}

navigator.addEventListener('mouseover', handleHover.bind(0.5))
navigator.addEventListener('mouseout', handleHover.bind(1))

//m__mobile__menu

const menuToggle = document.querySelector('.m__menu__toggle'); 
const mobileNavBg = document.querySelector('.m__nav'); 
const moblieMenu = document.querySelector('.m__nav__links');
const moblieMenuToggle = document.querySelector('.m__menu__toggle');
const moblieMenuItem = document.querySelectorAll('.m__nav__item');
let toggleCount = 0;
const toggleOpen = function () {
    mobileNavBg.classList.add('m__nav__toggle__bg');
    moblieMenu.classList.add('open');
    moblieMenuToggle.classList.add('open');
    for (let i = 0; i < moblieMenuItem.length; i++) {
        moblieMenuItem[i].classList.add('open')
    };
    console.log('open');
};
const toggleClose = function () {
    mobileNavBg.classList.remove('m__nav__toggle__bg');
    moblieMenu.classList.remove('open');
    moblieMenuToggle.classList.remove('open');
    for (let i = 0; i < moblieMenuItem.length; i++) {
        moblieMenuItem[i].classList.remove('open')
    };
    console.log('close');
};

menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(moblieMenuItem)
    if(toggleCount % 2 == 0) {
        toggleOpen();
    } else if (toggleCount % 2 == 1) {
        toggleClose();
    };
    toggleCount++;
    console.log(toggleCount);
});