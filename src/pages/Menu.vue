<template>
  <div class="menu-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>منيو كافيه دافئ</h1>
        <p>اكتشف مجموعة متنوعة من المشروبات والحلويات والسندوتشات</p>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="filters-container">
          <!-- Category Filter -->
          <div class="filter-group">
            <label class="filter-label">التصنيف:</label>
            <div class="filter-buttons">
              <button 
                @click="setCategory('all')"
                :class="['filter-btn', { 'active': selectedCategory === 'all' }]"
              >
                الكل
              </button>
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="setCategory(category.id)"
                :class="['filter-btn', { 'active': selectedCategory === category.id }]"
              >
                {{ category.icon }} {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Price Filter -->
          <div class="filter-group">
            <label class="filter-label">السعر:</label>
            <div class="filter-buttons">
              <button 
                @click="setPriceRange('all')"
                :class="['filter-btn', { 'active': selectedPriceRange === 'all' }]"
              >
                الكل
              </button>
              <button 
                @click="setPriceRange('low')"
                :class="['filter-btn', { 'active': selectedPriceRange === 'low' }]"
              >
                أقل من 20 ريال
              </button>
              <button 
                @click="setPriceRange('medium')"
                :class="['filter-btn', { 'active': selectedPriceRange === 'medium' }]"
              >
                20 - 30 ريال
              </button>
              <button 
                @click="setPriceRange('high')"
                :class="['filter-btn', { 'active': selectedPriceRange === 'high' }]"
              >
                أكثر من 30 ريال
              </button>
            </div>
          </div>

          <!-- Search -->
          <div class="filter-group">
            <label class="filter-label">البحث:</label>
            <div class="search-container">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="ابحث عن منتج..."
                class="search-input"
                @input="handleSearch"
              >
              <span class="search-icon">🔍</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-section">
        <div v-if="loading" class="loading">
          <p>جاري تحميل المنتجات...</p>
        </div>

        <div v-else-if="filteredProducts.length > 0" class="products-grid">
          <div 
            v-for="product in filteredProducts" 
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
              <div class="product-ingredients">
                <span class="ingredients-label">المكونات:</span>
                <span class="ingredients-list">{{ product.ingredients.join('، ') }}</span>
              </div>
              <div class="product-footer">
                <div class="product-price">{{ product.price }} ريال</div>
                <button 
                  @click.stop="addToCart(product)"
                  class="btn btn-primary btn-sm"
                >
                  أضف للعربة
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-products">
          <div class="no-products-content">
            <span class="no-products-icon">😔</span>
            <h3>لم نجد منتجات</h3>
            <p>جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
            <button @click="clearFilters" class="btn btn-secondary">مسح الفلاتر</button>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div v-if="!loading && filteredProducts.length > 0" class="results-summary">
        <p>عرض {{ filteredProducts.length }} منتج من أصل {{ allProducts.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js'

export default {
  name: 'Menu',
  data() {
    return {
      allProducts: [],
      categories: [],
      filteredProducts: [],
      selectedCategory: 'all',
      selectedPriceRange: 'all',
      searchQuery: '',
      loading: true
    }
  },
  async mounted() {
    await this.loadData()
    this.applyFilters()
    
    // Check for category filter from URL
    const category = this.$route.query.category
    if (category) {
      this.selectedCategory = category
      this.applyFilters()
    }
  },
  methods: {
    async loadData() {
      try {
        const [products, categories] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories()
        ])
        
        this.allProducts = products
        this.categories = categories
        this.loading = false
      } catch (error) {
        console.error('Error loading menu data:', error)
        this.loading = false
      }
    },
    
    setCategory(category) {
      this.selectedCategory = category
      this.applyFilters()
    },
    
    setPriceRange(range) {
      this.selectedPriceRange = range
      this.applyFilters()
    },
    
    handleSearch() {
      this.applyFilters()
    },
    
    applyFilters() {
      let filtered = [...this.allProducts]
      
      // Category filter
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === this.selectedCategory)
      }
      
      // Price filter
      if (this.selectedPriceRange !== 'all') {
        filtered = filtered.filter(product => {
          const price = product.price
          switch (this.selectedPriceRange) {
            case 'low':
              return price < 20
            case 'medium':
              return price >= 20 && price <= 30
            case 'high':
              return price > 30
            default:
              return true
          }
        })
      }
      
      // Search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(query)
          )
        )
      }
      
      this.filteredProducts = filtered
    },
    
    clearFilters() {
      this.selectedCategory = 'all'
      this.selectedPriceRange = 'all'
      this.searchQuery = ''
      this.applyFilters()
    },
    
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    
    async addToCart(product) {
      try {
        await apiService.addToCart(product.id, 1)
        alert(`تم إضافة ${product.name} إلى العربة`)
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('حدث خطأ أثناء إضافة المنتج للعربة')
      }
    }
  }
}
</script>

<style scoped>
.menu-page {
  padding: var(--spacing-2xl) 0;
  background: var(--brown-very-light);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-header h1 {
  font-size: var(--font-size-4xl);
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.page-header p {
  font-size: var(--font-size-lg);
  color: var(--gray-dark);
  max-width: 600px;
  margin: 0 auto;
}

/* Filters Section */
.filters-section {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  box-shadow: var(--shadow-md);
}

.filters-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.filter-label {
  font-weight: 600;
  color: var(--brown-dark);
  font-size: var(--font-size-lg);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.filter-btn {
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

.filter-btn:hover {
  border-color: var(--brown-medium);
  color: var(--brown-medium);
}

.filter-btn.active {
  background: var(--brown-medium);
  color: var(--white);
  border-color: var(--brown-medium);
}

.search-container {
  position: relative;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  padding-left: 40px;
  border: 2px solid var(--gray-medium);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--brown-medium);
  box-shadow: 0 0 0 3px rgba(160, 82, 45, 0.1);
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-dark);
  font-size: var(--font-size-lg);
}

/* Products Section */
.products-section {
  margin-bottom: var(--spacing-2xl);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
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
  transform: translateY(-4px);
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

.product-ingredients {
  margin-bottom: var(--spacing-md);
}

.ingredients-label {
  font-weight: 600;
  color: var(--brown-dark);
  font-size: var(--font-size-sm);
}

.ingredients-list {
  color: var(--gray-dark);
  font-size: var(--font-size-sm);
  margin-right: var(--spacing-xs);
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--brown-medium);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  min-height: 36px;
}

/* No Products */
.no-products {
  text-align: center;
  padding: var(--spacing-2xl);
}

.no-products-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-products-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: var(--spacing-lg);
}

.no-products-content h3 {
  color: var(--brown-dark);
  margin-bottom: var(--spacing-md);
}

.no-products-content p {
  color: var(--gray-dark);
  margin-bottom: var(--spacing-lg);
}

/* Results Summary */
.results-summary {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  color: var(--gray-dark);
}

.loading {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--gray-dark);
}

/* Responsive Design */
@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .filters-section {
    padding: 1rem;
    margin: 0 -1rem var(--spacing-lg);
    border-radius: 0;
  }

  .filter-group {
    gap: 0.75rem;
  }

  .filter-buttons {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    margin: 0 -0.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Hide scrollbar for Firefox */
  }

  .filter-buttons::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome/Safari */
  }

  .filter-btn {
    white-space: nowrap;
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
  }

  .search-container {
    max-width: 100%;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .product-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .product-footer .btn {
    width: 100%;
  }
}
</style>
