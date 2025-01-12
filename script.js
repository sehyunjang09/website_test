// 마우스 위치를 추적하여 배경이 움직이게 함
document.addEventListener("mousemove", function(e) {
    const background = document.querySelector(".background");

    // 마우스의 X, Y 위치를 비율로 계산하여 배경 이동
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    // 배경을 마우스에 맞춰 이동시킴
    background.style.transform = `translate(-${x}%, -${y}%)`;
});
