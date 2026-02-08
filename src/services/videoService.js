// src/services/videoService.js

// URL API dari contoh yang kamu kirim
const API_URL = "https://m4yg56y35l.execute-api.ap-southeast-1.amazonaws.com/allvideos";

// TOKEN (Ganti dengan token asli jika ada, kalau tidak ada biarkan string kosong atau dummy)
const ADMIN_TOKEN = "CHANGE_ME"; 

export async function fetchVideos() {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        "x-admin-token": ADMIN_TOKEN, // Header sesuai contohmu
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    
    // Kembalikan array video (sesuaikan dengan struktur response API)
    // Di file contohmu dia return "data.videos", tapi kita jaga-jaga kalau formatnya beda
    return data.videos || data || []; 
  } catch (error) {
    console.error("Gagal mengambil data video:", error);
    return []; // Return array kosong biar web tidak error/blank
  }
}