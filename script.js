// 캔버스 설정
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 플레이어 속성
const player = {
    x: 400, // 시작 X 위치
    y: 300, // 시작 Y 위치
    width: 30,
    height: 30,
    color: "cyan",
    speed: 5, // 움직이는 속도
    velocityY: 0, // Y축 속도 (중력 적용)
    jumpPower: 10, // 점프 힘
    onGround: false, // 땅에 있는지 여부
};

// 중력 및 바닥 설정
const gravity = 0.5; // 중력의 강도
const groundLevel = canvas.height - 50; // 땅의 높이

// 키 입력 추적
const keys = {};

// 키가 눌릴 때
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    // 점프 구현
    if (e.key === " " && player.onGround) { // 점프 키: Spacebar
        player.velocityY = -player.jumpPower;
        player.onGround = false;
    }
});

// 키를 뗄 때
window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// 플레이어 움직임 업데이트
function updatePlayer() {
    // X축 움직임 (좌우 이동)
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed; // 왼쪽으로 이동
    }
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
        player.x += player.speed; // 오른쪽으로 이동
    }

    // Y축 움직임 (중력 적용)
    player.velocityY += gravity; // 중력을 속도에 추가
    player.y += player.velocityY; // 속도만큼 Y축 이동

    // 바닥 충돌 감지
    if (player.y + player.height >= groundLevel) {
        player.y = groundLevel - player.height; // 땅 위에 위치 고정
        player.velocityY = 0; // 속도 초기화
        player.onGround = true; // 땅에 있음
    } else {
        player.onGround = false; // 땅에서 벗어남
    }
}

// 캔버스 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 그림 삭제

    // 땅 그리기
    ctx.fillStyle = "brown";
    ctx.fillRect(0, groundLevel, canvas.width, canvas.height - groundLevel);

    // 플레이어 그리기
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 게임 루프
function gameLoop() {
    updatePlayer(); // 플레이어 움직임 업데이트
    draw(); // 캔버스 다시 그리기
    requestAnimationFrame(gameLoop); // 다음 프레임 호출
}

// 게임 시작
gameLoop();
