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

  if (typing1 && typing2 && typing3 && typing4) {
    typeAnimation(typing1, 'SUMMER', 0);
    typeAnimation(typing2, 'RETREAT', 800);
    typeAnimation(typing3, '2024', 1600);
    typeAnimation(typing4, '믿음으로 하나되어, 은혜로 채워지는 시간', 2400);
  }
});