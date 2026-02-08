<script setup>
// Props & Emits tetap sama
defineProps({
  videos: Array
})
defineEmits(['deleteVideo'])
</script>

<template>
  <div class="space-y-6 h-full flex flex-col">
    
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
      <div>
        <h2 class="text-xl font-bold text-slate-800">Video Storage</h2>
        <p class="text-slate-500 text-sm">Galeri rekaman tersimpan dari Server Prasimax.</p>
      </div>
      
      <div class="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
        <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Videos</p>
          <p class="text-sm font-bold text-slate-800">{{ videos.length }} Items</p>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        
        <div 
          v-for="video in videos" 
          :key="video.id" 
          class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col"
        >
          <div class="relative aspect-video bg-black group-hover:opacity-100 transition-opacity">
            <video 
              controls 
              preload="metadata"
              class="w-full h-full object-cover"
            >
              <source :src="video.url" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            
            <div class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {{ video.duration }}
            </div>
          </div>

          <div class="p-4 flex-1 flex flex-col justify-between">
            <div class="mb-4">
              <h3 class="font-bold text-slate-800 text-sm truncate" :title="video.title">{{ video.title }}</h3>
              <div class="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {{ video.date }}
                </span>
                <span>•</span>
                <span class="font-medium bg-slate-100 px-1.5 rounded">{{ video.size }}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mt-auto">
              <a 
                :href="video.url" 
                download 
                target="_blank"
                class="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 hover:text-blue-600 transition-colors border border-slate-100"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
              </a>
              <button 
                @click="$emit('deleteVideo', video.id)"
                class="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors border border-slate-100"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>