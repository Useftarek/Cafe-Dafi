<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <h3>☕ كافيه دافئ</h3>
          <p>مكانك المثالي لتذوق أفضل أنواع القهوة والمشروبات الساخنة والباردة</p>
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🐦</a>
            <a href="#" class="social-link">📱</a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="footer-links">
          <h4>روابط سريعة</h4>
          <ul>
            <li><router-link to="/">الرئيسية</router-link></li>
            <li><router-link to="/menu">المنيو</router-link></li>
            <li><router-link to="/about">عنّا</router-link></li>
            <li><router-link to="/login">تسجيل دخول</router-link></li>
            <li><router-link to="/register">إنشاء حساب</router-link></li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div class="footer-contact">
          <h4>معلومات التواصل</h4>
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span>شارع الملك فهد، الرياض، المملكة العربية السعودية</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📞</span>
            <span>+966 11 123 4567</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">✉️</span>
            <span>info@cafedafee.com</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">🕒</span>
            <span>السبت - الخميس: 6:00 ص - 12:00 م</span>
          </div>
        </div>
        
        <!-- Newsletter -->
        <div class="footer-newsletter">
          <h4>اشترك في النشرة الإخبارية</h4>
          <p>احصل على آخر العروض والأخبار</p>
          <div class="newsletter-form">
            <input type="email" placeholder="بريدك الإلكتروني" class="form-input">
            <button class="btn btn-gold">اشتراك</button>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="footer-bottom">
        <p>&copy; 2024 كافيه دافئ. جميع الحقوق محفوظة.</p>
        <div class="footer-bottom-links">
          <a href="#">سياسة الخصوصية</a>
          <a href="#">شروط الاستخدام</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  color: var(--white);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  margin-top: var(--spacing-2xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-brand h3 {
  color: var(--gold-light);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-2xl);
}

.footer-brand p {
  color: var(--brown-very-light);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-decoration: none;
  font-size: var(--font-size-lg);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--gold);
  transform: translateY(-2px);
}

.footer-links h4,
.footer-contact h4,
.footer-newsletter h4 {
  color: var(--gold-light);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: var(--brown-very-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--gold-light);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--brown-very-light);
}

.contact-icon {
  font-size: var(--font-size-lg);
  margin-top: 2px;
}

.newsletter-form {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.newsletter-form .form-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.newsletter-form .form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-form .form-input:focus {
  background: rgba(255, 255, 255, 0.2);
  border-color: var(--gold);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--brown-very-light);
}

.footer-bottom-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-bottom-links a {
  color: var(--brown-very-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: var(--gold-light);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
  }
}
</style>
