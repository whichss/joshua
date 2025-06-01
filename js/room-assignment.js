document.addEventListener('DOMContentLoaded', function() {
  // 방 배정 데이터
  const buildings = [
    {
      name: "A동",
      floors: [
        {
          floor: "1층",
          rooms: [
            { number: "101", type: "4인실", occupants: ["김지훈", "박민준", "정도윤", "강현우"] },
            { number: "102", type: "4인실", occupants: ["이승민", "박준호", "최재원", "강민지"] },
            { number: "103", type: "2인실", occupants: ["최준영", "정성민"] }
          ]
        },
        {
          floor: "2층",
          rooms: [
            { number: "201", type: "4인실", occupants: ["김예은", "최서연", "강지원", "김서연"] },
            { number: "202", type: "4인실", occupants: ["이하은", "최민서", "정유진", "이수빈"] },
            { number: "203", type: "2인실", occupants: ["박지영", "정다은"] }
          ]
        }
      ]
    },
    {
      name: "B동",
      floors: [
        {
          floor: "1층",
          rooms: [
            { number: "101", type: "4인실", occupants: ["이민재", "박소율", "정우진", "강서현"] },
            { number: "102", type: "4인실", occupants: ["김민지", "이준서", "박지민", "최예준"] }
          ]
        },
        {
          floor: "2층",
          rooms: [
            { number: "201", type: "4인실", occupants: ["강지은", "김도현", "이지우", "박서준"] },
            { number: "202", type: "4인실", occupants: ["최민지", "정하준", "강현지", "최태양"] }
          ]
        }
      ]
    }
  ];

  const buildingTabs = document.getElementById('building-tabs');
  const buildingContent = document.getElementById('building-content');
  const searchInput = document.getElementById('room-search');
  const searchResults = document.getElementById('search-results');
  const participantResults = document.getElementById('participant-results');
  const noSearchResults = document.getElementById('no-search-results');

  // 모든 방 목록을 평면화
  const allRooms = buildings.flatMap(building => 
    building.floors.flatMap(floor => 
      floor.rooms.map(room => ({
        building: building.name,
        floor: floor.floor,
        ...room
      }))
    )
  );

  // 모든 참가자 목록을 평면화
  const allParticipants = allRooms.flatMap(room => 
    room.occupants.map(occupant => ({
      name: occupant,
      building: room.building,
      floor: room.floor,
      room: room.number,
      roomType: room.type
    }))
  );

  // 건물 탭 생성
  function createBuildingTabs() {
    buildings.forEach((building, index) => {
      const tab = document.createElement('button');
      tab.className = `tab-button ${index === 0 ? 'active' : ''}`;
      tab.setAttribute('data-tab', index);
      tab.innerHTML = `<i class="fas fa-building"></i> ${building.name}`;
      
      tab.addEventListener('click', function() {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        
        this.classList.add('active');
        document.querySelector(`.tab-panel[data-tab="${index}"]`).classList.add('active');
      });
      
      buildingTabs.appendChild(tab);
    });
  }

  // 방 카드 생성 함수
  function createRoomCard(room, searchTerm = '') {
    const card = document.createElement('div');
    card.className = 'room-card';
    
    const header = document.createElement('div');
    header.className = 'room-header';
    
    const numberEl = document.createElement('h4');
    numberEl.className = 'room-number';
    numberEl.textContent = `${room.number}호`;
    
    const typeEl = document.createElement('div');
    typeEl.className = 'room-type';
    typeEl.textContent = room.type;
    
    header.appendChild(numberEl);
    header.appendChild(typeEl);
    
    const body = document.createElement('div');
    body.className = 'room-body';
    
    const occupantsHeader = document.createElement('div');
    occupantsHeader.className = 'room-section-header';
    occupantsHeader.innerHTML = `<i class="fas fa-users"></i> <span class="room-section-title">배정 인원</span>`;
    
    const occupantsList = document.createElement('ul');
    occupantsList.className = 'room-occupants';
    
    room.occupants.forEach(person => {
      const occupantItem = document.createElement('li');
      occupantItem.className = 'room-occupant';
      if (searchTerm && person.toLowerCase().includes(searchTerm.toLowerCase())) {
        occupantItem.classList.add('highlight');
      }
      occupantItem.textContent = person;
      occupantsList.appendChild(occupantItem);
    });
    
    body.appendChild(occupantsHeader);
    body.appendChild(occupantsList);
    
    card.appendChild(header);
    card.appendChild(body);
    
    return card;
  }

  // 참가자 카드 생성 함수
  function createParticipantCard(participant) {
    const card = document.createElement('div');
    card.className = 'participant-card';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'participant-name';
    nameEl.innerHTML = `<i class="fas fa-user"></i> <span class="font-medium">${participant.name}</span>`;
    
    const infoEl = document.createElement('div');
    infoEl.className = 'participant-info';
    
    infoEl.innerHTML = `
      <p><span>건물:</span> ${participant.building}</p>
      <p><span>층:</span> ${participant.floor}</p>
      <p><span>방 번호:</span> ${participant.room} (${participant.roomType})</p>
    `;
    
    card.appendChild(nameEl);
    card.appendChild(infoEl);
    
    return card;
  }

  // 건물 내용 생성
  function createBuildingContent() {
    buildings.forEach((building, index) => {
      const panel = document.createElement('div');
      panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
      panel.setAttribute('data-tab', index);
      
      building.floors.forEach(floor => {
        const floorSection = document.createElement('div');
        floorSection.className = 'floor-section';
        
        const floorTitle = document.createElement('h3');
        floorTitle.className = 'floor-title';
        floorTitle.innerHTML = `<i class="fas fa-home"></i> ${floor.floor}`;
        
        const roomGrid = document.createElement('div');
        roomGrid.className = 'room-grid';
        
        floor.rooms.forEach(room => {
          const roomCard = createRoomCard(room);
          roomGrid.appendChild(roomCard);
        });
        
        floorSection.appendChild(floorTitle);
        floorSection.appendChild(roomGrid);
        panel.appendChild(floorSection);
      });
      
      buildingContent.appendChild(panel);
    });
  }

  // 검색 결과 표시
  function showSearchResults(searchTerm) {
    participantResults.innerHTML = '';
    
    if (!searchTerm) {
      searchResults.classList.add('hidden');
      return;
    }
    
    searchResults.classList.remove('hidden');
    
    const filteredParticipants = allParticipants.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredParticipants.length === 0) {
      participantResults.classList.add('hidden');
      noSearchResults.classList.remove('hidden');
    } else {
      participantResults.classList.remove('hidden');
      noSearchResults.classList.add('hidden');
      
      filteredParticipants.forEach(participant => {
        const card = createParticipantCard(participant);
        participantResults.appendChild(card);
      });
    }
  }

  // 초기화
  if (buildingTabs && buildingContent) {
    createBuildingTabs();
    createBuildingContent();
  }

  // 검색 기능
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      showSearchResults(this.value);
    });
  }
});