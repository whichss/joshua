document.addEventListener('DOMContentLoaded', function() {
  // 일정 데이터 (2번째 파일의 실제 일정으로 업데이트)
  const scheduleData = {
    1: [
      {
        time: '12:30',
        title: '집합',
        description: '교회에서 모여 수련회를 시작합니다.',
        location: '교회',
        person: '여호수아'
      },
      {
        time: '13:00',
        title: '출발',
        description: '버스를 타고 수련회 장소로 이동합니다.',
        location: '교회',
        person: '여호수아'
      },
      {
        time: '15:00',
        title: '개회 예배',
        description: '수련회의 시작을 예배로 함께합니다.',
        location: '예배당',
        person: '조상윤 목사'
      },
      {
        time: '16:00',
        title: '대충 맞혀도 되는 퀴즈',
        description: '재미있는 퀴즈를 통해 서로를 알아가는 시간입니다.',
        location: '예배당',
        person: '여호수아'
      },
      {
        time: '18:00',
        title: '저녁 식사',
        description: '식당에서 저녁 식사를 함께 합니다.',
        location: '식당',
        person: '여호수아'
      },
      {
        time: '19:30',
        title: 'RE:Fire집회',
        description: '첫째 날 메인 집회입니다.',
        location: '예배당',
        person: '은혜교회 허평석 담임목사'
      },
      {
        time: '22:00',
        title: '나눔 및 취침',
        description: '조별 모임을 통해 오늘 받은 은혜를 나누고 취침합니다.',
        location: '각 팀별 지정 장소',
        person: '팀 리더'
      }
    ],
    2: [
      {
        time: '08:00',
        title: '아침 미션',
        description: '하루를 시작하는 가벼운 미션 활동입니다.',
        location: '예배당',
        person: '여호수아'
      },
      {
        time: '09:00',
        title: '아침 식사 및 개인 정비',
        description: '아침 식사 후 개인 정비 시간입니다.',
        location: '식당 / 숙소',
        person: '여호수아'
      },
      {
        time: '09:30',
        title: '사무엘의 세미나',
        description: '주제에 따라 다양한 강의가 진행됩니다.',
        location: '예배당',
        person: '정사무엘 목사'
      },
      {
        time: '11:30',
        title: '점심 식사',
        description: '식당에서 점심 식사를 합니다.',
        location: '식당',
        person: '여호수아'
      },
      {
        time: '13:00',
        title: '마음 쉐마: 나를 듣고, 주님을 만나다',
        description: '질문과 토론을 통해 서로를 알아가고 주님을 만나는 시간입니다.',
        location: '예배당',
        person: '여호수아'
      },
      {
        time: '15:00',
        title: '물 튀면 시작이다! 물 만난 배구왕',
        description: '무더위를 날려버릴 시원한 물놀이와 배구 시간입니다.',
        location: '수영장 또는 야외',
        person: '여호수아'
      },
      {
        time: '17:00',
        title: '저녁 식사',
        description: '맛있는 저녁을 함께 합니다.',
        location: '식당',
        person: '여호수아'
      },
      {
        time: '19:30',
        title: 'RE:Fire집회',
        description: '둘째 날 메인 집회입니다.',
        location: '예배당',
        person: '필그림 교회 송동권 목사'
      },
      {
        time: '22:00',
        title: '나눔 및 취침',
        description: '오늘의 은혜를 조별로 나누고 취침합니다.',
        location: '각 팀별 지정 장소',
        person: '팀 리더'
      }
    ],
    3: [
      {
        time: '08:00',
        title: '아침 식사 및 개인 정비',
        description: '식사 후 개인 짐 정리 시간입니다.',
        location: '식당 / 숙소',
        person: '여호수아'
      },
      {
        time: '09:30',
        title: '폐회예배',
        description: '수련회를 마무리하는 감사 예배입니다.',
        location: '예배당',
        person: '조상윤 목사'
      },
      {
        time: '10:30',
        title: '숙소정리',
        description: '수련회동안 이용한 장소를 정리하는 시간입니다.',
        location: '전체',
        person: '수련회 모두'
      },
      {
        time: '11:00',
        title: '점심식사',
        description: '마지막 식사를 함께 합니다.',
        location: '식당',
        person: '여호수아'
      },
      {
        time: '12:30',
        title: '이동 및 교회도착',
        description: '모든 일정을 마치고 교회로 돌아갑니다.',
        location: '교회',
        person: '여호수아'
      }
    ]
  };

  // 수련회 날짜 설정 (2025년 7월 4일 ~ 6일로 수정)
  const retreatStart = new Date('2025-07-04T12:00:00');
  const retreatEnd = new Date('2025-07-06T12:30:00');

  // DOM 요소들
  const dayTabs = document.querySelectorAll('.day-tab');
  const timeline = document.getElementById('timeline');
  const overview = document.getElementById('overview');
  const viewBtns = document.querySelectorAll('.view-btn');
  const currentStatusText = document.getElementById('current-status-text');
  const countdownEl = document.getElementById('countdown');

  let currentDay = 1;
  let currentView = 'timeline';

  // 현재 시간 체크 및 상태 업데이트
  function updateCurrentStatus() {
    const now = new Date();
    const nowTime = now.getTime();
    const startTime = retreatStart.getTime();
    const endTime = retreatEnd.getTime();

    if (nowTime < startTime) {
      // 수련회 시작 전
      currentStatusText.textContent = '수련회 준비중';
      showCountdown();
      showAllSchedule();
    } else if (nowTime >= startTime && nowTime <= endTime) {
      // 수련회 진행 중
      hideCountdown();
      const dayIndex = Math.floor((nowTime - startTime) / (24 * 60 * 60 * 1000)) + 1;
      const actualDay = Math.min(dayIndex, 3);
      currentStatusText.textContent = `${actualDay}일차 진행중`;
      
      // 현재 날짜 탭 활성화
      setActiveDay(actualDay);
      highlightCurrentEvent(now);
    } else {
      // 수련회 종료
      currentStatusText.textContent = '수련회 종료';
      hideCountdown();
      showAllSchedule();
    }
  }

  // 카운트다운 표시
  function showCountdown() {
    countdownEl.style.display = 'block';
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  function hideCountdown() {
    countdownEl.style.display = 'none';
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = retreatStart.getTime() - now;

    if (distance < 0) {
      hideCountdown();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  // 현재 진행 중인 일정 하이라이트
  function highlightCurrentEvent(now) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    const daySchedule = scheduleData[currentDay];
    let currentEventIndex = -1;

    for (let i = 0; i < daySchedule.length; i++) {
      const [hour, minute] = daySchedule[i].time.split(':').map(Number);
      const eventTimeMinutes = hour * 60 + minute;

      if (i < daySchedule.length - 1) {
        const [nextHour, nextMinute] = daySchedule[i + 1].time.split(':').map(Number);
        const nextEventTimeMinutes = nextHour * 60 + nextMinute;

        if (currentTimeMinutes >= eventTimeMinutes && currentTimeMinutes < nextEventTimeMinutes) {
          currentEventIndex = i;
          break;
        }
      } else {
        if (currentTimeMinutes >= eventTimeMinutes) {
          currentEventIndex = i;
        }
      }
    }

    // 타임라인 아이템 업데이트
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.classList.remove('current', 'active');
      if (index < currentEventIndex) {
        item.classList.add('active');
      } else if (index === currentEventIndex) {
        item.classList.add('current', 'active');
      }
    });
  }

  // 전체 일정 표시 (수련회 전/후)
  function showAllSchedule() {
    currentDay = 1;
    renderSchedule();
    
    // 모든 일정을 반투명하게 표시
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.classList.remove('current', 'active');
    });
  }

  // 날짜 탭 활성화
  function setActiveDay(day) {
    currentDay = day;
    dayTabs.forEach(tab => {
      tab.classList.remove('active', 'current');
      if (parseInt(tab.dataset.day) === day) {
        tab.classList.add('active');
        
        const now = new Date();
        const retreatDay = new Date(retreatStart);
        retreatDay.setDate(retreatDay.getDate() + day - 1);
        
        if (now.toDateString() === retreatDay.toDateString()) {
          tab.classList.add('current');
        }
      }
    });
    renderSchedule();
  }

  // 일정 렌더링
  function renderSchedule() {
    if (currentView === 'timeline') {
      renderTimeline();
    } else {
      renderOverview();
    }
  }

  // 타임라인 렌더링
  function renderTimeline() {
    timeline.innerHTML = '';
    const daySchedule = scheduleData[currentDay];

    daySchedule.forEach((event, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      const time = document.createElement('div');
      time.className = 'timeline-time';
      time.textContent = event.time;

      const content = document.createElement('div');
      content.className = 'timeline-content';

      const title = document.createElement('h3');
      title.className = 'timeline-title';
      title.textContent = event.title;

      const description = document.createElement('p');
      description.className = 'timeline-description';
      description.textContent = event.description;

      const details = document.createElement('div');
      details.className = 'timeline-details';

      if (event.location) {
        const location = document.createElement('div');
        location.className = 'timeline-detail';
        location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${event.location}`;
        details.appendChild(location);
      }

      if (event.person) {
        const person = document.createElement('div');
        person.className = 'timeline-detail';
        person.innerHTML = `<i class="fas fa-user"></i> ${event.person}`;
        details.appendChild(person);
      }

      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(details);

      item.appendChild(time);
      item.appendChild(content);
      timeline.appendChild(item);
    });

    // 현재 시간에 맞춰 하이라이트
    const now = new Date();
    if (now >= retreatStart && now <= retreatEnd) {
      highlightCurrentEvent(now);
    }
  }

  // 전체보기 렌더링
  function renderOverview() {
    const overviewGrid = document.querySelector('.overview-grid');
    overviewGrid.innerHTML = '';

    for (let day = 1; day <= 3; day++) {
      const dayCard = document.createElement('div');
      dayCard.className = 'schedule-card';

      const header = document.createElement('div');
      header.className = 'schedule-header';

      const dayTitle = document.createElement('h3');
      dayTitle.className = 'day-title';
      dayTitle.textContent = `DAY ${day}`;

      const dayDate = document.createElement('p');
      dayDate.className = 'day-date';
      const date = new Date(retreatStart);
      date.setDate(date.getDate() + day - 1);
      dayDate.textContent = `7월 ${date.getDate()}일`;

      header.appendChild(dayTitle);
      header.appendChild(dayDate);

      const list = document.createElement('ul');
      list.className = 'schedule-list';

      scheduleData[day].forEach(event => {
        const item = document.createElement('li');
        item.className = 'schedule-item';

        const time = document.createElement('span');
        time.className = 'schedule-time';
        time.textContent = event.time;

        const title = document.createElement('span');
        title.className = 'schedule-event';
        title.textContent = event.title;

        item.appendChild(time);
        item.appendChild(title);
        list.appendChild(item);
      });

      dayCard.appendChild(header);
      dayCard.appendChild(list);
      overviewGrid.appendChild(dayCard);
    }
  }

  // 이벤트 리스너 설정
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = parseInt(tab.dataset.day);
      setActiveDay(day);
    });
  });

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      currentView = view;

      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (view === 'timeline') {
        document.querySelector('.timeline-mode').style.display = 'block';
        document.querySelector('.overview-mode').style.display = 'none';
        renderTimeline();
      } else {
        document.querySelector('.timeline-mode').style.display = 'none';
        document.querySelector('.overview-mode').style.display = 'block';
        renderOverview();
      }
    });
  });

  // 초기화
  updateCurrentStatus();
  setInterval(updateCurrentStatus, 60000); // 1분마다 상태 업데이트
});
