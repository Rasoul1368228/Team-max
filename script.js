// =======================================
// 📌 اجرای اولیه بعد از لود کامل صفحه
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  initScrollButton();
  initHamburgerMenu();
  initAuthTabs();
  initSignupValidation();
});

// =======================================
// ⬆️ دکمه بازگشت به بالا
// =======================================
function initScrollButton() {
  const scrollBtn = document.getElementById("scrollUp");
  if (!scrollBtn) return;

  // نمایش/مخفی کردن دکمه هنگام اسکرول
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
  });

  // اسکرول نرم به بالا هنگام کلیک
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================================
// 🍔 منوی همبرگری
// =======================================
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("header nav ul");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    hamburger.classList.toggle("active");
  });
}

// =======================================
// 🔄 تب‌های ورود و عضویت
// =======================================
function initAuthTabs() {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const formTitle = document.getElementById("form-title");
  const tabButtons = document.querySelectorAll(".tab-btn");

  if (!signupForm || !loginForm || !formTitle || tabButtons.length < 2) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.textContent.trim() === "عضویت" ? "signup" : "login";

      signupForm.classList.toggle("hidden", type !== "signup");
      loginForm.classList.toggle("hidden", type !== "login");
      formTitle.textContent = type === "signup" ? "عضویت" : "ورود";

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// =======================================
// ✅ اعتبارسنجی فرم عضویت
// =======================================
function initSignupValidation() {
  const signupForm = document.getElementById("signup-form");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        input.style.border = "1px solid red";
        isValid = false;
      } else {
        input.style.border = "1px solid #1abc9c";
      }
    });

    if (isValid) {
      alert("✅ ثبت‌نام با موفقیت انجام شد");
      signupForm.reset();
    }
  });
}

// =======================================
// 🔢 تبدیل اعداد به فارسی
// =======================================
function toPersianDigits(num) {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

// مثال استفاده
const phone = toPersianDigits("09920552567");
console.log(phone); // نمایش: ۰۹۹۲۰۵۵۲۵۶۷

// =======================================
// ✨ انیمیشن نمایش باکس‌ها هنگام اسکرول
// =======================================
const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("show");
        }, delay);
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.2 }
);

elements.forEach((el) => observer.observe(el));
