// 캔버스 설정
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 원의 이미지 설정
const circleImage = document.getElementById('circleImage');

// 원의 위치와 크기 설정 (이미지 크기 및 위치 수정)
const circle = {
    x: canvas.width / 2,      // 원의 중심 X 좌표
    y: canvas.height - 150,   // 원의 중심 Y 좌표 (화면 하단에서 150px 위치)
    radius: canvas.width / 2  // 원의 반지름 (화면의 절반 크기)
};

// 점 객체 생성
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // 점 크기
        this.speedX = Math.random() * 4 - 2; // X 속도
        this.speedY = Math.random() * 4 - 2; // Y 속도
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // 랜덤 색상
        this.fallCount = 0; // 점이 떨어진 횟수
    }

    // 점을 업데이트하고 그리기
    update() {
        this.x += this.speedX; // X축으로 이동
        this.y += this.speedY; // Y축으로 이동

        if (this.fallCount < 2) {
            // 점이 두 번까지 떨어진 후 다시 위로 올라가게 함
            if (this.y > canvas.height) {
                this.y = 0;
                this.fallCount++; // 떨어진 횟수 증가
            }
        } else {
            // 두 번 떨어진 후 점을 삭제할 수 있도록 처리
            if (this.y > canvas.height) {
                return true; // 삭제 표시
            }
        }

        // 충돌 체크: 점이 원과 충돌했는지 확인
        if (this.checkCollision(circle)) {
            this.handleBounce(circle); // 충돌 시 자연스럽게 튕김
        }

        // 점 그리기
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        return false; // 삭제하지 않음
    }

    // 점과 원의 충돌 체크 함수
    checkCollision(circle) {
        const dx = this.x - circle.x;
        const dy = this.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy); // 점과 원의 중심 사이의 거리

        // 충돌: 점과 원 사이의 거리가 원의 반지름 + 점의 크기보다 작으면
        return distance <= circle.radius + this.size;
    }

    // 충돌 후 자연스러운 반사 처리 함수
    handleBounce(circle) {
        // 점과 원의 중심 간 벡터를 계산
        const dx = this.x - circle.x;
        const dy = this.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 법선 벡터 계산
        const normalX = dx / distance;
        const normalY = dy / distance;

        // 점의 속도 벡터와 법선 벡터의 내적 계산
        const dotProduct = this.speedX * normalX + this.speedY * normalY;

        // 반사 벡터 계산: 속도 벡터에서 법선 벡터를 빼는 방식
        this.speedX -= 2 * dotProduct * normalX;
        this.speedY -= 2 * dotProduct * normalY;

        // 충돌 후 점을 원의 경계에 맞추기
        const overlap = (circle.radius + this.size) - distance;
        this.x += normalX * overlap;
        this.y += normalY * overlap;
    }
}

const dots = [];
let lastMousePos = { x: 0, y: 0 };  // 이전 마우스 위치
let totalDistance = 0;  // 이동 거리

// 마우스 이동 이벤트 핸들러
canvas.addEventListener('mousemove', (e) => {
    // 이전 마우스 위치와의 거리 계산
    const dx = e.x - lastMousePos.x;
    const dy = e.y - lastMousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 일정 거리 이상 이동했을 때 점 생성
    if (distance > 20) {  // 20px 이상 이동 시
        dots.push(new Dot(e.x, e.y));  // 점 생성
        totalDistance = 0;  // 이동 거리 초기화
    }

    // 이동 거리 누적
    totalDistance += distance;
    lastMousePos = { x: e.x, y: e.y };  // 마지막 마우스 위치 업데이트
});

// 애니메이션 루프
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지우기

    // 원 이미지 그리기 (수정된 위치와 크기)
    ctx.drawImage(circleImage, circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);

    // 배열에서 점을 업데이트하고, 두 번 떨어진 후 삭제 처리
    for (let i = dots.length - 1; i >= 0; i--) {
        if (dots[i].update()) {
            dots.splice(i, 1); // 점을 배열에서 삭제
        }
    }

    requestAnimationFrame(animate); // 계속해서 애니메이션을 실행
}

// 애니메이션 시작
animate();
