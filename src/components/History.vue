<script setup>
import { computed } from 'vue'

// Menerima data dari App.vue lewat props "historyData"
const props = defineProps({
  historyData: {
    type: Array,
    default: () => [] 
  }
})

// Kita balik urutannya agar Log terbaru muncul di paling atas
const sortedHistory = computed(() => {
  return [...props.historyData].reverse()
})
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800">Incoming Log</h2>
      <p class="text-slate-500 text-sm">Riwayat aktivitas video masuk (Realtime Monitoring).</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th class="px-6 py-4">File Name</th>
              <th class="px-6 py-4">Time</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            
            <tr v-for="item in sortedHistory" :key="item.id" class="hover:bg-slate-50 transition">
              
              <td class="px-6 py-4 font-medium text-slate-700 truncate max-w-[250px]" :title="item.source">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {{ item.source }}
                </div>
              </td>

              <td class="px-6 py-4 text-slate-600 font-mono font-bold">
                {{ item.time }}
              </td>

              <td class="px-6 py-4 text-slate-600">
                {{ item.date }}
              </td>

              <td class="px-6 py-4">
                <span 
                  class="px-2 py-1 rounded-md text-[10px] font-bold border"
                  :class="item.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'"
                >
                  {{ item.status }}
                </span>
              </td>
            </tr>

            <tr v-if="sortedHistory.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-400 italic">
                Tidak ada data log.
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>