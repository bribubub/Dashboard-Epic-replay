<script setup>
defineProps({
  activePage: String
})
defineEmits(['changePage'])
</script>

<template>
  <aside class="w-64 bg-slate-900 text-white flex flex-col shadow-xl shrink-0 relative z-10">
    <div class="p-6 text-2xl font-bold text-emerald-400 border-b border-slate-800 flex items-center gap-2">
      <div class="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-900 text-sm">ER</div>
      Epic Replay
    </div>
    
    <nav class="flex-1 p-4 space-y-2">
      <button 
        v-for="page in ['dashboard', 'statistics', 'history']" 
        :key="page"
        @click="$emit('changePage', page)"
        :class="activePage === page ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
        class="w-full text-left p-3 rounded-xl font-medium transition-all duration-200 capitalize"
      >
        {{ page }}
      </button>
    </nav>
  </aside>
</template>