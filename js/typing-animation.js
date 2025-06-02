document.addEventListener('DOMContentLoaded', function() {
  // 타이핑 애니메이션 함수
  function typeAnimation(element, text, delay = 0, speed = 50) {
    if (!element) return;
    
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);
  }

  // 히어로 섹션 타이핑 효과
  const typing1 = document.getElementById('typing-1');
  const typing2 = document.getElementById('typing-2');
  const typing3 = document.getElementById('typing-3');
  const typing4 = document.getElementById('typing-4');

  // 첫 번째 텍스트 스타일 (영어 제목)
  if (typing1) {
    typing1.style.fontFamily = 'Blacksword, Times New Roman, serif';
    typing1.style.fontStyle = 'italic';
    typing1.style.fontWeight = 'bold';
    typing1.style.color = '#FFFFFF';
    typing1.style.lineHeight =  '10rem'; // 줄 간격 줄임
    typing1.style.marginBottom = '0.5rem'; // 아래 여백 최소화
    typing1.style.marginLeft = '0.5rem'; // 왼쪽 여백 추가    
    typing1.style.display = 'block';
  }

  // 두 번째 텍스트 스타일 (한글 부제목)
  if (typing2) {
    typing2.style.fontFamily = 'Noto Sans KR, Malgun Gothic, sans-serif';
    typing2.style.fontSize = '1.2rem';
    typing2.style.fontWeight = '400'; // 적절한 굵기로 조정
    typing2.style.color = '#E5E7EB'; // 조금 더 부드러운 색상
    typing2.style.lineHeight = '1.3'; // 줄 간격 조정
    typing2.style.marginTop = '0'; // 위 여백 제거
    typing2.style.marginBottom = '0.5rem';
    typing2.style.display = 'block';
  }

  // 세 번째 텍스트 (현재 비어있음)
  if (typing3) {
    typing3.style.display = 'none'; // 사용하지 않는 경우 숨김
  }

  // 네 번째 텍스트 (추가 설명)
  if (typing4) {
    typing4.style.fontFamily = 'Nanum Gothic, Malgun Gothic, sans-serif';
    typing4.style.fontSize = '1rem';
    typing4.style.lineHeight = '1.4';
    typing4.style.color = '#D1D5DB';
    typing4.style.marginTop = '1rem';
    typing4.style.display = 'block';
  }

  // 전체 컨테이너 스타일 조정
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.lineHeight = '1'; // 전체 제목 컨테이너의 줄 간격 최소화
    heroTitle.style.marginBottom = '1rem';
  }

  // title-line 요소들의 여백 조정
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach(line => {
    line.style.marginBottom = '0.25rem'; // 각 라인 간 여백 최소화
  });

  // 타이핑 애니메이션 실행
  if (typing1 && typing2) {
    typeAnimation(typing1, 'Shema Israel', 0, 80);
    typeAnimation(typing2, '이스라엘아 들으라 우리 하나님 여호와는 오직 유일한 여호와이시니 [신명기 6:4]', 1200, 60);
    
    // typing4에 추가 텍스트가 필요한 경우
    if (typing4) {
      typeAnimation(typing4, '', 3000, 50);
    }
  }

  // 반응형 폰트 크기 조정
  function adjustFontSize() {
    if (typing1) {
      if (window.innerWidth < 640) {
        typing1.style.fontSize = '3.0rem';
      } else if (window.innerWidth < 768) {
        typing1.style.fontSize = '5.0rem';
      } else {
        typing1.style.fontSize = '8rem';
      }
    }
    
    if (typing2) {
      if (window.innerWidth < 640) {
        typing2.style.fontSize = '1rem';
      } else {
        typing2.style.fontSize = '1.2rem';
      }
    }
  }

  // 초기 폰트 크기 설정
  adjustFontSize();

  // 윈도우 리사이즈 시 폰트 크기 재조정
  window.addEventListener('resize', adjustFontSize);
});