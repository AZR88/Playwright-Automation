// schemas/article.schema.ts
import { z } from 'zod';

// Kontrak wajib untuk satu objek artikel
export const ArticleSchema = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string().optional(), // Tambahkan .optional() di sini
    favorited: z.boolean(),
    favoritesCount: z.number()
});

// Kontrak wajib untuk respons penuh dari API (karena API merespons dengan bungkus array)
export const ArticlesResponseSchema = z.object({
    articles: z.array(ArticleSchema),
    articlesCount: z.number()
});