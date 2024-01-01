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

window.onbeforeunload = function(){
    console.log('refresh');
    revealSection();
    goToTop();};

//로그인 시스템
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const loginButton = document.getElementById('login-button');
    const mobileLogoutButton = document.getElementById('m-logout-button');
    const mobileLoginButton = document.getElementById('m-login-button');
    const modalButton = document.getElementById('footer--modal');
    const contentDiv = document.getElementById('contentDiv');

    if (user) {
      loginForm.style.display = 'none';
      modalButton.style.display = 'none';
      logoutButton.style.display = 'none';
      loginButton.style.display = 'block';
      mobileLogoutButton.style.display = 'none';
      mobileLoginButton.style.display = 'block';
      contentDiv.innerHTML = `
      <h1>Hello, ${user.name}! Please go to the link below to make a reservation.</h1>
      <a href="https://booking.pension.onda.me/104372/calendar" id="footer--modal" class="btn btn--show-modal">Reservation page</a>
      `;
    } else {
      loginForm.style.display = 'block';
      modalButton.style.display = 'inline-block';
      logoutButton.style.display = 'block';
      loginButton.style.display = 'none';
      mobileLogoutButton.style.display = 'block';
      mobileLoginButton.style.display = 'none';
      contentDiv.innerHTML = `
      <h1>The reservation service requires a login.</h1>
      <h2>Don't you have an account?</h2>
      <a href="signup.html" id="footer--modal" class="btn btn--show-modal">Creat Account</a>
      `
    }
  });
  function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const passwordVisibilityButton = document.getElementById('password-visibility-button');

    // 입력된 비밀번호의 가시성을 토글
    if (passwordInput.type === 'password') {
      passwordInput.type = 'password';
      passwordVisibilityButton.textContent = 'Show Password';
    } else {
      passwordInput.type = 'text';
      passwordVisibilityButton.textContent = 'Hide Password';
    }
  };
  togglePasswordVisibility();

  function login() {
    const IDInput = document.getElementById('ID');
    const passwordInput = document.getElementById('password');
    const IDErrorMessage = document.getElementById('ID-error-message');
    const passwordErrorMessage = document.getElementById('password-error-message');

    const enteredID = IDInput.value;
    const enteredPassword = passwordInput.value;

    // 조건을 만족하는지 체크
    const isIDValid = /^[a-zA-Z0-9]+$/.test(enteredID);
    const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/.test(enteredPassword);

    // 에러 메시지 업데이트
    IDErrorMessage.textContent = isIDValid ? '' : 'ID는 영문 숫자 혼합이어야 합니다.';
    passwordErrorMessage.textContent = isPasswordValid ? '' : '비밀번호는 영문 숫자 혼합 7자리 이상이어야 합니다.';

    if (isIDValid && isPasswordValid) {
      const user = loginUser(enteredID, enteredPassword);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        alert(`안녕하세요, ${user.name}님!`);
        location.reload();
      } else {
        // alert('잘못된 사용자 이름 또는 비밀번호입니다.');
        passwordErrorMessage.textContent = '아이디나 비밀번호가 일치하지 않습니다.';
      }
    }
  }

  function loginUser(ID, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    return users.find(u => u.ID === ID && u.password === password);
  }

  function logout() {
    localStorage.removeItem('user');
    location.reload();
  }

  // Enter 키 이벤트 처리
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      login();
    }
  });



  //페이지 환경 변화, 로고 클릭 시 최상단으로 이동

onresize = () => {
    if(window.innerWidth > 768) {goToTop();};
};
window.addEventListener('load', goToTop());
for(i = 0; i < logo.length; i++) {
    logo[i].addEventListener('click',() => {goToTop();});
}

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function () {
    const IDInput = document.getElementById('ID');
    const passwordInput = document.getElementById('password');
    
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    IDInput.value = null;
    passwordInput.value = null;
}

btnsOpenModal.forEach(btn => btn.addEventListener('click' , openModal));
btnCloseModal.addEventListener('click' , closeModal);
overlay.addEventListener('click' , closeModal);

