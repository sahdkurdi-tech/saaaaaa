Parse.initialize("EvVpxCjiH5KiFRUogcQvXBpEPIauIROsbh4hUd4N", "7NMdeZAnL0YLDFTkw7P5WMFtHRNKn1sUrBDHJ2BI");
Parse.serverURL = 'https://parseapi.back4app.com/';
// createAdmin.js
const user = new Parse.User();
user.set("username", "SAAD");
user.set("password", "sahd666666");
user.set("role", "admin"); // تحديد دور المستخدم كـ Admin

user.signUp().then(() => {
  console.log("تم إنشاء حساب المسؤول بنجاح!");
}).catch((error) => {
  console.error("حدث خطأ أثناء إنشاء الحساب: ", error.message);
});
