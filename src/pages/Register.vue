<template>
  <div class="register-page">
    <div class="container">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <h1>إنشاء حساب جديد</h1>
            <p>انضم إلينا واستمتع بأفضل تجربة قهوة</p>
          </div>
          
          <form @submit.prevent="handleRegister" class="register-form">
            <!-- Full Name -->
            <div class="form-group">
              <label for="fullName" class="form-label">الاسم الكامل *</label>
              <input
                type="text"
                id="fullName"
                v-model="form.fullName"
                class="form-input"
                :class="{ 'error': errors.fullName }"
                placeholder="أدخل اسمك الكامل"
                required
              >
              <span v-if="errors.fullName" class="form-error">{{ errors.fullName }}</span>
            </div>
            
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
              
              <!-- Password Requirements -->
              <div class="password-requirements">
                <h5>متطلبات كلمة المرور:</h5>
                <ul class="requirements-list">
                  <li :class="{ 'valid': passwordChecks.length }">
                    <span class="check-icon">{{ passwordChecks.length ? '✅' : '❌' }}</span>
                    على الأقل 12 حرف
                  </li>
                  <li :class="{ 'valid': passwordChecks.uppercase }">
                    <span class="check-icon">{{ passwordChecks.uppercase ? '✅' : '❌' }}</span>
                    حرف كبير واحد على الأقل
                  </li>
                  <li :class="{ 'valid': passwordChecks.special }">
                    <span class="check-icon">{{ passwordChecks.special ? '✅' : '❌' }}</span>
                    حرف خاص واحد على الأقل (!@#$%^&*())
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Confirm Password -->
            <div class="form-group">
              <label for="confirmPassword" class="form-label">تأكيد كلمة المرور *</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="form.confirmPassword"
                class="form-input"
                :class="{ 'error': errors.confirmPassword }"
                placeholder="أعد إدخال كلمة المرور"
                required
              >
              <span v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</span>
            </div>
            
            <!-- Terms and Conditions -->
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="form.acceptTerms"
                  required
                >
                <span class="checkmark"></span>
                أوافق على <a href="#" class="terms-link">شروط الاستخدام</a> و <a href="#" class="terms-link">سياسة الخصوصية</a>
              </label>
              <span v-if="errors.acceptTerms" class="form-error">{{ errors.acceptTerms }}</span>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary btn-lg w-full"
              :disabled="isLoading"
            >
              <span v-if="isLoading">جاري الإنشاء...</span>
              <span v-else>إنشاء الحساب</span>
            </button>
            
            <!-- Login Link -->
            <div class="login-link">
              <p>هل لديك حساب بالفعل؟ <router-link to="/login" class="link">تسجيل الدخول</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      },
      errors: {},
      showPassword: false,
      isLoading: false,
      passwordChecks: {
        length: false,
        uppercase: false,
        special: false
      }
    }
  },
  watch: {
    'form.password'(newPassword) {
      this.validatePassword(newPassword)
    },
    'form.confirmPassword'() {
      this.validateConfirmPassword()
    },
    'form.fullName'() {
      this.validateFullName()
    },
    'form.email'() {
      this.validateEmail()
    }
  },
  methods: {
    // Password validation with special character requirement
    validatePassword(password) {
      this.passwordChecks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
      }
      
      if (password && !this.passwordChecks.length) {
        this.errors.password = 'كلمة المرور يجب أن تكون 12 حرف على الأقل'
      } else if (password && !this.passwordChecks.uppercase) {
        this.errors.password = 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل'
      } else if (password && !this.passwordChecks.special) {
        this.errors.password = 'كلمة المرور يجب أن تحتوي على حرف خاص واحد على الأقل (!@#$%^&*())'
      } else if (password) {
        delete this.errors.password
      }
    },
    
    validateConfirmPassword() {
      if (this.form.confirmPassword && this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'كلمة المرور غير متطابقة'
      } else {
        delete this.errors.confirmPassword
      }
    },
    
    validateFullName() {
      if (this.form.fullName && this.form.fullName.length < 2) {
        this.errors.fullName = 'الاسم يجب أن يكون حرفين على الأقل'
      } else {
        delete this.errors.fullName
      }
    },
    
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (this.form.email && !emailRegex.test(this.form.email)) {
        this.errors.email = 'البريد الإلكتروني غير صحيح'
      } else {
        delete this.errors.email
      }
    },
    
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    
    async handleRegister() {
      // Clear previous errors
      this.errors = {}
      
      // Validate all fields
      this.validateFullName()
      this.validateEmail()
      this.validatePassword(this.form.password)
      this.validateConfirmPassword()
      
      if (!this.form.acceptTerms) {
        this.errors.acceptTerms = 'يجب الموافقة على الشروط والأحكام'
      }
      
      // Check if there are any errors
      if (Object.keys(this.errors).length > 0) {
        return
      }
      
      this.isLoading = true
      
      try {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('cafe_users') || '[]')
        const userExists = existingUsers.find(user => user.email === this.form.email)
        
        if (userExists) {
          this.errors.email = 'البريد الإلكتروني مستخدم بالفعل'
          this.isLoading = false
          return
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          name: this.form.fullName,
          email: this.form.email,
          password: this.form.password, // In real app, hash this password
          createdAt: new Date().toISOString()
        }
        
        // Save to localStorage
        existingUsers.push(newUser)
        localStorage.setItem('cafe_users', JSON.stringify(existingUsers))
        
        // Save current user session
        localStorage.setItem('cafe_user', JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }))
        
        // Show success message
        alert('تم إنشاء الحساب بنجاح! مرحباً بك في كافيه دافئ')
        
        // Redirect to home page
        this.$router.push('/')
        
        // Refresh the page to update navbar
        window.location.reload()
        
      } catch (error) {
        console.error('Registration error:', error)
        alert('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--brown-very-light), var(--cream));
  padding: var(--spacing-2xl) 0;
}

.register-container {
  max-width: 500px;
  margin: 0 auto;
}

.register-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.register-header {
  background: linear-gradient(135deg, var(--brown-dark), var(--brown-medium));
  color: var(--white);
  padding: var(--spacing-xl);
  text-align: center;
}

.register-header h1 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-3xl);
  color: var(--gold-light);
}

.register-header p {
  margin: 0;
  color: var(--brown-very-light);
  font-size: var(--font-size-lg);
}

.register-form {
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

.password-requirements {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--gray-light);
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-medium);
}

.password-requirements h5 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--brown-dark);
  font-size: var(--font-size-sm);
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--gray-dark);
}

.requirements-list li.valid {
  color: #28a745;
}

.check-icon {
  font-size: var(--font-size-sm);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: var(--brown-medium);
}

.terms-link {
  color: var(--brown-medium);
  text-decoration: none;
  font-weight: 600;
}

.terms-link:hover {
  text-decoration: underline;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  min-height: 50px;
}

.login-link {
  text-align: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--gray-medium);
}

.login-link p {
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
  .register-page {
    padding: var(--spacing-lg) 0;
  }
  
  .register-header,
  .register-form {
    padding: var(--spacing-lg);
  }
  
  .register-header h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
