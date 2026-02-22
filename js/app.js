// js/app.js

const currentUser = JSON.parse(localStorage.getItem('sarpras_user'));

// Render Sidebar dan Navbar
function initLayout() {
    // 1. Cek user login
    if (!currentUser) return;

    // 2. Fungsi untuk menyuntikkan HTML
    const renderHTML = () => {
        const sidebarHTML = `
            <div class="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transition-transform duration-300 transform md:translate-x-0 -translate-x-full z-20" id="sidebar">
                <div class="p-6 border-b border-slate-800">
                    <h2 class="text-xl font-bold text-blue-400">SARPRAS<span class="text-white">DIGITAL</span></h2>
                    <div class="mt-2">
                        <p class="text-sm font-semibold truncate">${currentUser.school_name || 'Sekolah'}</p>
                        <p class="text-[10px] text-slate-400">NPSN: ${currentUser.school_npsn || '-'}</p>
                    </div>
                </div>
                
                <nav class="mt-4 px-4 pb-20 space-y-1 overflow-y-auto h-[calc(100vh-140px)] custom-scrollbar">
                    
                    <div class="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 mt-4">Dashboard</div>
                    
                    <a href="index.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('index') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-chart-pie w-6"></i> Overview
                    </a>

                    <div class="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 mt-4">Master Data</div>
                    
                    <a href="ruangan.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('ruangan') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-door-open w-6"></i> Data Ruangan
                    </a>

                    <a href="inventaris.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('inventaris') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-boxes w-6"></i> Aset & KIB
                    </a>

                    <a href="bhp.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('bhp') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-pencil-ruler w-6"></i> Barang Habis Pakai
                    </a>

                    <div class="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 mt-4">Sirkulasi</div>

                    <a href="peminjaman.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('peminjaman') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-hand-holding w-6"></i> Peminjaman
                    </a>

                    <a href="perpindahan.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('perpindahan') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-dolly w-6"></i> Mutasi Barang
                    </a>

                    <div class="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 mt-4">Manajemen</div>

                    <a href="perawatan.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('perawatan') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-tools w-6"></i> Perawatan
                    </a>

                    <a href="pengadaan.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('pengadaan') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-shopping-cart w-6"></i> Pengadaan
                    </a>

                    <div class="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 mt-4">Administrasi</div>

                    <a href="laporan.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('laporan') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-print w-6"></i> Pusat Laporan
                    </a>

                    <a href="pengaturan.html" class="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${window.location.pathname.includes('pengaturan') ? 'bg-blue-600 text-white' : ''}">
                        <i class="fas fa-cog w-6"></i> Pengaturan
                    </a>

                    <div class="mt-8 pt-4 border-t border-slate-800 mb-6">
                        <a href="#" onclick="logout()" class="flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors">
                            <i class="fas fa-sign-out-alt w-6"></i> Keluar Sistem
                        </a>
                    </div>
                </nav>
            </div>
        `;

        const headerHTML = `
            <header class="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:ml-64 fixed top-0 right-0 left-0 z-10">
                <div class="flex items-center">
                    <button id="mobile-menu-btn" class="md:hidden text-slate-600 mr-4">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    <h2 class="text-lg font-semibold text-slate-800 hidden sm:block">
                        ${document.title.split('-')[0].trim()}
                    </h2>
                </div>
                <div class="flex items-center space-x-4 ml-auto">
                    <!-- Notification Bell Placeholder -->
                    <div class="relative cursor-pointer mr-2">
                        <i class="fas fa-bell text-slate-500 text-lg"></i>
                        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white hidden">0</span>
                    </div>

                    <div class="text-right hidden sm:block">
                        <p class="text-sm font-semibold text-slate-800">${currentUser.name}</p>
                        <p class="text-xs text-slate-500 capitalize">${currentUser.role.replace('_', ' ')}</p>
                    </div>
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                        ${currentUser.name.charAt(0)}
                    </div>
                </div>
            </header>
        `;

        // Masukkan HTML ke body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

        // Tambahkan padding-top agar konten tidak tertutup header fixed
        const mainContent = document.querySelector('.md\\:ml-64');
        if(mainContent && !mainContent.classList.contains('pt-16')) {
            mainContent.classList.add('pt-16');
        }

        // Event Listener untuk Mobile Menu
        const btnMenu = document.getElementById('mobile-menu-btn');
        if (btnMenu) {
            btnMenu.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                sidebar.classList.toggle('-translate-x-full');
            });
        }
    };

    // 3. Pastikan Body sudah ada sebelum render
    if (document.body) {
        renderHTML();
    } else {
        document.addEventListener('DOMContentLoaded', renderHTML);
    }
}

// Utility: Format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}