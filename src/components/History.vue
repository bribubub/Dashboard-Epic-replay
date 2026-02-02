<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-slate-800">Activity History</h2>
        <p class="text-slate-500 text-sm">Daftar lengkap rekaman dan aktivitas sistem.</p>
      </div>
      <div class="flex gap-2">
        <input type="text" placeholder="Search history..." class="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="divide-y divide-slate-100">
        <div class="p-6 hover:bg-slate-50 transition flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">
              REC
            </div>
            <div>
              <h4 class="font-bold text-slate-800">New Replay Saved: Valorant_Match_01</h4>
              <p class="text-xs text-slate-400">Feb 02, 2026 • 10:45 AM</p>
            </div>
          </div>
          <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">System</span>
        </div>

        <div class="p-6 hover:bg-slate-50 transition flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
              USR
            </div>
            <div>
              <h4 class="font-bold text-slate-800">User Rafi_Dev logged in</h4>
              <p class="text-xs text-slate-400">Feb 02, 2026 • 09:12 AM</p>
            </div>
          </div>
          <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Security</span>
        </div>

        <div class="p-6 hover:bg-slate-50 transition flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs">
              DEL
            </div>
            <div>
              <h4 class="font-bold text-slate-800">Auto-cleanup: Deleted 5 old cache files</h4>
              <p class="text-xs text-slate-400">Feb 01, 2026 • 11:59 PM</p>
            </div>
          </div>
          <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Maintenance</span>
        </div>
      </div>
    </div>
  </div>
</template>