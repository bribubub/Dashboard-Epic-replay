// src/services/videoService.js

const API_URL = "https://m4yg56y35l.execute-api.ap-southeast-1.amazonaws.com/allvideos";
const ADMIN_TOKEN = "CHANGE_ME";

export async function fetchVideos() {
  // Kita hapus try-catch di sini, biarkan App.vue yang menangani errornya
  // agar App.vue tahu kapan harus bilang "Offline"
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      "x-admin-token": ADMIN_TOKEN,
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data.videos || data || []; 
}