<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <h1>عن كافيه دافئ</h1>
          <p>مكانك المثالي لتذوق أفضل أنواع القهوة والمشروبات الساخنة والباردة</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <!-- About Story -->
      <section class="about-story">
        <div class="story-content">
          <div class="story-text">
            <h2>قصتنا</h2>
            <p>{{ aboutData.description }}</p>
            <p>نحن نؤمن بأن القهوة ليست مجرد مشروب، بل تجربة كاملة تجمع بين الطعم الأصيل والخدمة المتميزة. في كافيه دافئ، نقدم لك أفضل أنواع القهوة والمشروبات الساخنة والباردة، بالإضافة إلى مجموعة متنوعة من الحلويات والسندوتشات الطازجة.</p>
            <p>كل كوب قهوة نقدمه يحمل في طياته قصة من العناية والاهتمام، من اختيار أجود حبوب القهوة إلى تحضيرها بأحدث الطرق وأكثرها دقة.</p>
          </div>
          <div class="story-image">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop" alt="كافيه دافئ - الداخل">
          </div>
        </div>
      </section>

      <!-- Vision & Mission -->
      <section class="vision-mission">
        <div class="vm-grid">
          <div class="vm-card">
            <div class="vm-icon">🎯</div>
            <h3>رؤيتنا</h3>
            <p>{{ aboutData.vision }}</p>
          </div>
          <div class="vm-card">
            <div class="vm-icon">🚀</div>
            <h3>رسالتنا</h3>
            <p>{{ aboutData.mission }}</p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <div class="section-header">
          <h2>فريقنا</h2>
          <p>تعرف على الأشخاص الذين يجعلون تجربتك مميزة</p>
        </div>
        
        <div class="team-grid" v-if="aboutData.team && aboutData.team.length > 0">
          <div 
            v-for="member in aboutData.team" 
            :key="member.name"
            class="team-member"
          >
            <div class="member-image">
              <img :src="member.image" :alt="member.name">
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <p>{{ member.position }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="loading">
          <p>جاري تحميل معلومات الفريق...</p>
        </div>
      </section>

      <!-- Working Hours & Contact -->
      <section class="info-section">
        <div class="info-grid">
          <!-- Working Hours -->
          <div class="info-card">
            <div class="info-header">
              <span class="info-icon">🕒</span>
              <h3>ساعات العمل</h3>
            </div>
            <div class="working-hours" v-if="aboutData.workingHours">
              <div 
                v-for="(hours, day) in aboutData.workingHours" 
                :key="day"
                class="hours-item"
              >
                <span class="day">{{ getDayName(day) }}</span>
                <span class="hours">{{ hours }}</span>
              </div>
            </div>
            <div v-else class="loading">
              <p>جاري تحميل ساعات العمل...</p>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="info-card">
            <div class="info-header">
              <span class="info-icon">📞</span>
              <h3>معلومات التواصل</h3>
            </div>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div class="contact-details">
                  <strong>العنوان:</strong>
                  <span>{{ aboutData.location || 'شارع الملك فهد، الرياض، المملكة العربية السعودية' }}</span>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <div class="contact-details">
                  <strong>الهاتف:</strong>
                  <a :href="`tel:${aboutData.phone || '+966111234567'}`">
                    {{ aboutData.phone || '+966 11 123 4567' }}
                  </a>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <div class="contact-details">
                  <strong>البريد الإلكتروني:</strong>
                  <a :href="`mailto:${aboutData.email || 'info@cafedafee.com'}`">
                    {{ aboutData.email || 'info@cafedafee.com' }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="section-header">
          <h2>لماذا كافيه دافئ؟</h2>
          <p>نحن نقدم تجربة فريدة ومميزة لعشاق القهوة</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">☕</div>
            <h3>قهوة عالية الجودة</h3>
            <p>نختار أجود حبوب القهوة من أفضل المزارع حول العالم</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3>مكونات طبيعية</h3>
            <p>نستخدم فقط المكونات الطبيعية والطازجة في جميع مشروباتنا</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">👨‍🍳</div>
            <h3>خبراء متخصصون</h3>
            <p>فريقنا من الخبراء المتخصصين في تحضير القهوة والمشروبات</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏠</div>
            <h3>بيئة مريحة</h3>
            <p>مكان مريح وأنيق للاستمتاع بمشروبك المفضل</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>توصيل سريع</h3>
            <p>خدمة توصيل سريعة وموثوقة لجميع أنحاء المدينة</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💝</div>
            <h3>خدمة متميزة</h3>
            <p>نقدم خدمة عملاء متميزة واهتمام بكل التفاصيل</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>زيارتنا اليوم</h2>
          <p>استمتع بتجربة فريدة من نوعها في كافيه دافئ</p>
          <div class="cta-buttons">
            <router-link to="/menu" class="btn btn-primary btn-lg">تصفح المنيو</router-link>
            <a href="tel:+966111234567" class="btn btn-gold btn-lg">احجز طاولة</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js'

export default {
  name: 'About',
  data() {
    return {
      aboutData: {},
      loading: true
    }
  },
  async mounted() {
    await this.loadAboutData()
  },
  methods: {
    async loadAboutData() {
      try {
        const data = await apiService.getAbout()
        this.aboutData = data
        this.loading = false
      } catch (error) {
        console.error('Error loading about data:', error)
        this.loading = false
      }
    },
    
    getDayName(day) {
      const days = {
        'saturday': 'السبت',
        'sunday': 'الأحد',
        'monday': 'الاثنين',
        'tuesday': 'الثلاثاء',
        'wednesday': 'الأربعاء',
        'thursday': 'الخميس',
        'friday': 'الجمعة'
      }
      return days[day] || day
    }
  }
}
</script>

<style scoped>
.about-page {
  padding-top: 0;
}

/* Hero Section */
.about-hero {
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  color: var(--white);
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.hero-content h1 {
  font-size: var(--font-size-4xl);
  color: var(--gold-light);
  margin-bottom: var(--spacing-lg);
}

.hero-content p {
  font-size: var(--font-size-xl);
  color: var(--brown-very-light);
  max-width: 600px;
  margin: 0 auto;
}

/* About Story */
.about-story {
  padding: var(--spacing-2xl) 0;
  background: var(--white);
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.story-text h2 {
  font-size: var(--font-size-3xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-lg);
}

.story-text p {
  font-size: var(--font-size-lg);
  color: var(--gray-dark);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.story-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Vision & Mission */
.vision-mission {
  padding: var(--spacing-2xl) 0;
  background: var(--brown-very-light);
}

.vm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);
}

.vm-card {
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.vm-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.vm-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
}

.vm-card h3 {
  font-size: var(--font-size-2xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.vm-card p {
  font-size: var(--font-size-lg);
  color: var(--gray-dark);
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: var(--spacing-2xl) 0;
  background: var(--white);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.section-header h2 {
  font-size: var(--font-size-3xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.section-header p {
  font-size: var(--font-size-lg);
  color: var(--gray-dark);
  max-width: 600px;
  margin: 0 auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.team-member {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.member-image {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--spacing-lg);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h4 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-sm);
}

.member-info p {
  color: var(--brown-medium);
  font-weight: 600;
  margin: 0;
}

/* Info Section */
.info-section {
  padding: var(--spacing-2xl) 0;
  background: var(--brown-very-light);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);
}

.info-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.info-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.info-icon {
  font-size: var(--font-size-2xl);
}

.info-header h3 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin: 0;
}

/* Working Hours */
.working-hours {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--gray-light);
}

.hours-item:last-child {
  border-bottom: none;
}

.day {
  font-weight: 600;
  color: var(--brown-dark);
}

.hours {
  color: var(--gray-dark);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.contact-icon {
  font-size: var(--font-size-lg);
  margin-top: 2px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.contact-details strong {
  color: var(--brown-dark);
  font-weight: 600;
}

.contact-details a {
  color: var(--brown-medium);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-details a:hover {
  color: var(--brown-dark);
  text-decoration: underline;
}

/* Features Section */
.features-section {
  padding: var(--spacing-2xl) 0;
  background: var(--white);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  background: var(--brown-very-light);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--brown-medium);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
}

.feature-card h3 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.feature-card p {
  color: var(--gray-dark);
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-2xl) 0;
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  color: var(--white);
  text-align: center;
}

.cta-content h2 {
  font-size: var(--font-size-3xl);
  color: var(--gold-light);
  margin-bottom: var(--spacing-lg);
}

.cta-content p {
  font-size: var(--font-size-lg);
  color: var(--brown-very-light);
  margin-bottom: var(--spacing-xl);
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.loading {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--gray-dark);
}

/* Responsive Design */
@media (max-width: 992px) {
  .story-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .story-image {
    order: -1;
  }

  .vm-grid, .info-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .vm-grid, .info-grid, .features-grid, .team-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }

  .member-image {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 1.75rem;
  }

  .story-image img {
    height: 300px;
  }
  
  .vm-card,
  .info-card,
  .feature-card {
    padding: 1.5rem;
  }
}
</style>
