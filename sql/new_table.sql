-- 1. Hapus tabel lama jika ada (untuk reset)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS peminjaman CASCADE;
DROP TABLE IF EXISTS inventaris CASCADE;
DROP TABLE IF EXISTS ruangan CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS schools CASCADE;

-- 2. Buat Tabel Schools (Multi-tenant Root)
CREATE TABLE schools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    npsn VARCHAR(20) UNIQUE,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Buat Tabel Users
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Plain text untuk demo sesuai request
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'operator', 'kepala_sekolah', 'peminjam')),
    phone VARCHAR(50),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Buat Tabel Ruangan
CREATE TABLE ruangan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    kode VARCHAR(50),
    nama VARCHAR(255),
    jenis VARCHAR(50),
    kapasitas INTEGER,
    lantai INTEGER,
    gedung VARCHAR(100),
    penanggung_jawab VARCHAR(255),
    kondisi VARCHAR(50),
    photos JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Buat Tabel Inventaris
CREATE TABLE inventaris (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    ruangan_id UUID REFERENCES ruangan(id) ON DELETE SET NULL,
    kode VARCHAR(50),
    nama VARCHAR(255),
    kategori VARCHAR(100),
    merk VARCHAR(100),
    tahun_pembelian INTEGER,
    harga DECIMAL(15,2),
    jumlah INTEGER,
    kondisi VARCHAR(50), -- Baik, Rusak Ringan, Rusak Berat
    status VARCHAR(50), -- Tersedia, Dipinjam, Perbaikan
    photos JSONB DEFAULT '[]'::jsonb,
    documents JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Buat Tabel Peminjaman
CREATE TABLE peminjaman (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    inventaris_id UUID REFERENCES inventaris(id) ON DELETE CASCADE,
    no_pengajuan VARCHAR(50),
    peminjam_id UUID REFERENCES users(id) ON DELETE SET NULL,
    peminjam_nama VARCHAR(255),
    barang_nama VARCHAR(255),
    tanggal_pinjam DATE,
    tanggal_kembali DATE,
    status VARCHAR(50), -- Menunggu, Disetujui, Dipinjam, Dikembalikan, Ditolak
    keterangan TEXT,
    photos JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Buat Tabel Notifications
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50), -- info, warning, danger, success
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Buat Tabel Settings
CREATE TABLE settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE UNIQUE,
    tahun_ajaran VARCHAR(20),
    semester VARCHAR(20),
    kepala_sekolah VARCHAR(255),
    nip_kepala_sekolah VARCHAR(50),
    theme VARCHAR(50),
    primary_color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. SEEDING DATA (Data Awal untuk Demo)
-- Insert Sekolah
INSERT INTO schools (id, name, npsn, address, email) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'SMAN 1 Demo Digital', '12345678', 'Jl. Pendidikan No. 1', 'info@sman1demo.sch.id');

-- Insert Users (Password: demo123)
INSERT INTO users (school_id, name, email, password_hash, role) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Administrator', 'admin@sman1demo.sch.id', 'demo123', 'admin'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Operator Sarpras', 'operator@sman1demo.sch.id', 'demo123', 'operator'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Budi Santoso', 'kepala@sman1demo.sch.id', 'demo123', 'kepala_sekolah');

-- Insert Ruangan
INSERT INTO ruangan (school_id, nama, kode, jenis, kondisi) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Lab Komputer 1', 'R-001', 'Laboratorium', 'Baik'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ruang Guru', 'R-002', 'Kantor', 'Baik');

-- Insert Inventaris
INSERT INTO inventaris (school_id, nama, kode, kategori, merk, jumlah, kondisi, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Laptop Lenovo Thinkpad', 'INV-2024-001', 'Elektronik', 'Lenovo', 10, 'Baik', 'Tersedia'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Proyektor Epson', 'INV-2024-002', 'Elektronik', 'Epson', 2, 'Baik', 'Tersedia');