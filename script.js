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
};

// 키 입력 추적
const keys = {};

// 키가 눌릴 때
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

// 키를 뗄 때
window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// 플레이어 움직임 업데이트
function updatePlayer() {
    if (keys["ArrowUp"] && player.y > 0) {
        player.y -= player.speed; // 위로 이동
    }
    if (keys["ArrowDown"] && player.y + player.height < canvas.height) {
        player.y += player.speed; // 아래로 이동
    }
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed; // 왼쪽으로 이동
    }
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
        player.x += player.speed; // 오른쪽으로 이동
    }
}

// 캔버스 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 그림 삭제
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height); // 플레이어 그리기
}

// 게임 루프
function gameLoop() {
    updatePlayer(); // 플레이어 움직임 업데이트
    draw(); // 캔버스 다시 그리기
    requestAnimationFrame(gameLoop); // 다음 프레임 호출
}

// 게임 시작
gameLoop();
