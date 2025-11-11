const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab-link");
const cache = {};

function showLoading() {
  content.innerHTML = `
    <div class="flex justify-center items-center py-10 animate-pulse">
      <span class="loading loading-spinner loading-lg text-amber-400"></span>
      <p class="ml-3 text-gray-500">Memuat halaman...</p>
    </div>
  `;
}

async function loadPage(file) {
  showLoading();

  if (cache[file]) {
    fadeIn(cache[file]);
    initPageScript(file);
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Halaman tidak ditemukan");
    const html = await response.text();
    cache[file] = html;
    fadeIn(html);
    initPageScript(file);
  } catch (error) {
    content.innerHTML = `<p class="text-red-600 text-center py-10">❌ ${error.message}</p>`;
  }
}

function fadeIn(html) {
  content.style.opacity = 0;
  content.innerHTML = html;
  content.style.transition = "opacity 0.3s ease-in-out";
  requestAnimationFrame(() => (content.style.opacity = 1));
}

// Jalankan script sesuai halaman
function initPageScript(file) {
  if (file.includes("analisis.html")) {
    import("./page-analisis.js").then((mod) => mod.initAnalisis());
  } else if (file.includes("srs.html")) {
    import("./page-srs.js").then((mod) => mod.initSRS());
  } else if(file.includes("pengesahan.html")) {
    import("./page-pengesahan.js").then((mod) => mod.initPengesahan());
  }
}

// Load default halaman analisis
loadPage("pages/beranda.html");

// Event untuk tab
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("bg-amber-400", "text-white"));
    tab.classList.add("bg-amber-400", "text-white");
    loadPage(tab.dataset.file);
  });
});