document.addEventListener('keydown', function(e){
    if(e.key == 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//tab

tabsContainer.addEventListener('click',function(e){
    // const clicked = e.target;
    //=> 숫자도 같이올라감 operations__tab 안의 span 요소도 작동해버림.
    const clicked = e.target.closest('.operations__tab'); 
    // e.target 은 현재상황에서 span과 tab 으로 나눠져있는데, 이걸 tab 하나로 합쳐서 인식되게 closest 메서드 사용해서 tab으로 향하게끔.
    console.log(clicked.children)

    if(!clicked) return;
    //clicked 값은 tab인데, tab이 아닌데가 클릭 되면 오류화면을 출력안하게끔.
    //하나 안하나 null 값은 그대로 나옴.

    tabs.forEach(t=>t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    //foreach 로 돌려서 tab이나 tabsContent 의 active 값 모두 삭제

    clicked.classList.add('operations__tab--active');
    //특정 탭이 클릭되었을때 active를 클래스에 추가.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
    //쿼리셀렉터로 오퍼레이션 내용의 콘텐츠를 가지고 오려 함. 여기서 몇번을 가져올지는 clicked 의 dataset 번호로 가져옴. data-tab은 각각 1,2,3 으로 이루어져 있음. 
})

///menu

const handleHover = function(e) {
    if(e.target.classList.contains('nav__link')){
        const link = e.target; //마우스 호버든 어떤 이벤트의 타겟이 된 <a></a>요소
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach(el => {
            if(el !== link) {
                el.style.opacity = this;
            }
        })
    }
}

navigator.addEventListener('mouseover', handleHover.bind(0.5))
navigator.addEventListener('mouseout', handleHover.bind(1))
//bind는 해당 함수의 this 값과 같다는것.









//////////////////////////////////////////////slide

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots');
const slider = document.querySelector('.slider');

//Js 작동 임시 스크립트

// slider.style.transform = 'scale(0.4) translateX(-600px)';
// slider.style.overflow = 'visible';

//슬라이드 초기 위치 잡아주기.
slides.forEach((s, i) => (
    s.style.transform = `translateX(${100 * i}%)`
)) // 0% 100% 200% 300%



//버튼 추가하기
const createDots = function() {
    slides.forEach(function(_,i){
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
}

createDots();

//버튼 색 바꿔주기.
const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dots => dots.classList.remove('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide = '${slide}'`).classList.add('dots__dot--active');
};

activateDot(0);

//버튼 색 바뀌는 위치 지정
dotContainer.addEventListener('click',function(e) {
    if (e.target.classList.contains('dots__dot')) {
        console.log('dot');
        const {slide} = e.target.dataset;
        console.log(slide);
        goToSlide(slide);
        activateDot(slide);
    }
}) 

let curSlide = 0;
const maxSlide = slides.length;

//슬라이드의 1,2,3,4번 인덱스 번호에 맞는 위치 설정.
function goToSlide(slide) {
    slides.forEach((s,i) => (
        s.style.transform = `translateX(${100 * (i-slide)}%)`
        ));
    };

//슬라이드 다음 넘기기
const nextSlide = function() {
    if(curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    //마지막 슬라이드 까지 가면 처음 위치로 돌아오기, 아니라면 계속 슬라이드 넘기기.
    goToSlide(curSlide);
    activateDot(curSlide);
}

//슬라이드 전번으로 넘기기
const prevSlide = function() {
    if(curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    //마지막 슬라이드 까지 가면 처음 위치로 돌아오기, 아니라면 계속 슬라이드 넘기기.
    goToSlide(curSlide);
    activateDot(curSlide);
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)
//-100% , 0 , 100%, 200%

//키보드 방향키로 움직이기
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {prevSlide();}
    //if 문 사용
    e.key === 'ArrowRight' && nextSlide();
    //if 문 대신 && 를 이용해서 왼쪽이 참이면 오른쪽 함수 실행 스크립트도 짤 수 있다.
})









///////////////////////////btn scroll learn more 누르면 이동.

btnScrollTo.addEventListener('click', function(e) {
    //기본적인 페이지 좌표의 정보들.
    const s1coords = section1.getBoundingClientRect(); 
    console.log(s1coords); //위치값 확인.section1 의 위치값.
    console.log(e.target.getBoundingClientRect()); //클릭한 버튼(btnScrollTo)의 위치값.
    console.log('Current scroll(X/Y', window.pageXOffset, window.pageYOffset);
    // 현재 화면 스크롤의 위치.
    console.log('height / width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    //화면 영역.

    section1.scrollIntoView({behavior:'smooth'}); // section1 의 위치로 이동.
})

////////////////////////////page navigation nav 바 이동.

// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function(e){
//         e.preventDefault;
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({behavior:'smooth'});
//     })
// })


//직접 nav__link 의 위치 받아오기
// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         console.log(id);
//         document.querySelector(id).scrollIntoView({behavior:'smooth'});
//     });
// });

////////////////////////sticky nav => intersection Observer API

const header = document.querySelector('.header');
const navHeight = navigator.getBoundingClientRect().height;
const mobileNavHeight = moblieNavigator.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;//디스트럭쳐 할당해서 함수 잘 돌아가게. 사실상 해당 기능에서 기본값으로 들어간다고 보면 됨
    console.log(entry) //IntersectionObserver의 모든 값들.
    if (!entry.isIntersecting) navigator.classList.add('sticky');
    if (!entry.isIntersecting) moblieNavigator.classList.add('m__nav__bg');
    entry.isIntersecting && navigator.classList.remove('sticky');
    entry.isIntersecting && moblieNavigator.classList.remove('m__nav__bg');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root : null,
    threshold: 0, //감지가 되는 정확도값.
    rootMargin: `-${navHeight}px`//감지될부분에 미리 마진값(여유값) 줘서 미리실행.
})

//(실행시켜줄 함수, 걔네들의 옵션값{})

headerObserver.observe(header); //=> 헤더 영역으로 가면 isIntersecting : true 값 

////////////////////////header-bg-img-slide
const headerImg = document.querySelectorAll('.header__bg__img img')

function slideShow() {
    let curIndex = 1;

    setInterval(() => {
        setTimeout(() => {
            headerImg[curIndex].classList.remove('fade');
        }, 200);

        curIndex = (curIndex < 5) ? curIndex + 1 : 1;

        setTimeout(() => {
            headerImg[curIndex].classList.add('fade');
        }, 500);

        console.log(curIndex);
    }, 5500);
};
slideShow();



//////////////////////////////////////////////////////////lazy lodding 반투명 이미지가 불투명으로
//비동기 작동에서 로딩속도를 조금 느리게 해주면서 부담을 덜어주는 역할. 이미지를 바꿈.
//낮은 해상도의 이미지를 로딩되는 동안 띄우고 사이트 로딩이 끝나면 고해상도 이미지로 변경.
//작동시기는 스크롤
//inteinsic 이미지는 원본이미지. lender 이미지는 화면에 보이는 이미지.
//위와는 다르게 dataset 을 이용한 소스변경과 동시에 클래스값도 변결/

const imgTargets = document.querySelectorAll('img[data-src]')
//이미지 태그의 모든 datasrc속성값 저장. [] 안에는 속성값 들어감.
console.log(imgTargets);

const loadImg = function(entries, observer) {
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    //타겟이 되는 이미지의 src 가 dataset 의 src 되는거

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');
    })
    //타겟되면 클래스 사라짐.
    observer.unobserve(entry.target);
    // 오브저브 계속 할거임?? 아님.
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold:0,
})

imgTargets.forEach(img => imgObserver.observe(img))
//각각의 이미지 영역으로 갔을때 observe 실행 즉 내려갈때마다 하나씩 밝아짐/



/////////////reveal section
//스크롤 될 때마다 섹션위치마다 각 섹션들이 나옴. 그전까지 숨겨져있음.

const allSection = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(allSection)
    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target)
    };

const sectionObserve = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
    rootMargin:'200px',
});

allSection.forEach(function(section){
    sectionObserve.observe(section)
    section.classList.add('section--hidden')
})
//모든 섹션을 먼저 숨김, section 위치로 갈때마다 obserc 함수 실행.
//sectionObserve 실행하면 도감에 reveal section 실행.
//revealsection 에서는 위치에 오는 함수마다 hidden 클래스 없애고, 한번 observe 했으면 더이상 하지 않음.

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

//nav 전체단위에서 클릭한 개체의 위치 받아오기. forEach 사용 안함. 클릭하면 해당위치로 이동.
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
    
    }
});
document.querySelector('.m__nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
    toggleClose();
    toggleCount++;
    }
});