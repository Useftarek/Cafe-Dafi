// API Service for Cafe Website
const API_BASE_URL = 'http://localhost:3001'

class ApiService {
  // Generic fetch method
  async fetchData(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      // Fallback to localStorage if API is not available
      return this.getFromLocalStorage(endpoint)
    }
  }

  // Fallback method to get data from localStorage
  getFromLocalStorage(endpoint) {
    const data = JSON.parse(localStorage.getItem('cafe_data') || '{}')

    switch (endpoint) {
      case '/products':
        return data.products || []
      case '/categories':
        return data.categories || []
      case '/about':
        return data.about || {}
      default:
        return null
    }
  }

  // Initialize data in localStorage
  initializeData(initialData = null) {
    if (initialData) {
      localStorage.setItem('cafe_data', JSON.stringify(initialData))
      return
    }

    const existingData = localStorage.getItem('cafe_data')
    if (!existingData) {
      const defaultData = {
        products: [],
        categories: [],
        about: {}
      }
      localStorage.setItem('cafe_data', JSON.stringify(defaultData))
    }
  }

  // Products API
  async getProducts() {
    return await this.fetchData('/products')
  }

  async getProduct(id) {
    const products = await this.getProducts()
    return products.find(product => product.id === parseInt(id))
  }

  async getFeaturedProducts() {
    const products = await this.getProducts()
    return products.filter(product => product.featured)
  }

  async getProductsByCategory(category) {
    const products = await this.getProducts()
    return products.filter(product => product.category === category)
  }

  async searchProducts(query) {
    const products = await this.getProducts()
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Categories API
  async getCategories() {
    return await this.fetchData('/categories')
  }

  // About API
  async getAbout() {
    return await this.fetchData('/about')
  }

  // User API (localStorage based)
  async registerUser(userData) {
    const users = JSON.parse(localStorage.getItem('cafe_users') || '[]')
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    localStorage.setItem('cafe_users', JSON.stringify(users))
    return newUser
  }

  async loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('cafe_users') || '[]')
    return users.find(user => user.email === email && user.password === password)
  }

  async getUserById(id) {
    const users = JSON.parse(localStorage.getItem('cafe_users') || '[]')
    return users.find(user => user.id === parseInt(id))
  }

  // Cart API (localStorage based)
  async addToCart(productId, quantity = 1, options = {}) {
    const cart = JSON.parse(localStorage.getItem('cafe_cart') || '[]')
    const existingItem = cart.find(item =>
      item.productId === productId &&
      JSON.stringify(item.options) === JSON.stringify(options)
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: Date.now(),
        productId,
        quantity,
        options,
        addedAt: new Date().toISOString()
      })
    }

    localStorage.setItem('cafe_cart', JSON.stringify(cart))
    return cart
  }

  async getCart() {
    return JSON.parse(localStorage.getItem('cafe_cart') || '[]')
  }

  async updateCartItem(itemId, quantity) {
    const cart = await this.getCart()
    const item = cart.find(item => item.id === itemId)

    if (item) {
      if (quantity <= 0) {
        cart.splice(cart.indexOf(item), 1)
      } else {
        item.quantity = quantity
      }
      localStorage.setItem('cafe_cart', JSON.stringify(cart))
    }

    return cart
  }

  async removeFromCart(itemId) {
    const cart = await this.getCart()
    const filteredCart = cart.filter(item => item.id !== itemId)
    localStorage.setItem('cafe_cart', JSON.stringify(filteredCart))
    return filteredCart
  }

  async clearCart() {
    localStorage.removeItem('cafe_cart')
    return []
  }
}

// Create and export API instance
const apiService = new ApiService()
export default apiService
