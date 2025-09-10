// بخش سوالات متداول
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// اجرای اولیه بعد از لود کامل صفحه
document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initAuthTabs();
  initSignupValidation();
});

// منوی همبرگری
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("header nav ul");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    hamburger.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
      hamburger.classList.remove("active");
    });
  });
}

// تب‌های ورود و عضویت
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

// اعتبارسنجی فرم عضویت
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
      alert("ثبت‌نام با موفقیت انجام شد");
      signupForm.reset();
    }
  });
}

// تبدیل اعداد به فارسی
function toPersianDigits(num) {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}
console.log(toPersianDigits("09920552567"));

// انیمیشن نمایش باکس‌ها هنگام اسکرول
const elements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add("show"), delay);
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.2 }
);
elements.forEach((el) => observer.observe(el));

// مدیریت حالت روشن/تاریک
const toggleBtn = document.getElementById("theme-toggle");
const label = toggleBtn.querySelector(".label");
const icon = toggleBtn.querySelector("i");
const body = document.body;
const footer = document.querySelector(".animated-footer");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  footer?.classList.add("dark");
  label.textContent = "تاریک";
  icon.classList.replace("fa-sun", "fa-moon");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  footer?.classList.toggle("dark");

  const isDark = body.classList.contains("dark-mode");
  label.textContent = isDark ? "تاریک" : "روشن";
  icon.classList.replace(
    isDark ? "fa-sun" : "fa-moon",
    isDark ? "fa-moon" : "fa-sun"
  );
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// پیام خوش‌آمدگویی بر اساس ساعت
function getGreetingMessage() {
  const hour = new Date().getHours();
  let message = "";
  let icon = "🌐";

  if (hour >= 5 && hour < 12) {
    message = "صبح بخیر! وقتشه سایتت رو بسازی.";
    icon = "☕️";
  } else if (hour >= 12 && hour < 18) {
    message = "خوش اومدی به مکس تیم! طراحی سایت حرفه‌ای منتظرته.";
    icon = "💻";
  } else if (hour >= 18 && hour < 22) {
    message = "عصر بخیر! آماده‌ای سایتت رو خاص کنی؟";
    icon = "🎯";
  } else {
    message = "شب خوش! مکس تیم همیشه بیداره.";
    icon = "🛠";
  }

  showToast(message, icon);
}
window.addEventListener("load", () => setTimeout(getGreetingMessage, 5000));

// نمایش Toast
function showToast(msg, icon = "🚀") {
  const container = document.querySelector(".toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `
    <button class="toast-close">×</button>
    <div class="icon">${icon}</div>
    <div class="message">${msg}</div>
  `;
  container.appendChild(toast);

  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 1500);
  });

  setTimeout(() => toast.classList.add("fade-out"), 10000);
  setTimeout(() => toast.remove(), 12000);
}

// تغییر استایل هدر موقع اسکرول
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// افکت تایپ متن معرفی
const text =
  "با مکس تیم، طراحی سایت فقط یک پروژه نیست؛ یک تجربه دیجیتال تمام‌عیار است.";
const target = document.getElementById("typed-text");
let index = 0;

function typeWriter() {
  if (index < text.length) {
    target.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
  }
}
window.addEventListener("load", typeWriter);

// دکمه برگشت به بالا
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
