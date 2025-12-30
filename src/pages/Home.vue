<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="container">
          <div class="hero-text">
            <h1 class="hero-title">مرحباً بك في كافيه دافئ</h1>
            <p class="hero-subtitle">مكانك المثالي لتذوق أفضل أنواع القهوة والمشروبات الساخنة والباردة</p>
            <div class="hero-buttons">
              <router-link to="/menu" class="btn btn-primary btn-lg">تصفح المنيو</router-link>
              <router-link to="/about" class="btn btn-secondary btn-lg">تعرف علينا</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop" alt="كافيه دافئ">
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="featured-products">
      <div class="container">
        <div class="section-header">
          <h2>منتجاتنا المميزة</h2>
          <p>اكتشف أفضل ما نقدمه من مشروبات وحلويات</p>
        </div>
        
        <div class="products-grid" v-if="featuredProducts.length > 0">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="product-card"
            @click="goToProduct(product.id)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
              <div class="product-badge" v-if="product.featured">مميز</div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <div class="product-price">{{ product.price }} ريال</div>
            </div>
          </div>
        </div>
        
        <div v-else class="loading">
          <p>جاري تحميل المنتجات...</p>
        </div>
        
        <div class="section-footer">
          <router-link to="/menu" class="btn btn-gold">عرض جميع المنتجات</router-link>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
      <div class="container">
        <div class="section-header">
          <h2>تصنيفاتنا</h2>
          <p>اختر من بين مجموعة متنوعة من المشروبات والحلويات</p>
        </div>
        
        <div class="categories-grid" v-if="categories.length > 0">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-card"
            @click="goToCategory(category.id)"
          >
            <div class="category-icon">{{ category.icon }}</div>
            <h3>{{ category.name }}</h3>
            <p>اكتشف مجموعة متنوعة من {{ category.name.toLowerCase() }}</p>
          </div>
        </div>
        
        <div v-else class="loading">
          <p>جاري تحميل التصنيفات...</p>
        </div>
      </div>
    </section>

    <!-- About Preview Section -->
    <section class="about-preview">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>عن كافيه دافئ</h2>
            <p>نحن نؤمن بأن القهوة ليست مجرد مشروب، بل تجربة كاملة تجمع بين الطعم الأصيل والخدمة المتميزة. في كافيه دافئ، نقدم لك أفضل أنواع القهوة والمشروبات الساخنة والباردة، بالإضافة إلى مجموعة متنوعة من الحلويات والسندوتشات الطازجة.</p>
            <div class="about-features">
              <div class="feature">
                <span class="feature-icon">☕</span>
                <span>قهوة عالية الجودة</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🌱</span>
                <span>مكونات طبيعية</span>
              </div>
              <div class="feature">
                <span class="feature-icon">👨‍🍳</span>
                <span>خبراء متخصصون</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🏠</span>
                <span>بيئة مريحة</span>
              </div>
            </div>
            <router-link to="/about" class="btn btn-primary">تعرف علينا أكثر</router-link>
          </div>
          <div class="about-image">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop" alt="كافيه دافئ - الداخل">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="contact-cta">
      <div class="container">
        <div class="cta-content">
          <h2>هل تريد حجز طاولة؟</h2>
          <p>اتصل بنا الآن واحجز طاولتك في أجواء مريحة ومميزة</p>
          <div class="cta-buttons">
            <a href="tel:+966111234567" class="btn btn-gold">اتصل بنا</a>
            <a href="mailto:info@cafedafee.com" class="btn btn-secondary">راسلنا</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import apiService from '../services/api.js'

export default {
  name: 'Home',
  data() {
    return {
      featuredProducts: [],
      categories: [],
      loading: true
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        // Load featured products and categories in parallel
        const [featuredProducts, categories] = await Promise.all([
          apiService.getFeaturedProducts(),
          apiService.getCategories()
        ])
        
        this.featuredProducts = featuredProducts
        this.categories = categories
        this.loading = false
      } catch (error) {
        console.error('Error loading home data:', error)
        this.loading = false
      }
    },
    
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    
    goToCategory(categoryId) {
      this.$router.push(`/menu?category=${categoryId}`)
    }
  }
}
</script>

<style scoped>
.home-page {
  padding-top: 0;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  background: linear-gradient(135deg, var(--brown-very-light), var(--cream));
  overflow: hidden;
}

.hero-content {
  display: flex;
  align-items: center;
  padding: var(--spacing-2xl) 0;
}

.hero-text {
  max-width: 500px;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--brown-dark);
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--gray-dark);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.hero-image {
  position: relative;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

/* Featured Products Section */
.featured-products {
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.product-card {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: var(--gold);
  color: var(--brown-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.product-info {
  padding: var(--spacing-lg);
}

.product-info h3 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-sm);
}

.product-info p {
  color: var(--gray-dark);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

.product-price {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--brown-medium);
}

.section-footer {
  text-align: center;
}

/* Categories Section */
.categories {
  padding: var(--spacing-2xl) 0;
  background: var(--brown-very-light);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.category-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.category-card h3 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-sm);
}

.category-card p {
  color: var(--gray-dark);
  font-size: var(--font-size-sm);
}

/* About Preview Section */
.about-preview {
  padding: var(--spacing-2xl) 0;
  background: var(--white);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.about-text h2 {
  font-size: var(--font-size-3xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-lg);
}

.about-text p {
  font-size: var(--font-size-lg);
  color: var(--gray-dark);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.about-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  color: var(--brown-dark);
}

.feature-icon {
  font-size: var(--font-size-lg);
}

.about-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

/* Contact CTA Section */
.contact-cta {
  padding: var(--spacing-2xl) 0;
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  color: var(--white);
  text-align: center;
}

.cta-content h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
  color: var(--gold-light);
}

.cta-content p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  color: var(--brown-very-light);
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.loading {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--gray-dark);
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    order: 2;
    padding: 3rem 0;
  }

  .hero-text {
    max-width: 100%;
    margin: 0 auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-image {
    order: 1;
    height: 350px;
  }

  .hero-image img {
    border-radius: 0;
  }

  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .about-image {
    order: -1;
  }

  .about-features {
    justify-items: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-buttons .btn {
    width: 100%;
  }

  .about-features {
    grid-template-columns: 1fr;
  }

  .cta-buttons .btn {
    width: 100%;
  }
}
</style>
