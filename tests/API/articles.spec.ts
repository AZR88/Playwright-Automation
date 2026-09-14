import { test, expect } from '@playwright/test';
import { ArticlesResponseSchema } from '../../schemas/article.schema';

test('GET /api/articles - Validasi Kontrak Data Backend', async ({ request }) => {
    
    // 1. Tembak API yang BENAR hasil investigasi, lengkapi dengan Headers penyamaran
    const response = await request.get('https://api.realworld.show/api/articles?limit=1', {
        headers: {
            'Accept': 'application/json',
            'Referer': 'https://demo.realworld.show/'
        }
    });
    
    // 2. Validasi Jaringan: Harus 200 OK
    expect(response.status()).toBe(200);

    // 3. Ekstrak isi JSON dari server
    const responseBody = await response.json();

    // 4. EKSEKUSI PENJAGA GERBANG (Zod)
    const validation = ArticlesResponseSchema.safeParse(responseBody);

    // Praktik Terbaik: Jadikan satu baris asersi.
    // Jika gagal, ia akan mencetak otomatis detail JSON-nya.
    const errorMessage = validation.error ? JSON.stringify(validation.error.format(), null, 2) : "";
    expect(validation.success, `PELANGGARAN SKEMA BACKEND:\n${errorMessage}`).toBeTruthy();

    // Pastikan Zod lolos
    expect(validation.success).toBeTruthy();
});