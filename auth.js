/* js/auth.js */
// تهيئة Parse باستخدام بيانات Back4App الخاصة بتطبيقك
Parse.initialize("EvVpxCjiH5KiFRUogcQvXBpEPIauIROsbh4hUd4N", "7NMdeZAnL0YLDFTkw7P5WMFtHRNKn1sUrBDHJ2BI");
Parse.serverURL = 'https://parseapi.back4app.com/';

// التحقق مما إذا كان المستخدم مسجلاً للدخول
if (!Parse.User.current()) {
  // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجلاً
  window.location.href = "login.html";
} else {
  // التحقق من دور المستخدم
  const currentUser = Parse.User.current();
  const userRole = currentUser.get("role");

  if (window.location.pathname.includes("admin.html") && userRole !== "admin") {
    alert("رێگەت پێ نەدراوە بۆ بینینی ئەم پەڕەیە.");
    window.location.href = "index.html";
  }
}
