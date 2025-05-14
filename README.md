### Deskripsi Sistem

Sistem ini dirancang untuk memfasilitasi pemesanan ruang meeting di Divisi GA PLN Group. Proses pemesanan ruang meeting dapat dilakukan oleh seluruh pegawai PLN melalui aplikasi yang memungkinkan pemesanan dilakukan secara langsung oleh masing-masing pegawai atau oleh admin di setiap unit PLN.

**Fitur Utama:**

1. **Pemesanan Ruang Meeting:**

    * Pegawai dapat melakukan pemesanan ruang meeting secara langsung, dengan memasukkan informasi seperti unit, nama ruang meeting, tanggal dan waktu pelaksanaan meeting, jumlah peserta, dan jenis konsumsi.

2. **Jenis Konsumsi:**

    * Jenis konsumsi ditentukan berdasarkan waktu pelaksanaan meeting:

        * Meeting sebelum jam 11.00 akan mendapatkan snack pagi.
        * Meeting antara jam 11.00 dan 14.00 akan mendapatkan makan siang.
        * Meeting setelah jam 14.00 akan mendapatkan snack sore.
        * Jika meeting berlangsung di antara jam 09.00 sampai 16.00, peserta akan mendapatkan snack pagi, makan siang, dan snack sore.

3. **Harga Konsumsi:**

    * Setiap jenis konsumsi memiliki harga paket tersendiri, dengan snack pagi sebesar Rp. 20.000, makan siang sebesar Rp. 30.000, dan snack sore sebesar Rp. 20.000 per orang.
    * Nominal biaya dihitung otomatis berdasarkan jumlah peserta dan jenis konsumsi yang dipilih.

4. **Validasi:**

    * Waktu mulai tidak boleh lebih besar dari waktu selesai.
    * Waktu selesai tidak boleh lebih kecil dari waktu mulai.
    * Jumlah peserta tidak boleh lebih besar dari kapasitas ruangan.

### Cara Menginstal Aplikasi

**Prasyarat:**

* Pastikan Anda sudah menginstal PHP, Composer, Node.js, dan npm di sistem Anda.
* Laravel versi 12 dan React sebagai framework frontend.

1. Clone repositori ini:

   ```bash
   git clone https://github.com/adith-widhiantara/booking-room-meeting.git
   ```

2. Pindah ke direktori project:

   ```bash
   cd booking-room-meeting
   ```

3. Install dependensi Laravel menggunakan Composer:

   ```bash
   composer install
   ```

4. Salin file `.env.example` ke `.env`:

   ```bash
   cp .env.example .env
   ```

5. Generate key aplikasi Laravel:

   ```bash
   php artisan key:generate
   ```

6. Setup database dan konfigurasi lainnya di file `.env`.

7. Jalankan migrasi untuk membuat tabel di database:

   ```bash
   php artisan migrate:fresh --seed
   ```

2. Install dependensi frontend menggunakan npm:

   ```bash
   npm install
   ```

3. Jalankan aplikasi React:

   ```bash
   npm run dev
   ```

* Jalankan server Laravel:

  ```bash
  php artisan serve
  ```

* Aplikasi sekarang dapat diakses melalui browser di `http://localhost:8000`.

**Langkah 4: Pengujian**

* Setelah instalasi selesai, pastikan aplikasi berjalan dengan baik, dan coba untuk membuat pemesanan ruang meeting dengan memasukkan data yang sesuai.

---

Untuk memudahkan pengujian dan penggunaan aplikasi, **secara default**, telah disediakan akun **admin** yang dapat digunakan untuk login ke dalam sistem. Berikut adalah detail akun admin yang dapat digunakan:

### Akun Admin Default:

* **Email:** `admin@example.com`
* **Password:** `password`

Akun ini memungkinkan Anda untuk masuk ke sistem dan melakukan manajemen pemesanan ruang meeting serta konfigurasi aplikasi lainnya.

### Cara Login

2. Buka aplikasi di browser Anda, biasanya di `http://localhost:8000/login`.

3. Masukkan email dan password berikut di halaman login:

    * **Email:** `admin@example.com`
    * **Password:** `password`

Dengan akun ini, Anda dapat mengakses panel admin dan mengelola pemesanan ruang meeting serta mengelola data lainnya dalam aplikasi.

Jika Anda ingin mengubah email atau password, Anda bisa melakukannya melalui fitur manajemen pengguna di dalam aplikasi setelah login, atau langsung mengubahnya di database menggunakan Laravel Tinker atau alat lainnya.
