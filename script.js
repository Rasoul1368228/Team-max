document.addEventListener("DOMContentLoaded", () => {
  initScrollButton();
  initHamburgerMenu();
  initAuthTabs();
  initSignupValidation();
});

// ⬆️ دکمه بازگشت به بالا
function initScrollButton() {
  const scrollBtn = document.getElementById("scrollUp");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 🍔 منوی همبرگری
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("header nav ul");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    hamburger.classList.toggle("active");
  });
}

// 🔄 تب‌های ورود و عضویت
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

// ✅ اعتبارسنجی فرم عضویت
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
