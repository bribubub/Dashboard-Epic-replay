<script setup>
defineProps({ title: String })
// Event toggle-sidebar dihapus karena tidak dipakai lagi di sini
</script>

<template>
  <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm shrink-0 z-20 relative">
    
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="text-slate-400 text-sm hidden sm:inline">Pages /</span>
        <h1 class="text-sm font-bold text-slate-800 uppercase tracking-widest">{{ title }}</h1>
      </div>
    </div>
    
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition">Musharof</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Administrator</p>
        </div>
        <div class="relative">
          <img src="https://ui-avatars.com/api/?name=Musharof&background=10b981&color=fff" class="w-10 h-10 rounded-full border border-slate-200 shadow-sm" alt="User Profile" />
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </div>
  </header>
</template>