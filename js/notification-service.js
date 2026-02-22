// js/notification-service.js

class NotificationService {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('sarpras_user'));
        this.checkInterval = 30000; // Cek setiap 30 detik
        this.hasUnread = false;
    }

    init() {
        if (!this.user) return;
        
        // Buat container notifikasi (Badge di header)
        this.renderBadge();
        
        // Mulai polling
        this.checkNotifications();
        setInterval(() => this.checkNotifications(), this.checkInterval);
    }

    renderBadge() {
        // Cari elemen user profile di header (yang dibuat di app.js)
        const headerProfile = document.querySelector('header .flex.items-center.space-x-4');
        if (headerProfile) {
            const notifBtn = document.createElement('div');
            notifBtn.className = 'relative cursor-pointer mr-2';
            notifBtn.innerHTML = `
                <i class="fas fa-bell text-slate-500 text-xl hover:text-blue-600 transition"></i>
                <span id="notif-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">0</span>
            `;
            notifBtn.onclick = () => alert('Fitur detail notifikasi akan segera hadir!'); // Placeholder
            headerProfile.prepend(notifBtn);
        }
    }

    async checkNotifications() {
        // Hitung notifikasi yang belum dibaca
        const { count, error } = await sb
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('school_id', this.user.school_id)
            .eq('is_read', false);

        if (!error) {
            this.updateBadge(count || 0);
        }
    }

    updateBadge(count) {
        const badge = document.getElementById('notif-badge');
        if (badge) {
            if (count > 0) {
                badge.innerText = count > 9 ? '9+' : count;
                badge.classList.remove('hidden');
                
                // Optional: Tampilkan Browser Notification / Sound
                if (count > 0 && !this.hasUnread) {
                    console.log('New notification received!');
                }
                this.hasUnread = true;
            } else {
                badge.classList.add('hidden');
                this.hasUnread = false;
            }
        }
    }
}

// Jalankan service
const notifService = new NotificationService();
// Tunggu sebentar sampai header dirender oleh app.js
setTimeout(() => notifService.init(), 1000);