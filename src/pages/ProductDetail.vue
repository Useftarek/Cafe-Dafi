<template>
  <div class="product-detail-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <p>جاري تحميل تفاصيل المنتج...</p>
      </div>

      <!-- Product Not Found -->
      <div v-else-if="!product" class="not-found">
        <div class="not-found-content">
          <span class="not-found-icon">😔</span>
          <h2>المنتج غير موجود</h2>
          <p>عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
          <router-link to="/menu" class="btn btn-primary">العودة للمنيو</router-link>
        </div>
      </div>

      <!-- Product Details -->
      <div v-else class="product-detail">
        <!-- Back Button -->
        <div class="back-button">
          <button @click="goBack" class="btn btn-secondary">
            ← العودة
          </button>
        </div>

        <div class="product-content">
          <!-- Product Images -->
          <div class="product-images">
            <div class="main-image">
              <img :src="product.image" :alt="product.name">
              <div class="product-badge" v-if="product.featured">مميز</div>
            </div>
            <div class="image-gallery" v-if="productGallery.length > 1">
              <div 
                v-for="(image, index) in productGallery" 
                :key="index"
                class="gallery-thumb"
                :class="{ 'active': selectedImageIndex === index }"
                @click="selectImage(index)"
              >
                <img :src="image" :alt="`${product.name} - صورة ${index + 1}`">
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <div class="product-header">
              <h1>{{ product.name }}</h1>
              <div class="product-price">{{ product.price }} ريال</div>
            </div>

            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>

            <!-- Ingredients -->
            <div class="product-ingredients">
              <h3>المكونات</h3>
              <ul class="ingredients-list">
                <li v-for="ingredient in product.ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
            </div>

            <!-- Options -->
            <div class="product-options">
              <h3>خيارات المنتج</h3>
              
              <!-- Size Options -->
              <div v-if="product.options.size" class="option-group">
                <label class="option-label">الحجم:</label>
                <div class="option-buttons">
                  <button 
                    v-for="size in product.options.size" 
                    :key="size"
                    @click="selectedOptions.size = size"
                    :class="['option-btn', { 'active': selectedOptions.size === size }]"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Milk Options -->
              <div v-if="product.options.milk" class="option-group">
                <label class="option-label">نوع الحليب:</label>
                <div class="option-buttons">
                  <button 
                    v-for="milk in product.options.milk" 
                    :key="milk"
                    @click="selectedOptions.milk = milk"
                    :class="['option-btn', { 'active': selectedOptions.milk === milk }]"
                  >
                    {{ milk }}
                  </button>
                </div>
              </div>

              <!-- Sugar Options -->
              <div v-if="product.options.sugar" class="option-group">
                <label class="option-label">كمية السكر:</label>
                <div class="option-buttons">
                  <button 
                    v-for="sugar in product.options.sugar" 
                    :key="sugar"
                    @click="selectedOptions.sugar = sugar"
                    :class="['option-btn', { 'active': selectedOptions.sugar === sugar }]"
                  >
                    {{ sugar }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Quantity and Add to Cart -->
            <div class="product-actions">
              <div class="quantity-selector">
                <label class="quantity-label">الكمية:</label>
                <div class="quantity-controls">
                  <button 
                    @click="decreaseQuantity" 
                    class="quantity-btn"
                    :disabled="quantity <= 1"
                  >
                    -
                  </button>
                  <span class="quantity-value">{{ quantity }}</span>
                  <button 
                    @click="increaseQuantity" 
                    class="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                @click="addToCart" 
                class="btn btn-primary btn-lg add-to-cart-btn"
                :disabled="addingToCart"
              >
                <span v-if="addingToCart">جاري الإضافة...</span>
                <span v-else>أضف للعربة - {{ totalPrice }} ريال</span>
              </button>
            </div>

            <!-- Product Features -->
            <div class="product-features">
              <div class="feature">
                <span class="feature-icon">☕</span>
                <span>طازج يومياً</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🌱</span>
                <span>مكونات طبيعية</span>
              </div>
              <div class="feature">
                <span class="feature-icon">👨‍🍳</span>
                <span>محضر بخبرة</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🚚</span>
                <span>توصيل سريع</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div v-if="relatedProducts.length > 0" class="related-products">
          <h2>منتجات مشابهة</h2>
          <div class="related-grid">
            <div 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id"
              class="related-card"
              @click="goToProduct(relatedProduct.id)"
            >
              <div class="related-image">
                <img :src="relatedProduct.image" :alt="relatedProduct.name">
              </div>
              <div class="related-info">
                <h4>{{ relatedProduct.name }}</h4>
                <p>{{ relatedProduct.price }} ريال</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      loading: true,
      selectedImageIndex: 0,
      selectedOptions: {
        size: '',
        milk: '',
        sugar: ''
      },
      quantity: 1,
      addingToCart: false,
      relatedProducts: []
    }
  },
  computed: {
    productGallery() {
      if (!this.product) return []
      // In a real app, you might have multiple images per product
      return [this.product.image]
    },
    totalPrice() {
      if (!this.product) return 0
      return this.product.price * this.quantity
    }
  },
  async mounted() {
    await this.loadProduct()
  },
  methods: {
    async loadProduct() {
      try {
        const productId = this.$route.params.id
        const product = await apiService.getProduct(productId)
        
        if (product) {
          this.product = product
          this.initializeOptions()
          await this.loadRelatedProducts()
        }
        
        this.loading = false
      } catch (error) {
        console.error('Error loading product:', error)
        this.loading = false
      }
    },
    
    initializeOptions() {
      if (this.product && this.product.options) {
        // Set default options
        if (this.product.options.size) {
          this.selectedOptions.size = this.product.options.size[0]
        }
        if (this.product.options.milk) {
          this.selectedOptions.milk = this.product.options.milk[0]
        }
        if (this.product.options.sugar) {
          this.selectedOptions.sugar = this.product.options.sugar[0]
        }
      }
    },
    
    async loadRelatedProducts() {
      try {
        const allProducts = await apiService.getProducts()
        this.relatedProducts = allProducts
          .filter(p => p.id !== this.product.id && p.category === this.product.category)
          .slice(0, 4)
      } catch (error) {
        console.error('Error loading related products:', error)
      }
    },
    
    selectImage(index) {
      this.selectedImageIndex = index
    },
    
    increaseQuantity() {
      this.quantity++
    },
    
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    
    async addToCart() {
      if (!this.product) return
      
      this.addingToCart = true
      
      try {
        await apiService.addToCart(this.product.id, this.quantity, this.selectedOptions)
        alert(`تم إضافة ${this.product.name} إلى العربة`)
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('حدث خطأ أثناء إضافة المنتج للعربة')
      } finally {
        this.addingToCart = false
      }
    },
    
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.product-detail-page {
  padding: var(--spacing-2xl) 0;
  background: var(--brown-very-light);
  min-height: 100vh;
}

.loading,
.not-found {
  text-align: center;
  padding: var(--spacing-2xl);
}

.not-found-content {
  max-width: 400px;
  margin: 0 auto;
}

.not-found-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: var(--spacing-lg);
}

