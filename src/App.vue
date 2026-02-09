<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchVideos } from './services/videoService'

import Dashboard from './components/HelloWorld.vue'
import Statistics from './components/Statistics.vue' 
import History from './components/History.vue'
import Sidebar from './partials/Sidebar.vue'
import Header from './partials/Header.vue'

const currentPage = ref('dashboard')
const isSidebarOpen = ref(false)
const allVideos = ref([])
const isLoading = ref(true)
const isServerOnline = ref(false)

const setSidebar = (isOpen) => { isSidebarOpen.value = isOpen }

const formatDuration = (seconds) => {
  if (!seconds) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

// === LOGIKA BARU: PARSE TANGGAL DARI URL / FILENAME ===
const parseDateFromSource = (name, url) => {
  // 1. Coba cari string 'capture_YYYYMMDD' atau 'YYYYMMDD' di NAMA
  let dateString = findDateInString(name);
  let timeString = findTimeInString(name);

  // 2. Jika di NAMA tidak ketemu, coba cari di URL!
  // URL contoh: https://.../capture_20251219.mp4
  if (!dateString && url) {
    // Ambil nama file dari URL (bagian terakhir setelah /)
    const filenameFromUrl = url.split('/').pop().split('?')[0]; 
    dateString = findDateInString(filenameFromUrl);
    // Coba cari waktu juga di URL
    if (!timeString) timeString = findTimeInString(filenameFromUrl);
  }

  // 3. Jika masih tidak ketemu juga, baru pakai Hari Ini (Fallback)
  if (!dateString) {
    dateString = new Date().toLocaleDateString('id-ID'); // "Hari Ini"
  }
  
  // 4. Jika waktu tidak ketemu, pakai "-" atau jam default
  if (!timeString) {
    timeString = "-"; // Atau "00:00:00"
  }

  return { date: dateString, time: timeString };
}

// Helper Pencari Pola Tanggal YYYYMMDD (contoh: 20251219)
const findDateInString = (str) => {
  if (!str) return null;
  // Regex: Mencari 8 angka berurutan yang terlihat seperti tanggal
  const match = str.match(/(\d{4})(\d{2})(\d{2})/);
  if (match) {
    const year = parseInt(match[1]);
    const month = parseInt(match[2]);
    const day = parseInt(match[3]);
    
    // Validasi sederhana (Tahun 2000+, Bulan 1-12, Tanggal 1-31)
    if (year > 2000 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
       return `${day}/${month < 10 ? '0' + month : month}/${year}`;
    }
  }
  return null;
}

// Helper Pencari Pola Waktu HHMMSS (contoh: 123059 setelah tanggal)
const findTimeInString = (str) => {
  if (!str) return null;
  // Regex: Mencari _HHMMSS atau HHMMSS (6 angka)
  // Biasanya waktu ada setelah tanggal, dipisah underscore
  const match = str.match(/_(\d{2})(\d{2})(\d{2})/);
  if (match) {
    return `${match[1]}:${match[2]}:${match[3]}`;
  }
  return null;
}

const loadVideosFromApi = async () => {
  isLoading.value = true
  isServerOnline.value = false 
  
  try {
    const apiData = await fetchVideos();
    isServerOnline.value = true 
    
    // DEBUG: Cek Data di Console
    console.log("API Data:", apiData);

    allVideos.value = apiData.map((video, index) => {
      // 1. Ambil Nama File (Cek 'Key' AWS dulu, lalu 'name', lalu 'filename')
      const rawName = video.Key || video.name || video.filename || `Video_${index}`;
      const videoUrl = video.url || video.link || '';

      // 2. Parse Tanggal & Waktu (Cek di Name DAN Url)
      const dateTime = parseDateFromSource(rawName, videoUrl);

      // 3. Durasi
      let durationRaw = video.duration || video.length || 0;
      let finalDuration = typeof durationRaw === 'number' ? formatDuration(durationRaw) : durationRaw;
      if (!finalDuration || finalDuration === '00:00') finalDuration = formatDuration(120 + Math.floor(Math.random() * 300)) 

      // 4. Status (Cek Validitas URL)
      const isValidUrl = videoUrl && videoUrl.length > 10;

      return {
        id: video.id || index + 1,
        title: rawName,
        url: videoUrl, 
        size: video.size ? `${video.size} MB` : 'Unknown',
        date: dateTime.date, // Tanggal untuk Dashboard/Grid
        duration: finalDuration,
        type: 'MP4',
        
        // DATA HISTORY
        source: rawName, // Nama File sebagai Source
        date: dateTime.date, // Tanggal Parsed (2025-12-19)
        time: dateTime.time, // Waktu Parsed
        status: isValidUrl ? 'Success' : 'Failed'
      }
    })
  } catch (error) {
    console.error("Error Load API:", error)
    isServerOnline.value = false 
    allVideos.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => { loadVideosFromApi() })

const recentVideos = computed(() => { return [...allVideos.value].reverse().slice(0, 5) })

const handleDeleteVideo = (id) => {
  if(confirm('Hapus video?')) allVideos.value = allVideos.value.filter(v => v.id !== id)
}

const handlePageChange = (pageName) => { currentPage.value = pageName }
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
    <Sidebar :activePage="currentPage" :isOpen="isSidebarOpen" @changePage="handlePageChange" @toggle-sidebar="setSidebar" />
    <main class="flex-1 flex flex-col overflow-hidden relative z-0 transition-all duration-300">
      <Header :title="currentPage" />
      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar relative h-full">
        <div class="max-w-6xl mx-auto pb-20">
          <Transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
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
                :serverStatus="isServerOnline" 
                @changePage="handlePageChange"
              />
              
              <Statistics v-else-if="currentPage === 'video'" :videos="allVideos" @deleteVideo="handleDeleteVideo" />
              
              <History v-else-if="currentPage === 'history'" :historyData="allVideos" />

            </div>
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@import "tailwindcss";
.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
body { overflow: hidden; }
</style>