import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.racket.deleteMany();

    await prisma.racket.createMany({
        data: [
            {
                name: 'Wilson Blade 98',
                brand: 'Wilson',
                description: 'Perfect balance of control and power for competitive players.',
                price: 899000,
                image: 'https://wilsonstore.com.co/wp-content/uploads/2024/05/64f57681e7f6dd11f39f8e30_thumbnail.png',
                stock: 10
            },
            {
                name: 'Babolat Pure Aero',
                brand: 'Babolat',
                description: 'Built for aggressive spin and explosive shots.',
                price: 950000,
                image: 'https://www.eltenista.com/upload/gallery/b2023030308255561.png',
                stock: 7
            },
            {
                name: 'Head Speed MP',
                brand: 'Head',
                description: 'Lightweight and versatile racket for all court players.',
                price: 830000,
                image: 'https://www.headcolombia.com.co/wp-content/uploads/2025/09/speed-mp-l-2024-1200x1601.webp',
                stock: 12
            },
            {
                name: 'Yonex Ezone 98',
                brand: 'Yonex',
                description: 'Excellent comfort and precision with powerful shots.',
                price: 920000,
                image: 'https://yonex.com.co/wp-content/uploads/2025/01/100L.webp',
                stock: 8
            },
            {
                name: 'Tecnifibre TF40',
                brand: 'Tecnifibre',
                description: 'Premium feel with exceptional control.',
                price: 870000,
                image: 'https://images.unsplash.com/photo-1622163642998-1ea32cc1f7d?w=800',
                stock: 5
            }
        ]
    });

    console.log('✅ Seed completed');
}
main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });