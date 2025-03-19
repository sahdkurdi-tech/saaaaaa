/* js/login.js */
// تهيئة Parse باستخدام بيانات Back4App الخاصة بتطبيقك
Parse.initialize("EvVpxCjiH5KiFRUogcQvXBpEPIauIROsbh4hUd4N", "7NMdeZAnL0YLDFTkw7P5WMFtHRNKn1sUrBDHJ2BI");
Parse.serverURL = 'https://parseapi.back4app.com/';

// عند تقديم نموذج تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // محاولة تسجيل الدخول باستخدام Parse
    const user = await Parse.User.logIn(username, password);
    const userRole = user.get("role");

    if (userRole === "admin") {
      alert("بەخێربێی، بەڕێوەبەر! بە سەرکەوتوویی چویە ژوورەوە.");
      window.location.href = "index.html"; // أو admin.html مباشرة
    } else {
      alert("بە سەرکەوتوویی چویە ژوورەوە!");
      window.location.href = "index.html";
    }
  } catch (error) {
    alert("هەڵەیەک ڕویدا لەکاتی چوونە ژوورەوە: " + error.message);
  }
});
