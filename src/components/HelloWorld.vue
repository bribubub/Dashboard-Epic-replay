<script setup>
import { ref } from 'vue'

defineProps({ msg: String })

const count = ref(0)
const replays = ref([
  { id: 1, user: 'Rafi_Dev', game: 'Valorant', duration: '24:12', status: 'Saved' },
  { id: 2, user: 'Epic_Player', game: 'Dota 2', duration: '45:05', status: 'Processing' },
  { id: 3, user: 'Replay_Master', game: 'CS2', duration: '12:30', status: 'Saved' },
])
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
        <p class="mt-2 text-3xl font-bold text-slate-900">1,284</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-800">Recent Replays</h3>
        <button class="text-sm text-emerald-600 font-medium hover:underline">View All</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th class="px-6 py-4">User</th>
              <th class="px-6 py-4">Game</th>
              <th class="px-6 py-4">Duration</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in replays" :key="item.id" class="hover:bg-slate-50 transition">
              <td class="px-6 py-4 font-medium text-slate-700">{{ item.user }}</td>
              <td class="px-6 py-4 text-slate-600">{{ item.game }}</td>
              <td class="px-6 py-4 text-slate-600">{{ item.duration }}</td>
              <td class="px-6 py-4">
                <span :class="item.status === 'Saved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-2 py-1 rounded-md text-[10px] font-bold">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>