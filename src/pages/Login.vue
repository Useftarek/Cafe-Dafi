<template>
  <div class="login-page">
    <div class="container">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <h1>تسجيل الدخول</h1>
            <p>مرحباً بك مرة أخرى في كافيه دافئ</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Email -->
            <div class="form-group">
              <label for="email" class="form-label">البريد الإلكتروني *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="أدخل بريدك الإلكتروني"
                required
              >
              <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
            </div>
            
            <!-- Password -->
            <div class="form-group">
              <label for="password" class="form-label">كلمة المرور *</label>
              <div class="password-input-container">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="form.password"
                  class="form-input"
                  :class="{ 'error': errors.password }"
                  placeholder="أدخل كلمة المرور"
                  required
                >
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="password-toggle"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
              <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
            </div>
            
            <!-- Remember Me -->
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="form.rememberMe"
                >
                <span class="checkmark"></span>
                تذكرني
              </label>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary btn-lg w-full"
              :disabled="isLoading"
            >
              <span v-if="isLoading">جاري تسجيل الدخول...</span>
              <span v-else>تسجيل الدخول</span>
            </button>
            
            <!-- Forgot Password -->
            <div class="forgot-password">
              <a href="#" class="link">نسيت كلمة المرور؟</a>
            </div>
            
            <!-- Register Link -->
            <div class="register-link">
              <p>ليس لديك حساب؟ <router-link to="/register" class="link">إنشاء حساب جديد</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      errors: {},
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    
    async handleLogin() {
      // Clear previous errors
      this.errors = {}
      this.isLoading = true
      
      try {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('cafe_users') || '[]')
        
        // Find user by email
        const user = users.find(u => u.email === this.form.email)
        
        if (!user) {
          this.errors.email = 'البريد الإلكتروني غير مسجل'
          this.isLoading = false
          return
        }
        
        // Check password
        if (user.password !== this.form.password) {
          this.errors.password = 'كلمة المرور غير صحيحة'
          this.isLoading = false
          return
        }
        
        // Save user session
        const userSession = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        
        if (this.form.rememberMe) {
          localStorage.setItem('cafe_user', JSON.stringify(userSession))
        } else {
          sessionStorage.setItem('cafe_user', JSON.stringify(userSession))
        }
        
        // Show success message
        alert(`مرحباً ${user.name}! تم تسجيل الدخول بنجاح`)
        
        // Redirect to home page
        this.$router.push('/')
        
        // Refresh the page to update navbar
        window.location.reload()
        
      } catch (error) {
        console.error('Login error:', error)
        alert('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--brown-very-light), var(--cream));
  padding: var(--spacing-2xl) 0;
}

.login-container {
  max-width: 450px;
  margin: 0 auto;
}

.login-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  color: var(--white);
  padding: var(--spacing-xl);
  text-align: center;
}

.login-header h1 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-3xl);
  color: var(--gold-light);
}

.login-header p {
  margin: 0;
  color: var(--brown-very-light);
  font-size: var(--font-size-lg);
}

.login-form {
  padding: var(--spacing-xl);
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  padding: var(--spacing-xs);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: var(--brown-medium);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  min-height: 50px;
}

.forgot-password {
  text-align: center;
  margin: var(--spacing-md) 0;
}

.register-link {
  text-align: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--gray-medium);
}

.register-link p {
  margin: 0;
  color: var(--gray-dark);
}

.link {
  color: var(--brown-medium);
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-page {
    padding: var(--spacing-lg) 0;
  }
  
  .login-header,
  .login-form {
    padding: var(--spacing-lg);
  }
  
  .login-header h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
