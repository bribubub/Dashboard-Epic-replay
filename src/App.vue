<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchVideos } from './services/videoService' // Import API Service

import Dashboard from './components/HelloWorld.vue'
import Statistics from './components/Statistics.vue' 
import History from './components/History.vue'
import Sidebar from './partials/Sidebar.vue'
import Header from './partials/Header.vue'

const currentPage = ref('dashboard')
const isSidebarOpen = ref(false)
const allVideos = ref([])
const isLoading = ref(true)

// Fungsi Buka/Tutup Sidebar (Hover)
const setSidebar = (isOpen) => {
  isSidebarOpen.value = isOpen
}

// Load Data API
const loadVideosFromApi = async () => {
  isLoading.value = true
  const apiData = await fetchVideos();
  
  allVideos.value = apiData.map((video, index) => ({
    id: video.id || index + 1,
    title: video.name || video.filename || `Video Recording ${index + 1}`,
    url: video.url || video.link || '', 
    size: video.size ? `${video.size} MB` : 'Unknown',
    date: video.created_at || new Date().toLocaleDateString(),
    duration: video.duration || '00:00',
    type: 'MP4'
  }))
  isLoading.value = false
}

onMounted(() => {
  loadVideosFromApi()
})

const recentVideos = computed(() => {
  return [...allVideos.value].reverse().slice(0, 5)
})

const handleDeleteVideo = (id) => {
  if(confirm('Hapus video ini dari tampilan lokal?')) {
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

      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar relative h-full">
        <div class="max-w-6xl mx-auto pb-20"> <Transition 
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div :key="currentPage">
              
              <div v-if="isLoading && currentPage !== 'history'" class="p-10 text-center flex flex-col items-center justify-center text-slate-400 gap-3">
                <div class="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
                <p class="text-sm font-medium animate-pulse">Menghubungkan ke Server Prasimax...</p>
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

/* Styling Scrollbar Modern */
.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
body { overflow: hidden; }
</style>