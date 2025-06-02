document.addEventListener('DOMContentLoaded', function() {
  // 헤더 스크롤 효과
  const header = document.querySelector('.header');
  const scrollThreshold = 10;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 초기 상태 설정

  // 모바일 메뉴
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  mobileMenuCloseBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // 신청 폼 제출
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('신청이 완료되었습니다. 감사합니다!');
      registrationForm.reset();
    });
  }

  // 푸터 연도 업데이트
  const yearElements = document.querySelectorAll('#current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
});