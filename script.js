// 캔버스 설정
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 점 객체 생성
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // 점 크기
        this.speedY = Math.random() * 2 + 1; // 떨어지는 속도
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // 랜덤 색상
        this.fallCount = 0; // 점이 떨어진 횟수
    }

    // 점을 업데이트하고 그리기
    update() {
        this.y += this.speedY; // Y축으로 떨어짐
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

        // 점 그리기
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        return false; // 삭제하지 않음
    }
}

const dots = [];

// 마우스 위치에서 점을 생성하여 배열에 추가
canvas.addEventListener('mousemove', (e) => {
    const numberOfDots = 5; // 마우스 위치에서 생성할 점의 수
    for (let i = 0; i < numberOfDots; i++) {
        dots.push(new Dot(e.x, e.y));
    }
});

// 애니메이션 루프
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지우기

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
