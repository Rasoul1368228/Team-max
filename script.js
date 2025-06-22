// تابع اعتبارسنجی ایمیل با استفاده از الگوی دقیق‌تر
function validateEmail() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim(); // حذف فاصله‌های اضافی

  // الگوی پیشرفته‌تر برای بررسی ساختار ایمیل
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // بررسی تطابق ایمیل با الگو
  const isValid = emailPattern.test(email);

  if (!isValid) {
    alert("لطفاً یک ایمیل معتبر وارد کنید.");
    emailInput.focus(); // تمرکز دوباره روی فیلد ایمیل
    return false;
  }

  alert("با تشکر از عضویت شما بزودی هفته نامه های تیم به ایمیلتان ارسال می گردد");

  return true;
}

// تابع برای باز و بسته کردن منو
function toggleMenu(menuIcon) {
  const menu = document.querySelector("header nav ul"); // پیدا کردن منو
  menu.classList.toggle("show-menu"); // اضافه یا حذف کردن کلاس 'show-menu'
  menuIcon.classList.toggle("active"); // تغییر ظاهر آیکون همبرگر
}

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function moveSlide(step) {
  slideIndex += step;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  if (slideIndex >= slides.length) slideIndex = 0;
  showSlide(slideIndex);
}

// نمایش اسلاید اول
showSlide(slideIndex);

// تغییر خودکار اسلاید هر 5 ثانیه
setInterval(() => moveSlide(1), 8000);

const titles = document.querySelectorAll('.accordion-title');

titles.forEach(title => {
  title.addEventListener('click', () => {
    const content = title.nextElementSibling;

    title.classList.toggle('active');

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("open");
    } else {
      // بستن همه‌ی بخش‌ها
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.style.maxHeight = null;
        c.classList.remove("open");
      });
      document.querySelectorAll('.accordion-title').forEach(t => {
        t.classList.remove('active');
      });

      // باز کردن بخش کلیک‌شده
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
      title.classList.add('active');
    }
  });
});