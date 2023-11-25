// document.addEventListener("DOMContentLoaded", function () {
//     let currentSlide = 0;
//     const slides = document.querySelectorAll(".slide");
//     const totalSlides = slides.length;

//     // 函數：轉到下一張slide
//     function nextSlide() {
//         slides[currentSlide].style.display = "none";
//         currentSlide = (currentSlide + 1) % totalSlides;
//         slides[currentSlide].style.display = "block";
//     }

//     // 設定定時器自動轉換slide
//     setInterval(nextSlide, 3000); // 3秒切換一次
// });

document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    // 函數：顯示特定的slide
    function showSlide(slideIndex) {
        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        }
        slides.forEach(slide => slide.style.display = "none");
        slides[slideIndex].style.display = "block";
        currentSlide = slideIndex;
    }

    function nextSlide() {
                slides[currentSlide].style.display = "none";
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].style.display = "block";
            }

    // 初始化
    showSlide(currentSlide);

    // 設定定時器自動轉換slide
    setInterval(nextSlide, 4000); // 4秒切換一次

    // 按鈕點擊事件
    document.querySelector(".slide-btn.left").addEventListener("click", function() {
        showSlide(currentSlide - 1);
    });

    document.querySelector(".slide-btn.right").addEventListener("click", function() {
        showSlide(currentSlide + 1);
    });
});
