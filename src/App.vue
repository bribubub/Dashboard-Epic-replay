<script setup>
import { ref, computed, onMounted } from 'vue'

// Import Service API yang baru kita buat
import { fetchVideos } from './services/videoService'

import Dashboard from './components/HelloWorld.vue'
import Statistics from './components/Statistics.vue' 
import History from './components/History.vue'
import Sidebar from './partials/Sidebar.vue'
import Header from './partials/Header.vue'

const currentPage = ref('dashboard')
const isSidebarOpen = ref(false)

const setSidebar = (isOpen) => {
  isSidebarOpen.value = isOpen
}

// --- DATA VIDEOS ---
// Awalnya kosong, nanti diisi dari API
const allVideos = ref([])

// Fungsi untuk Load Data dari API
const loadVideosFromApi = async () => {
  const apiData = await fetchVideos();
  
  // MAPPING DATA: Menyesuaikan format API dengan format Dashboard kita
  // API mungkin punya field "filename", tapi kita butuh "title". Kita cocokkan di sini.
  allVideos.value = apiData.map((video, index) => ({
    id: video.id || index + 1, // Pakai ID dari API atau nomor urut
    title: video.name || video.filename || 'Untitled Video', // Cek nama field di API
    url: video.url || video.link || '', // URL video
    size: video.size ? `${video.size} MB` : 'Unknown', // Ukuran file
    date: video.created_at || new Date().toLocaleDateString(), // Tanggal
    duration: video.duration || '00:00', // Durasi
    type: 'MP4' // Default type
  }))
}

// Panggil fungsi saat aplikasi pertama kali dibuka (Mounted)
onMounted(() => {
  loadVideosFromApi()
})

const recentVideos = computed(() => {
  // Ambil 5 video terakhir (asumsi data API urut dari lama ke baru, kita balik biar yang baru di atas)
  return [...allVideos.value].reverse().slice(0, 5)
})

const handleDeleteVideo = (id) => {
  if(confirm('Are you sure you want to delete this video locally?')) {
    allVideos.value = allVideos.value.filter(v => v.id !== id)
  }
}

const handlePageChange = (pageName) => {
  currentPage.value = pageName
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
    
    <Sidebar 
      :activePage="currentPage" 
      :isOpen="isSidebarOpen"
      @changePage="handlePageChange"
      @toggle-sidebar="setSidebar"
    />

    <main class="flex-1 flex flex-col overflow-hidden relative z-0 transition-all duration-300">
      
      <Header :title="currentPage" />

      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
        <div class="max-w-6xl mx-auto">
          <Transition 
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div :key="currentPage">
              
              <div v-if="allVideos.length === 0 && currentPage !== 'history'" class="p-10 text-center text-slate-400 animate-pulse">
                Sedang menghubungkan ke Server Prasimax...
              </div>

              <Dashboard 
                v-else-if="currentPage === 'dashboard'" 
                msg="Welcome back, Rafi!" 
                :totalVideos="allVideos.length"
                :recentVideos="recentVideos"
                @changePage="handlePageChange"
              />
              
              <Statistics 
                v-else-if="currentPage === 'video'" 
                :videos="allVideos"
                @deleteVideo="handleDeleteVideo"
              />
              
              <History v-else-if="currentPage === 'history'" />
            </div>
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@import "tailwindcss";
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
body { overflow: hidden; }
</style>