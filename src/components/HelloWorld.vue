<script setup>
import { ref } from 'vue'

// Menerima data dari App.vue
const props = defineProps({
  msg: String,
  totalVideos: Number, // Jumlah total video
  recentVideos: Array  // List 5 video terbaru
})

// Mendaftarkan event agar bisa menyuruh App.vue ganti halaman
const emit = defineEmits(['changePage'])

const count = ref(0)
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800">{{ msg }}</h2>
      <p class="text-slate-500 text-sm">Sistem manajemen konten dan statistik untuk proyek Epic Replay.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-slate-400 text-xs font-bold uppercase tracking-wider">Interaksi User</h3>
        <div class="mt-2 flex items-center justify-between">
          <span class="text-3xl font-bold text-slate-900">{{ count }}</span>
          <button @click="count++" class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition">
            + Klik Test
          </button>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-slate-400 text-xs font-bold uppercase tracking-wider">Status Server</h3>
        <p class="mt-2 text-3xl font-bold text-emerald-500">Active</p>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Replays</h3>
        <p class="mt-2 text-3xl font-bold text-slate-900">{{ totalVideos }}</p>
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
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Duration</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in recentVideos" :key="item.id" class="hover:bg-slate-50 transition">
              <td class="px-6 py-4 font-medium text-slate-700 truncate max-w-[200px]" :title="item.title">{{ item.title }}</td>
              <td class="px-6 py-4 text-slate-600">{{ item.date }}</td>
              <td class="px-6 py-4 text-slate-600">{{ item.duration }}</td>
              <td class="px-6 py-4">
                <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold">
                  Saved
                </span>
              </td>
            </tr>
            <tr v-if="recentVideos.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-400 italic">
                Belum ada video yang tersimpan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>