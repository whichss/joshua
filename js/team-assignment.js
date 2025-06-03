document.addEventListener('DOMContentLoaded', function() {
  // 수련회 시작 날짜 (2025년 7월 15일 14:00)
  const retreatStart = new Date('2025-07-15T14:00:00');
  
  // 카운트다운 요소
  const countdownContainer = document.getElementById('countdown-container');
  const teamContent = document.getElementById('team-content');
  
  // 현재 시간 확인 및 표시 결정
  function checkTimeAndDisplay() {
    const now = new Date();
    
    if (now < retreatStart) {
      // 수련회 시작 전 - 카운트다운 표시
      countdownContainer.style.display = 'block';
      teamContent.style.display = 'none';
      startCountdown();
    } else {
      // 수련회 시작 후 - 팀 배정 표시
      countdownContainer.style.display = 'none';
      teamContent.style.display = 'block';
      renderTeams();
    }
  }
  
  // 카운트다운 시작
  function startCountdown() {
    updateCountdown(); // 즉시 실행
    const interval = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = retreatStart.getTime() - now;
      
      if (distance < 0) {
        clearInterval(interval);
        checkTimeAndDisplay(); // 시간이 되면 팀 배정 표시
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
  }
  
  // 팀 데이터
  const teams = [
    {
      name: "믿음팀",
      leader: "김지훈",
      members: ["이하은", "박민준", "최서연", "정도윤", "강지원"]
    },
    {
      name: "소망팀",
      leader: "이승민",
      members: ["김예은", "박준호", "최민서", "정유진", "강현우"]
    },
    {
      name: "사랑팀",
      leader: "박지영",
      members: ["김태현", "이수빈", "최재원", "정다은", "강민지"]
    },
    {
      name: "기쁨팀",
      leader: "최준영",
      members: ["김서연", "이민재", "박소율", "정우진", "강서현"]
    },
    {
      name: "평화팀",
      leader: "정성민",
      members: ["김민지", "이준서", "박지민", "최예준", "강지은"]
    },
    {
      name: "은혜팀",
      leader: "강현지",
      members: ["김도현", "이지우", "박서준", "최민지", "정하준"]
    }
  ];

  const teamGrid = document.getElementById('team-grid');
  const searchInput = document.getElementById('team-search');
  const noResults = document.getElementById('no-results');

  // 팀 카드 생성 함수
  function createTeamCard(team, searchTerm = '') {
    const card = document.createElement('div');
    card.className = 'team-card';

    const header = document.createElement('div');
    header.className = 'team-header';
    
    const nameEl = document.createElement('h3');
    nameEl.className = 'team-name';
    nameEl.textContent = team.name;
    
    const countEl = document.createElement('div');
    countEl.className = 'team-count';
    countEl.innerHTML = `<i class="fas fa-users"></i> ${team.members.length + 1}명`;
    
    header.appendChild(nameEl);
    header.appendChild(countEl);
    
    const body = document.createElement('div');
    body.className = 'team-body';
    
    // 팀장 섹션
    const leaderSection = document.createElement('div');
    leaderSection.className = 'team-section';
    
    const leaderHeader = document.createElement('div');
    leaderHeader.className = 'team-section-header';
    leaderHeader.innerHTML = `<i class="fas fa-user-circle"></i> <span class="team-section-title">팀장</span>`;
    
    const leaderContent = document.createElement('div');
    leaderContent.className = 'team-section-content';
    
    const leaderName = document.createElement('p');
    leaderName.className = searchTerm && team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ? 'highlight' : '';
    leaderName.textContent = team.leader;
    
    leaderContent.appendChild(leaderName);
    leaderSection.appendChild(leaderHeader);
    leaderSection.appendChild(leaderContent);
    
    // 팀원 섹션
    const membersSection = document.createElement('div');
    membersSection.className = 'team-section';
    
    const membersHeader = document.createElement('div');
    membersHeader.className = 'team-section-header';
    membersHeader.innerHTML = `<i class="fas fa-users"></i> <span class="team-section-title">팀원</span>`;
    
    const membersContent = document.createElement('div');
    membersContent.className = 'team-section-content';
    
    const membersList = document.createElement('ul');
    membersList.className = 'team-member-list';
    
    team.members.forEach(member => {
      const memberItem = document.createElement('li');
      memberItem.className = 'team-member';
      if (searchTerm && member.toLowerCase().includes(searchTerm.toLowerCase())) {
        memberItem.classList.add('highlight');
      }
      memberItem.textContent = member;
      membersList.appendChild(memberItem);
    });
    
    membersContent.appendChild(membersList);
    membersSection.appendChild(membersHeader);
    membersSection.appendChild(membersContent);
    
    body.appendChild(leaderSection);
    body.appendChild(membersSection);
    
    card.appendChild(header);
    card.appendChild(body);
    
    return card;
  }

  // 팀 목록 렌더링
  function renderTeams(searchTerm = '') {
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    
    const filteredTeams = teams.filter(team => {
      const searchLower = searchTerm.toLowerCase();
      return (
        team.name.toLowerCase().includes(searchLower) ||
        team.leader.toLowerCase().includes(searchLower) ||
        team.members.some(member => member.toLowerCase().includes(searchLower))
      );
    });
    
    if (filteredTeams.length === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      
      filteredTeams.forEach(team => {
        const card = createTeamCard(team, searchTerm);
        teamGrid.appendChild(card);
      });
    }
  }

  // 검색 기능
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      renderTeams(this.value);
    });
  }
  
  // 초기 실행
  checkTimeAndDisplay();
});