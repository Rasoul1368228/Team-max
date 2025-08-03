document.addEventListener("DOMContentLoaded", () => {
  // 🌙 دارک مود
  const toggle = document.getElementById("darkToggle");
  if (toggle) {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      document.body.classList.add("dark");
      toggle.checked = true;
    }
    toggle.addEventListener("change", () => {
      const enabled = toggle.checked;
      document.body.classList.toggle("dark", enabled);
      localStorage.setItem("darkMode", enabled);
    });
  }

  // ⬆️ دکمه بازگشت به بالا
  const scrollBtn = document.getElementById("scrollUp");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 🔁 سوییچ فرم‌ها
  const leftPanel = document.querySelector(".left-panel");
  const panelTitle = document.getElementById("panel-title");
  const panelText = document.getElementById("panel-text");
  const panelBtn = document.getElementById("panel-btn");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  let isLogin = true;

  function togglePortal() {
    loginForm.classList.toggle("active", !isLogin);
    signupForm.classList.toggle("active", isLogin);
    loginForm.setAttribute("aria-hidden", isLogin);
    signupForm.setAttribute("aria-hidden", !isLogin);
    if (isLogin) {
      panelTitle.textContent = "عضویت در سایت";
      panelText.textContent = "حساب ندارید؟ لطفاً ثبت‌نام کنید.";
      panelBtn.textContent = "ورود";
      panelBtn.setAttribute("aria-controls", "login-form");
      leftPanel.style.background = "linear-gradient(135deg, #2a9d8f, #21867a)";
    } else {
      panelTitle.textContent = "خوش آمدید!";
      panelText.textContent = "اگر حساب کاربری دارید، لطفاً وارد شوید.";
      panelBtn.textContent = "ثبت نام";
      panelBtn.setAttribute("aria-controls", "signup-form");
      leftPanel.style.background = "linear-gradient(135deg, #4a90e2, #357ABD)";
    }
    isLogin = !isLogin;
  }
  panelBtn.addEventListener("click", togglePortal);

  // ✅ فرم ورود
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector(".submit-btn");
    btn.textContent = "🔄 در حال ورود...";
    btn.disabled = true;
    if (validateLoginForm()) {
      setTimeout(() => {
        btn.textContent = "ورود";
        btn.disabled = false;
      }, 1500);
    } else {
      btn.textContent = "ورود";
      btn.disabled = false;
    }
  });

  // ✅ فرم ثبت‌نام
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector(".submit-btn");
    btn.textContent = "🔄 ثبت اطلاعات...";
    btn.disabled = true;
    if (validateSignupForm()) {
      setTimeout(() => {
        btn.textContent = "عضویت";
        btn.disabled = false;
      }, 1500);
    } else {
      btn.textContent = "عضویت";
      btn.disabled = false;
    }
  });
});

// ✅ تابع اعتبارسنجی ورود
function validateLoginForm() {
  const loginForm = document.getElementById("login-form");
  const usernameInput = loginForm.querySelector('input[name="username"]');
  const passwordInput = loginForm.querySelector('input[name="password"]');
  const responseBox = document.getElementById("login-response");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  responseBox.textContent = "";

  if (username === "") {
    responseBox.textContent = "❌ لطفاً نام کاربری یا ایمیل را وارد کنید.";
    responseBox.style.color = "red";
    usernameInput.focus();
    return false;
  }
  if (password === "") {
    responseBox.textContent = "❌ لطفاً رمز عبور را وارد کنید.";
    responseBox.style.color = "red";
    passwordInput.focus();
    return false;
  }
  responseBox.textContent = "✅ ورود با موفقیت انجام شد!";
  responseBox.style.color = "green";
  return true;
}

// ✅ تابع اعتبارسنجی ثبت‌نام
function validateSignupForm() {
  const signupForm = document.getElementById("signup-form");
  const nameInput = signupForm.querySelector('input[name="fullname"]');
  const emailInput = signupForm.querySelector('input[name="email"]');
  const passwordInput = signupForm.querySelector('input[name="new-password"]');
  const responseBox = document.getElementById("signup-response");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  responseBox.textContent = "";

  if (name === "") {
    responseBox.textContent = "❌ لطفاً نام کامل خود را وارد کنید.";
    responseBox.style.color = "red";
    nameInput.focus();
    return false;
  }
  if (!emailPattern.test(email)) {
    responseBox.textContent = "❌ ایمیل واردشده معتبر نیست.";
    responseBox.style.color = "red";
    emailInput.focus();
    return false;
  }
  if (password.length < 6) {
    responseBox.textContent = "❌ رمز عبور باید حداقل ۶ حرف باشد.";
    responseBox.style.color = "red";
    passwordInput.focus();
    return false;
  }
  responseBox.textContent = "✅ ثبت‌نام با موفقیت انجام شد!";
  responseBox.style.color = "green";
  return true;
}
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("header nav ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
      hamburger.classList.toggle("active");
    });
  }
});
