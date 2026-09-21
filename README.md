# 🚀 NextPRO - Full-Stack Modern Content & Blogging Platform

**NextPRO** هي منصة تدوين ومشاركة محتوى عصرية وشاملة، تم بناؤها باستخدام أحدث تقنيات تطوير الويب لتقديم تجربة مستخدم سريعة، متجاوبة، وتفاعلية عالية الأداء.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

### **Frontend & Framework:**
* **[Next.js](https://nextjs.org/) (App Router):** إطار العمل الأساسي للواجهات ودعم الـ SSR والـ Client Components.
* **[React 19](https://react.dev/):** مكتبة بناء الواجهات البرمجية.
* **[Tailwind CSS](https://tailwindcss.com/):** للتنسيق وإعطاء المكونات مظهرًا عصريًا وسريع الاستجابة (`Responsive Design`).
* **[shadcn/ui](https://ui.shadcn.com/):** مكتبة مكونات واجهة المستخدم المنيفة والمبنية فوق Tailwind CSS.
* **[Lucide React](https://lucide.dev/):** أيقونات متجهة (SVG) خفيفة وعصرية.

### **Backend, Database & Auth:**
* **[Convex](https://www.convex.dev/):** قاعدة بيانات سحابية حية (Real-time Database) وإطار عمل للـ Backend.
* **[Better-Auth / Convex Auth](https://www.convex.dev/):** لإدارة مصادقة المستخدمين (تسجيل الدخول، إنهاء الجلسات، والحماية).
* **[Sonner](https://sonner.emilkowal.si/):** لإظهار إشعارات ناعمة وتفاعلية (Toast Notifications).

---

## ✨ المميزات الرئيسية (Key Features)

1. **شريط ملاحة ذكي ومتكيف (Responsive Navbar):**
   * دعم التكيف الكامل على الهواتف والأجهزة المباشرة (`Select Menu` في الموبايل و`Links` في الشاشات الكبيرة).
   * شريط بحث مخصص يظهر في الأسفل بأسلوب جذاب في الهواتف ومدمج في الشاشات الكبيرة.

2. **محرك بحث فوري وقوي (Real-time Search):**
   * نظام بحث حي بالربط مع Convex Backend.
   * إظهار مؤشر تحكم أثناء جلب البيانات (`Searching...`).
   * إغلاق تلقائي للنتائج عند النقر خارج نطاق البحث (`Click Outside`).
   * زر سريع لإلغاء وإفراغ البحث (`Clear Input`).

3. **إدارة الحسابات والمصادقة (Authentication):**
   * تسجيل الدخول والخروج مع التحديث اللحظي لحالة المستخدم (`useConvexAuth`).

4. **تصفح وإنشاء المقالات (Blog & Content Management):**
   * عرض أحدث المقالات مع تخصيص العناوين والنصوص المقصوصة (`line-clamp`).
   * واجهة إنشاء وتعديل المقالات بشكل سلس.

5. **دعم الوضع المظلم والفاتح (Dark & Light Mode):**
   * تبديل متناسق باستخدام مكون `ModeToggle`.

---

## 📁 هيكلية المشروع (Project Structure)

```text
├── app/
│   ├── blog/              # صفحات المقالات
│   ├── create/            # صفحة إنشاء مقال جديد
│   ├── login/             # صفحة تسجيل الدخول
│   ├── signup/            # صفحة إنشـاء حساب
│   ├── layout.tsx         # الهيكل العام للتطبيق
│   └── page.tsx           # الصفحة الرئيسية (Landing Page)
├── components/
│   ├── ui/                # مكونات مكتبة shadcn/ui (Input, Button, Select...)
│   ├── navbar.tsx         # شريط الملاحة الرئيسي والتفاعلي
│   ├── search.tsx         # مكون البحث الفوري الذكي
│   └── mode-toggle.tsx    # زر تغيير الوضع المظلم/الفاتح
├── convex/                # إعدادات وقواعد بيانات Convex Backend
│   ├── _generated/        # الأكواد الموالدة تلقائيًا من Convex
│   └── Post.ts            # استعلامات البحث والمقالات
└── lib/
    └── auth-client.ts     # إعدادات عميل المصادقة