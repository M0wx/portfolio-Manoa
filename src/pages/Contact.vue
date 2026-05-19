<script setup lang="ts">
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import profileImage from '../assets/head-removebg-preview.png'

const calculateAge = computed(() => {
  const birthDate = new Date('2003-11-30')
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
})

// Form Data
const formData = ref({
  name: '',
  email: '',
  message: ''
})

// States
const isSending = ref(false)
const isSent = ref(false)
const error = ref('')

const sendEmail = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    error.value = 'Please fill in all fields.'
    return
  }

  isSending.value = true
  error.value = ''

  try {
    // Note: Replace these with your actual IDs from EmailJS dashboard
    await emailjs.send(
      'service_x7fl5ag', 
      'template_gk1s6g5', 
      {
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
      },
      'qcKac_ule987lelW6'
    )

    isSent.value = true
    formData.value = { name: '', email: '', message: '' }
  } catch (err) {
    error.value = 'Failed to send message. Please try again later.'
    console.error('EmailJS Error:', err)
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <!-- Mini Hero Section -->
    <section class="mini-hero">
      <div class="mini-hero-container">
        <div class="mini-photo-section">
          <div class="mini-doodle orange-blob"></div>
          <div class="mini-photo-wrapper">
            <img :src="profileImage" alt="Manoasoa ANDRIANALIARIMANANA" class="mini-photo" />
          </div>
        </div>
        <div class="mini-hero-info">
          <h1>Manoasoa ANDRIANALIARIMANANA</h1>
          <p class="personal-titles">
            Application Developer • Data Scientist • AI Developer
          </p>
          <p class="personal-details">{{ calculateAge }} years old • Based in Madagascar</p>
          <p class="availability">Available for new opportunities</p>
        </div>
      </div>
    </section>

    <div class="contact-grid">
      <!-- Social Links Section -->
      <section class="social-section">
        <h2>Get in touch</h2>
        <p class="section-desc">Feel free to reach out on any of these platforms.</p>
        
        <div class="social-cards">
          <a href="https://www.linkedin.com/in/manoasoa-andrianaliarimanana-931137231/" target="_blank" class="social-card linkedin">
            <div class="icon">in</div>
            <div class="info">
              <span>LinkedIn</span>
              <p>Connect with me</p>
            </div>
          </a>
          
          <a href="https://github.com/M0wx" target="_blank" class="social-card github">
            <div class="icon">GH</div>
            <div class="info">
              <span>GitHub</span>
              <p>Check my code</p>
            </div>
          </a>
          
          <a href="mailto:manoa.andrianaliarimanana@gmail.com" class="social-card email">
            <div class="icon">@</div>
            <div class="info">
              <span>Email</span>
              <p>manoa.andrianaliarimanana@gmail.com</p>
            </div>
          </a>

          <a href="https://wa.me/261344279560" target="_blank" class="social-card whatsapp">
            <div class="icon">WA</div>
            <div class="info">
              <span>WhatsApp / Phone</span>
              <p>+261 34 42 795 60</p>
            </div>
          </a>
        </div>
      </section>

      <!-- Message Form Section -->
      <section class="form-section">
        <h2>Send a message</h2>
        
        <div v-if="isSent" class="success-message">
          <div class="success-icon">succes</div>
          <h3>Message Sent!</h3>
          <p>Thank you, Manoasoa will get back to you soon.</p>
          <button @click="isSent = false" class="btn-reset">Send another message</button>
        </div>

        <form v-else @submit.prevent="sendEmail" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="formData.name" type="text" id="name" placeholder="Your Name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="formData.email" type="email" id="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea v-model="formData.message" id="message" rows="5" placeholder="How can i help you?" required></textarea>
          </div>
          
          <p v-if="error" class="error-text">{{ error }}</p>
          
          <button type="submit" class="btn-send" :disabled="isSending">
            <span v-if="isSending">Sending...</span>
            <span v-else>Send Message</span>
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Mini Hero Styles */
.mini-hero {
  margin-bottom: 60px;
  background-color: var(--bg-primary);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
}

.mini-hero-container {
  display: flex;
  align-items: center;
  gap: 40px;
}

.mini-photo-section {
  position: relative;
  width: 160px;
  height: 160px;
}

.mini-photo-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
}

.mini-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-doodle {
  position: absolute;
  width: 130%;
  height: 130%;
  top: -15%;
  left: -15%;
  background-color: var(--color-primary);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  z-index: 1;
  opacity: 0.3;
  pointer-events: none;
}

.mini-hero-info h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.personal-titles {
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.personal-details {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.availability {
  margin-top: 10px;
  font-weight: 600;
  color: var(--color-primary);
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--text-primary);
}

.section-desc {
  color: var(--text-secondary);
  margin-bottom: 30px;
}

/* Social Cards */
.social-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-card:hover {
  transform: translateX(10px);
  border-color: var(--color-primary);
}

.icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 50%;
  font-weight: 800;
  color: var(--color-primary);
}

.info span {
  display: block;
  font-weight: 700;
  color: var(--text-primary);
}

.info p {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Form Styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: var(--text-primary);
}

input, textarea {
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--border-medium);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.btn-send {
  background-color: var(--color-primary);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-send:hover {
  opacity: 0.9;
}

.btn-send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success Message */
.success-message {
  text-align: center;
  padding: 40px;
  background-color: var(--bg-primary);
  color :green;
  border-radius: 8px;
  border: 2px solid var(--color-primary);
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.success-message h3 {
  color: var(--text-primary);
  margin-bottom: 10px;
}

.success-message p {
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.btn-reset {
  background: none;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.error-text {
  color: #ff4444;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 850px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .mini-hero-container {
    flex-direction: column;
    text-align: center;
  }
}
</style>