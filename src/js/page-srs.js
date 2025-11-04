export function initSRS() {
  console.log("✅ Halaman SRS aktif");

  // Format tanggal Indonesia
  const tanggalElement = document.getElementById("tanggal");
  const tanggalTtd = document.getElementById("tanggalTtd");
  const today = new Date();
  const opsi = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  tanggalElement.textContent = today.toLocaleDateString("id-ID", opsi);
  tanggalTtd.textContent = today.toLocaleDateString("id-ID", opsi);
}

 
