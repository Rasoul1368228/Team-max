// ================= اجرای اولیه بعد از لود کامل صفحه =================
document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initFAQToggle();
  initPersianDigits();
  initThemeToggle();
  initBackToTop();
  initScrollHeader();
  initTypeWriter();
  initAnimatedElements();
  initOrderCardScroll();
});

// ================= منوی همبرگری =================
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

// ================= بخش سوالات متداول =================
function initFAQToggle() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        faqItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
    }
  });
}

// ================= تبدیل اعداد به فارسی =================
function initPersianDigits() {
  function toPersianDigits(num) {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  console.log(toPersianDigits("09920552567"));
}

// ================= مدیریت حالت روشن/تاریک =================
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

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
}

// ================= دکمه برگشت به بالا =================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= تغییر استایل هدر موقع اسکرول =================
function initScrollHeader() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ================= افکت تایپ متن معرفی =================
function initTypeWriter() {
  const text =
    "با مکس تیم، طراحی سایت فقط یک پروژه نیست؛ یک تجربه دیجیتال تمام‌عیار است.";
  const target = document.getElementById("typed-text");
  if (!target) return;

  let index = 0;
  function typeWriter() {
    if (index < text.length) {
      target.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  }

  window.addEventListener("load", typeWriter);
}

// ================= انیمیشن نمایش باکس‌ها هنگام اسکرول =================
function initAnimatedElements() {
  const animatedElements = document.querySelectorAll(".hidden");
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
  animatedElements.forEach((el) => observer.observe(el));
}

// ================= لودر =================
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s";
      setTimeout(() => (loader.style.display = "none"), 500);
    }
  }, 1500);
});

// ================= پیام خوش‌آمدگویی بر اساس ساعت =================
window.addEventListener("load", () => {
  setTimeout(getGreetingMessage, 5000);
});
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

// ================= نمایش Toast =================
function showToast(msg, icon = "🚀") {
  const container = document.querySelector(".toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `
    <button class="toast-close"></button>
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

// ================= اسکرول به بخش سفارش =================
function initOrderCardScroll() {
  const orderCard = document.getElementById("order-card");
  const phoneContact = document.querySelector(".floating-phone");
  if (!orderCard || !phoneContact) return;

  orderCard.addEventListener("click", () => {
    phoneContact.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
