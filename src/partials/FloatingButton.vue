<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ isDarkMode: Boolean })
const emit = defineEmits(['toggle-theme'])

const position = ref({ x: window.innerWidth - 80, y: 30 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const startTime = ref(0) // Untuk mencatat waktu klik

const startDrag = (event) => {
  if (event.button !== 0) return;
  
  // Catat waktu mulai tekan
  startTime.value = Date.now();
  
  isDragging.value = true
  dragOffset.value.x = event.clientX - position.value.x
  dragOffset.value.y = event.clientY - position.value.y
  
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  document.body.style.userSelect = 'none' 
}

const onDrag = (event) => {
  if (!isDragging.value) return;
  
  // Update posisi langsung
  const buttonSize = 48; const padding = 15;    
  let newX = event.clientX - dragOffset.value.x;
  let newY = event.clientY - dragOffset.value.y;

  if (newX < padding) newX = padding;
  if (newX > window.innerWidth - buttonSize - padding) newX = window.innerWidth - buttonSize - padding;
  if (newY < padding) newY = padding;
  if (newY > window.innerHeight - buttonSize - padding) newY = window.innerHeight - buttonSize - padding;

  position.value.x = newX;
  position.value.y = newY;
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  document.body.style.userSelect = '' 
  
  // --- LOGIKA KLIK ANTI-GAGAL ---
  // Jika durasi tekan kurang dari 200ms, anggap itu KLIK (bukan drag)
  const timeDiff = Date.now() - startTime.value;
  if (timeDiff < 200) {
    emit('toggle-theme')
  }
}

const checkBounds = () => { /* Logic resize */ }
onMounted(() => { window.addEventListener('resize', checkBounds) })
onUnmounted(() => { window.removeEventListener('resize', checkBounds) })
</script>

<template>
  <button 
    @mousedown="startDrag"
    :style="{ left: position.x + 'px', top: position.y + 'px', touchAction: 'none' }"
    :class="[
      'fixed z-[9999] w-12 h-12 rounded-full flex items-center justify-center shadow-lg outline-none transition-all duration-300',
      isDarkMode 
        ? 'bg-slate-800 text-yellow-300 border border-slate-700' 
        : 'bg-white text-slate-500 hover:text-orange-500',
      isDragging ? 'scale-110 cursor-grabbing' : 'scale-100 cursor-grab hover:scale-105'
    ]"
  >
    <span class="text-xl pointer-events-none select-none">
      {{ isDarkMode ? '🌙' : '☀️' }}
    </span>
  </button>
</template>