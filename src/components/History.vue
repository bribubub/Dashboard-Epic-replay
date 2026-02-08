<script setup>
import { ref } from 'vue'

const incomingHistory = ref([
  { id: 1, source: 'Upload_Manual', time: '14:30:05', date: '02 Feb 2026', status: 'Success' },
  { id: 2, source: 'Auto_Save_OBS', time: '13:15:22', date: '02 Feb 2026', status: 'Success' },
  { id: 3, source: 'Live_Stream_01', time: '10:00:00', date: '02 Feb 2026', status: 'Failed' },
  { id: 4, source: 'Upload_Manual', time: '09:45:10', date: '01 Feb 2026', status: 'Success' },
  { id: 5, source: 'Auto_Save_OBS', time: '23:55:01', date: '31 Jan 2026', status: 'Success' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800">Incoming Log</h2>
      <p class="text-slate-500 text-sm">Riwayat waktu video masuk ke dalam sistem.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
       <div class="p-6 border-b border-slate-100">
        <h3 class="font-bold text-slate-800">Activity Log</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th class="px-6 py-4">Source</th>
              <th class="px-6 py-4">Time</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="log in incomingHistory" :key="log.id" class="hover:bg-slate-50 transition">
              <td class="px-6 py-4 font-medium text-slate-700">{{ log.source }}</td>
              <td class="px-6 py-4 text-slate-600 font-mono">{{ log.time }}</td>
              <td class="px-6 py-4 text-slate-600">{{ log.date }}</td>
              <td class="px-6 py-4">
                <span 
                  class="px-2 py-1 rounded-md text-[10px] font-bold border" 
                  :class="log.status === 'Success' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-red-600 bg-red-50 border-red-100'"
                >
                  {{ log.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>