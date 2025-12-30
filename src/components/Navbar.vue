<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="navbar-content">
        <!-- Right Group: Logo (Appears on Far Right in RTL) -->
        <div class="right-group">
          <router-link to="/" class="navbar-brand">
            <h2>☕ كافيه دافئ</h2>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="navbar-nav" :class="{ 'active': isMenuOpen }">
          <router-link to="/" class="nav-link">الرئيسية</router-link>
          <router-link to="/menu" class="nav-link">المنيو</router-link>
          <router-link to="/about" class="nav-link">عنّا</router-link>
          
          <!-- Mobile Auth Section -->
          <div class="mobile-auth-section">
            <div v-if="isLoggedIn">
              <span class="welcome-text">مرحباً، {{ user.name }}</span>
              <button @click="logout" class="btn btn-secondary">تسجيل خروج</button>
            </div>
            <div v-else>
              <router-link to="/login" class="btn btn-secondary">تسجيل دخول</router-link>
              <router-link to="/register" class="btn btn-primary">إنشاء حساب</router-link>
            </div>
          </div>
        </div>

        <!-- Left Group: Auth (Desktop) / Toggle (Mobile) -->
        <div class="left-group">
          <!-- Desktop Auth -->
          <div class="auth-section">
            <div class="user-section" v-if="isLoggedIn">
              <span class="welcome-text">مرحباً، {{ user.name }}</span>
              <button @click="logout" class="btn btn-secondary btn-sm">خروج</button>
            </div>
            <div class="auth-links" v-else>
              <router-link to="/login" class="btn btn-secondary btn-sm">تسجيل دخول</router-link>
              <router-link to="/register" class="btn btn-primary btn-sm">إنشاء حساب</router-link>
            </div>
          </div>

          <!-- Mobile Toggle -->
          <button 
            @click="toggleMenu" 
            class="mobile-menu-toggle"
            :class="{ 'active': isMenuOpen }"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <div class="menu-overlay" v-if="isMenuOpen" @click="closeMenu"></div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: false,
      user: null
    }
  },
  mounted() {
    this.checkAuthStatus()
    // Close menu on route change
    this.$watch('$route', () => {
      this.closeMenu()
    })
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    checkAuthStatus() {
      const user = localStorage.getItem('cafe_user')
      if (user) {
        this.user = JSON.parse(user)
        this.isLoggedIn = true
      }
    },
    logout() {
      localStorage.removeItem('cafe_user')
      this.isLoggedIn = false
      this.user = null
      this.closeMenu()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  padding: 0.75rem 0;
  height: 80px;
  display: flex;
  align-items: center;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.right-group, .left-group {
  flex: 1;
  display: flex;
}

.right-group {
  justify-content: flex-start;
}

.left-group {
  justify-content: flex-end;
}

.navbar-brand {
  text-decoration: none;
  color: var(--white);
  z-index: 1001;
}

.navbar-brand h2 {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  font-size: 1.05rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: var(--gold-light);
}

.auth-section {
  display: flex;
  align-items: center;
}

.user-section, .auth-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.welcome-text {
  font-weight: 600;
  color: var(--gold-light);
  font-size: var(--font-size-sm);
}

.mobile-auth-section {
  display: none;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  gap: 6px;
}

.mobile-menu-toggle span {
  width: 28px;
  height: 3px;
  background: var(--white);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
}

/* Hamburger Animation */
.mobile-menu-toggle.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: translateX(20px);
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998;
}

@media (max-width: 992px) {
  .auth-section {
    display: none;
  }

  .navbar-nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: var(--brown-dark);
    flex-direction: column;
    padding: 100px 1.5rem 2rem;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: -5px 0 15px rgba(0,0,0,0.3);
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .navbar-nav.active {
    transform: translateX(0);
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-link {
    width: 100%;
    font-size: 1.2rem;
    padding: 0.75rem 1rem;
  }

  .mobile-auth-section {
    display: block;
    width: 100%;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .mobile-auth-section .welcome-text {
    display: block;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .mobile-auth-section .btn {
    width: 100%;
    margin-bottom: 0.75rem;
  }
}
</style>
