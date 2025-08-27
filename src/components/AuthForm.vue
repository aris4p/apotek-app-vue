<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import customAPI from '@/utils/api';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const remember = ref(false);
const errorMessage = ref("");

const AuthMutation = useMutation({
    mutationFn: async () => {
        try {
            // Login API call
            const { data } = await customAPI.post('/login', {
                email: email.value,
                password: password.value
            });

            console.log('Login response:', data);

            // Get user data
            const user = await customAPI.get('/user', {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            console.log('User data:', user.data);

            // Set user to store
            authStore.setAuth(data.token, user.data.user);

            return data;
        } catch (error: any) {
            console.error('Login mutation error:', error);
            throw error;
        }
    },
    onSuccess: (data) => {
        console.log('Login successful:', data);
        errorMessage.value = "";
        
        // Redirect to home
        router.push({ name: 'home' });
    },
    onError: (error: any) => {
        console.error("Login failed:", error);
        
        // Handle different error types
        if (error.response?.status === 401) {
            errorMessage.value = "Email atau password salah";
        } else if (error.response?.status === 422) {
            errorMessage.value = "Data yang dimasukkan tidak valid";
        } else if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = "Terjadi kesalahan. Silakan coba lagi.";
        }
    }
});

const AuthSubmitHandle = (event: Event) => {
    event.preventDefault();
    
    // Clear previous error
    errorMessage.value = "";
    
    // Basic validation
    if (!email.value || !password.value) {
        errorMessage.value = "Email dan password harus diisi";
        return;
    }
    
    // Execute login mutation
    AuthMutation.mutate();
};
</script>

<template>
<section class="vh-100">
  <div class="container-fluid h-custom mx-auto">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <!-- Error Alert -->
        <div v-if="errorMessage" class="alert alert-danger mb-4" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="AuthMutation.isSuccess.value" class="alert alert-success mb-4" role="alert">
          <i class="fas fa-check-circle me-2"></i>
          Login berhasil! Mengalihkan...
        </div>
        
        <form @submit="AuthSubmitHandle">
          <!-- Email input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              v-model="email"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': errorMessage && !email }"
              placeholder="Enter a valid email address"
              required
              :disabled="AuthMutation.isPending.value"
            />
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': errorMessage && !password }"
              placeholder="Enter password"
              required
              :disabled="AuthMutation.isPending.value"
            />
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <div class="form-check mb-0">
              <input 
                class="form-check-input me-2" 
                type="checkbox" 
                v-model="remember"
                id="remember" 
                :disabled="AuthMutation.isPending.value"
              />
              <label class="form-check-label" for="remember">
                Remember me
              </label>
            </div>
            <a href="#!" class="text-body">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button  
              type="submit" 
              class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;"
              :disabled="AuthMutation.isPending.value"
            >
              <template v-if="AuthMutation.isPending.value">
                <i class="fas fa-spinner fa-spin me-2"></i>
                Logging in...
              </template>
              <template v-else>
                <i class="fas fa-sign-in-alt me-2"></i>
                Login
              </template>
            </button>
            <p class="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account? 
              <a href="#!" class="link-danger">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
/* .vh-100 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
} */

.h-custom {
  min-height: 100vh;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  transform: none;
}

.alert {
  border-radius: 8px;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

@media (max-width: 768px) {
  .offset-xl-1 {
    margin-left: 0;
  }
}
</style>