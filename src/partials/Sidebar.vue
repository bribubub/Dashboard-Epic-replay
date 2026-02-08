<script setup>
// Import logo (sesuaikan dengan nama file kamu)
import logoImg from '../assets/Prasimax_Logo.png'

defineProps({
  activePage: String,
  isOpen: Boolean
})

// Tambahkan 'toggle-sidebar' ke daftar emits
const emit = defineEmits(['changePage', 'toggle-sidebar'])
</script>

<template>
  <aside 
    class="bg-slate-900 text-white flex flex-col border-r border-slate-800 shrink-0 relative z-10 transition-all duration-300 ease-in-out overflow-hidden"
    :class="isOpen ? 'w-64' : 'w-20'"
    @mouseenter="emit('toggle-sidebar', true)"
    @mouseleave="emit('toggle-sidebar', false)"
  >
    
    <div class="h-16 flex items-center border-b border-slate-800 transition-all duration-300"
      :class="isOpen ? 'px-6 justify-start' : 'px-0 justify-center'"
    >
      <div class="flex items-center gap-3">
        <img 
          :src="logoImg" 
          alt="Prasimax Logo" 
          class="w-8 h-8 rounded-lg shadow-md shrink-0 transition-transform duration-300 hover:scale-110 bg-white p-0.5 object-contain"
        />

        <span 
          class="font-bold text-lg tracking-wide text-white whitespace-nowrap transition-opacity duration-200"
          :class="isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'"
        >
          Prasimax
        </span>
      </div>
    </div>
    
    <nav class="flex-1 p-3 space-y-2">
      <button 
        v-for="page in ['dashboard', 'video', 'history']" 
        :key="page"
        @click="$emit('changePage', page)"
        :class="[
          activePage === page ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white',
          isOpen ? 'px-4 justify-start' : 'px-0 justify-center'
        ]"
        class="w-full h-12 flex items-center rounded-xl text-sm font-semibold transition-all duration-200 capitalize group relative"
        :title="!isOpen ? page : ''" 
      >
        <div class="w-6 h-6 shrink-0 flex items-center justify-center">
             <svg v-if="page === 'dashboard'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
             <svg v-if="page === 'video'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
             <svg v-if="page === 'history'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <span 
          class="ml-3 whitespace-nowrap transition-all duration-300 origin-left"
          :class="isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'"
        >
          {{ page }}
        </span>
      </button>
    </nav>

    <div class="p-4 border-t border-slate-800 overflow-hidden">
        <div class="flex items-center gap-3 transition-all duration-300"
           :class="isOpen ? 'justify-start' : 'justify-center'"
        >
            <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
              P
            </div>
            <div 
              class="whitespace-nowrap transition-opacity duration-200"
              :class="isOpen ? 'opacity-100' : 'opacity-0 w-0'"
            >
                <p class="text-xs font-bold text-white">Admin Prasimax</p>
                <p class="text-[10px] text-slate-500">System Operator</p>
            </div>
        </div>
    </div>

  </aside>
</template>