import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import pages
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Menu from './pages/Menu.vue'
import About from './pages/About.vue'
import ProductDetail from './pages/ProductDetail.vue'

// Import data and initialize API
import apiData from '../db.json'
import apiService from './services/api.js'
apiService.initializeData(apiData)

// Router configuration
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/about', name: 'About', component: About },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
