<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800">Analisis Performa</h2>
      <p class="text-slate-500 text-sm">Data statistik penggunaan sistem.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="font-bold text-slate-700 mb-4">Top Games</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs mb-1"><span>Valorant</span><span>85%</span></div>
            <div class="w-full bg-slate-100 h-2 rounded-full">
              <div class="bg-emerald-500 h-2 rounded-full" style="width: 85%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs mb-1"><span>Dota 2</span><span>60%</span></div>
            <div class="w-full bg-slate-100 h-2 rounded-full">
              <div class="bg-emerald-400 h-2 rounded-full" style="width: 60%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>