<script setup>
defineProps({
  msg: String,
  totalVideos: Number,
  recentVideos: Array,
  serverStatus: Boolean // Menerima status server dari App.vue
})

defineEmits(['changePage'])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800">{{ msg }}</h2>
      <p class="text-slate-500 text-sm">Sistem manajemen konten dan statistik video untuk Prasimax.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-slate-400 text-xs font-bold uppercase tracking-wider">Status API Server</h3>
        <div class="mt-2 flex items-center gap-3">
          <span class="relative flex h-3 w-3">
            <span v-if="serverStatus" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3" :class="serverStatus ? 'bg-emerald-500' : 'bg-red-500'"></span>
          </span>
          
          <p class="text-3xl font-bold" :class="serverStatus ? 'text-emerald-500' : 'text-red-500'">
            {{ serverStatus ? 'Online' : 'Offline' }}
          </p>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          {{ serverStatus ? 'Terhubung ke AWS Prasimax' : 'Gagal terhubung ke server' }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Replays</h3>
        <div class="mt-2 flex items-baseline gap-2">
           <p class="text-3xl font-bold text-slate-900">{{ totalVideos }}</p>
           <span class="text-sm text-slate-400">Videos</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Total video tersimpan di database lokal.</p>
      </div>

    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-800">Recent Replays</h3>
        <button 
          @click="$emit('changePage', 'video')"
          class="text-sm text-emerald-600 font-medium hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th class="px-6 py-4">Video Name</th>
              <th class="px-6 py-4">Duration</th>
              <th class="px-6 py-4">Size</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in recentVideos" :key="item.id" class="hover:bg-slate-50 transition">
              <td class="px-6 py-4 font-medium text-slate-700 truncate max-w-[200px]" :title="item.title">
                {{ item.title }}
              </td>
              <td class="px-6 py-4 text-slate-600">{{ item.duration }}</td>
              <td class="px-6 py-4">
                <span class="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold border border-slate-200">
                  {{ item.size }}
                </span>
              </td>
            </tr>
            
            <tr v-if="recentVideos.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-slate-400 italic">
                Belum ada data video terbaru.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>