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
          <div class="success-icon">✅</div>
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
            <textarea v-model="formData.message" id="message" placeholder="How can I help you?" required></textarea>
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
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Mini Hero Styles */
.mini-hero {
  margin-bottom: 40px;
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
  width: 140px;
  height: 140px;
  flex-shrink: 0;
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
  font-size: 2.2rem;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.personal-titles {
  color: var(--color-primary);
  font-weight: 700;
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

/* Contact Grid - Improved for symmetry */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 50/50 split */
  gap: 30px;
  align-items: stretch; /* Force same height */
}

.social-section, .form-section {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
}

h2 {
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.section-desc {
  color: var(--text-secondary);
  margin-bottom: 25px;
  font-size: 0.95rem;
}

/* Social Cards - Fixed height items */
.social-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  height: 70px; /* Fixed height for consistent look */
}

.social-card:hover {
  transform: translateX(5px);
  border-color: var(--color-primary);
  background-color: var(--bg-primary);
}

.icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--color-primary);
  border: 1px solid var(--border-light);
}

.info span {
  display: block;
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.info p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

/* Form Styles - Optimized for same height */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

input, textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-medium);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
}

textarea {
  flex-grow: 1; /* Makes textarea take remaining space */
  min-height: 120px;
  resize: vertical;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: var(--bg-primary);
}

.btn-send {
  background-color: var(--color-primary);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: auto; /* Push to bottom */
}

.btn-send:hover {
  opacity: 0.9;
  filter: brightness(1.1);
}

/* Success Message height match */
.success-message {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

@media (max-width: 850px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .mini-hero-container {
    flex-direction: column;
    text-align: center;
  }

  .info p {
    max-width: 100%;
  }

  .social-section, .form-section {
    padding: 20px;
  }
}
</style>