.not-found-content h2 {
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.not-found-content p {
  color: var(--gray-dark);
  margin-bottom: var(--spacing-lg);
}

/* Product Detail */
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: var(--spacing-lg);
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

/* Product Images */
.product-images {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.main-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.main-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
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

.image-gallery {
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding: var(--spacing-sm) 0;
}

.gallery-thumb {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.gallery-thumb:hover,
.gallery-thumb.active {
  border-color: var(--brown-medium);
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.product-header h1 {
  font-size: var(--font-size-3xl);
  color: var(--brown-dark);
  margin: 0;
  flex: 1;
}

.product-price {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--brown-medium);
  white-space: nowrap;
}

.product-description p {
  font-size: var(--font-size-lg);
  color: var(--gray-dark);
  line-height: 1.6;
  margin: 0;
}

/* Ingredients */
.product-ingredients h3 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-sm);
}

.ingredients-list li {
  padding: var(--spacing-sm);
  background: var(--white);
  border-radius: var(--radius-sm);
  border: 1px solid var(--gray-medium);
  color: var(--gray-dark);
  font-size: var(--font-size-sm);
}

/* Options */
.product-options h3 {
  font-size: var(--font-size-xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.option-group {
  margin-bottom: var(--spacing-lg);
}

.option-label {
  display: block;
  font-weight: 600;
  color: var(--brown-dark);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.option-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.option-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--gray-medium);
  background: var(--white);
  color: var(--gray-dark);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.option-btn:hover {
  border-color: var(--brown-medium);
  color: var(--brown-medium);
}

.option-btn.active {
  background: var(--brown-medium);
  color: var(--white);
  border-color: var(--brown-medium);
}

/* Actions */
.product-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.quantity-label {
  font-weight: 600;
  color: var(--brown-dark);
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 2px solid var(--gray-medium);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--gray-light);
  color: var(--brown-dark);
  cursor: pointer;
  font-size: var(--font-size-lg);
  font-weight: 600;
  transition: all 0.3s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: var(--brown-medium);
  color: var(--white);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  color: var(--brown-dark);
  font-weight: 600;
  border-left: 1px solid var(--gray-medium);
  border-right: 1px solid var(--gray-medium);
}

.add-to-cart-btn {
  flex: 1;
  min-height: 50px;
}

/* Features */
.product-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
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

/* Related Products */
.related-products {
  margin-top: var(--spacing-2xl);
}

.related-products h2 {
  font-size: var(--font-size-2xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.related-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.related-image {
  height: 150px;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-info {
  padding: var(--spacing-md);
}

.related-info h4 {
  font-size: var(--font-size-lg);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-xs);
}

.related-info p {
  color: var(--brown-medium);
  font-weight: 600;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 992px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .main-image img {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .product-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .product-actions {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }
  
  .quantity-selector {
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .product-features {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-header h1 {
    font-size: 2rem;
  }

  .main-image img {
    height: 300px;
  }
  
  .option-buttons {
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
  }

  .option-buttons::-webkit-scrollbar {
    display: none;
  }
  
  .option-btn {
    white-space: nowrap;
    flex: 0 0 auto;
  }
  
  .product-features, .related-grid, .ingredients-list {
    grid-template-columns: 1fr;
  }
}
</style>
