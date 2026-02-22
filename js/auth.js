// js/auth.js

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('sarpras_user'));
    // Mengizinkan register.html diakses tanpa login
    const currentPage = window.location.pathname.split("/").pop();
    
    if (!user && currentPage !== 'login.html' && currentPage !== 'register.html') {
        window.location.href = 'login.html';
    } 
    
    if (user && (currentPage === 'login.html' || currentPage === 'register.html')) {
        window.location.href = 'index.html';
    }
    
    return user;
}

async function login(email, password) {
    try {
        // Fetch user + Join tabel schools untuk dapat detail lengkap
        const { data, error } = await sb
            .from('users')
            .select(`
                *,
                schools (
                    id, name, npsn, jenjang, address, logo_url
                )
            `)
            .eq('email', email)
            .eq('password_hash', password)
            .single();

        if (error || !data) {
            throw new Error('Email atau password salah');
        }

        if (!data.is_active) {
            throw new Error('Akun dinonaktifkan oleh administrator');
        }

        // Simpan sesi yang KAYA DATA
        const sessionData = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            school_id: data.school_id,
            // Detail Sekolah Flattened agar mudah diakses
            school_name: data.schools?.name,
            school_npsn: data.schools?.npsn,
            school_address: data.schools?.address,
            school_jenjang: data.schools?.jenjang,
            school_logo: data.schools?.logo_url,
            login_time: new Date().toISOString()
        };

        localStorage.setItem('sarpras_user', JSON.stringify(sessionData));
        return { success: true };

    } catch (err) {
        return { success: false, message: err.message };
    }
}

function logout() {
    localStorage.removeItem('sarpras_user');
    window.location.href = 'login.html';
}