import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('State Preparation: POST Artikel menggunakan Ekstraksi Token JSON', async ({ request }) => {
    
    // 1. BONGKAR DOMPET (Membaca file JSON dari Minggu 1)
    const authFilePath = path.resolve('playwright/.auth/chromium.json');
    if (!fs.existsSync(authFilePath)) {
        throw new Error("Dompet JSON tidak ditemukan! Jalankan auth.setup.ts terlebih dahulu.");
    }
    const authData = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));

    // 2. EKSTRAKSI TOKEN DARI LOCAL STORAGE
    // Aplikasi Conduit (React/Vue) biasanya menyimpan token di localStorage dengan nama 'jwt' atau 'jwtToken'
    // Karena kita tidak tahu persis struktur URL origin-nya, kita cari di seluruh data origins
    let extractedToken = '';
    for (const origin of authData.origins) {
        const tokenItem = origin.localStorage.find((item: any) => item.name === 'jwtToken' || item.name === 'jwt');
        if (tokenItem) {
            extractedToken = tokenItem.value;
            // Terkadang token dibungkus tanda kutip tambahan oleh browser ("token"), kita bersihkan:
            extractedToken = extractedToken.replace(/(^"|"$)/g, '');
            break;
        }
    }

    if (!extractedToken) {
        throw new Error("Token JWT tidak ditemukan di dalam dompet JSON! Periksa kembali proses Setup Minggu 1 Anda.");
    }

    // 3. EKSEKUSI API INJEKSI (Membuat data tanpa perlu login API ulang)
    const uniqueTitle = `Bypass Article ${Date.now()}`;
    const response = await request.post('https://api.realworld.show/api/articles', {
        headers: { 
            'Authorization': `Token ${extractedToken}`, // Injeksi token curian
            'Accept': 'application/json',
            'Referer': 'https://demo.realworld.show/'
        },
        data: {
            article: {
                title: uniqueTitle,
                description: "Dibuat menggunakan pencurian token JSON",
                body: "Ini membuktikan kita bisa membypass otorisasi tanpa login ulang."
            }
        }
    });

    // 4. VALIDASI
    const responseBody = await response.json();
    if (response.status() !== 201) {
        console.error("GAGAL MEMBUAT ARTIKEL:", responseBody);
        throw new Error("Server menolak Token kita atau format data salah.");
    }

    console.log(`SUKSES! Artikel dibuat: ${responseBody.article.slug}`);
    expect(response.status()).toBe(201);
});