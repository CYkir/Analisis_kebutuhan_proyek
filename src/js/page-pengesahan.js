export function initPengesahan() {
  console.log("✅ Halaman Pengesahan aktif");

  // Format tanggal Indonesia

  const tanggalTtd = document.getElementById("tanggalTtd");
  const today = new Date();
  const opsi = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  tanggalTtd.textContent = today.toLocaleDateString("id-ID", opsi);
}