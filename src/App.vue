<script setup>
import { ref } from 'vue'

// 1. IMPORT PAGES
// (Pastikan nama file di folder components sesuai, di sini mengarah ke HelloWorld.vue sesuai file yang kamu upload)
import Dashboard from './components/HelloWorld.vue' 
import Statistics from './components/Statistics.vue'
import History from './components/History.vue'

// 2. IMPORT UI PARTIALS
// FloatingButton dihapus dari sini
import Sidebar from './partials/Sidebar.vue'
import Header from './partials/Header.vue'

const currentPage = ref('dashboard')
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
    
    <Sidebar 
      :activePage="currentPage" 
      @changePage="(page) => currentPage = page" 
    />

    <main class="flex-1 flex flex-col overflow-hidden relative z-0">
      
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
              <Dashboard v-if="currentPage === 'dashboard'" msg="Welcome back, Rafi!" />
              <Statistics v-else-if="currentPage === 'statistics'" />
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

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

body {
  overflow: hidden;
}
</style>