import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

/**
 * [MANGO] Singleton Pattern for PrismaClient
 * 개발 환경에서 핫 리로딩 시 연결 누수를 방지합니다.
 * [주의] 수정 후에는 반드시 터미널에서 'npx prisma generate'를 실행해야 합니다.
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export { prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma as any;
interface CheckoutRequest {
  userId: string;
  portal: 'FOOD' | 'TRANSFER' | 'TRAVEL' | 'HOBBY' | 'REALTY' | 'MARKET' | 'CHAT' | 'EDUCATION';
  itemId: string;
  piAmount: number;
  mngAmount: number;
  paymentId?: string;
}

/**
 * MANGO HYBRID CHECKOUT ENGINE
 * Handles Pi + MNG split payments with ACID transaction integrity.
 */
export async function POST(req: Request) {
  try {
    const body: CheckoutRequest = await req.json();
    const { userId, portal, itemId, piAmount, mngAmount } = body;

    // 1. Input Validation
    if (!userId || !portal || !itemId || piAmount === undefined || mngAmount === undefined) {
      return NextResponse.json({ error: 'Missing critical checkout parameters.' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      
      // 2. Fetch Profile (잔액 정보가 포함된 Profile 모델 조회)
      const profile = await tx.profile.findUnique({
        where: { id: userId },
      });

      if (!profile) throw new Error('User profile not found in database.');

      // 3. Sufficient Funds Check
      if (profile.piBalance < piAmount) throw new Error('Insufficient Pi (π) balance.');
      if (profile.mngBalance < mngAmount) throw new Error('Insufficient MNG Rewards balance.');

      // 4. Balance Deduction (Wallet 모델이 없으므로 Profile 모델 업데이트)
      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          piBalance: { decrement: piAmount },
          mngBalance: { decrement: mngAmount }
        }
      });

      // 5. Create Order
      const orderData: any = {
        buyerId: userId,
        paymentType: 'HYBRID',
        totalPi: piAmount,
        totalMng: mngAmount,
        status: 'HELD',
        portalType: portal,
      };
      
      if (portal === 'MARKET') orderData.marketProductId = itemId;
      else if (portal === 'TRAVEL') orderData.travelBookingId = itemId;
      else if (portal === 'EDUCATION') orderData.educationCourseId = itemId;

      const order = await tx.order.create({
        data: orderData
      });

      // 6. Generate Ledger Audit Entries
      await tx.ledger.createMany({
        data: [
          {
            userId,
            amount: -piAmount,
            currency: 'PI',
            portal,
            description: `Hybrid Purchase (Pi Portion) - OrderID: ${order.id.slice(0, 8)}`,
          },
          {
            userId,
            amount: -mngAmount,
            currency: 'MNG',
            portal,
            description: `Hybrid Purchase (MNG Portion) - OrderID: ${order.id.slice(0, 8)}`,
          }
        ]
      });

      return { 
        orderId: order.id, 
        balances: { 
          pi: updatedProfile.piBalance, 
          mng: updatedProfile.mngBalance 
        } 
      };
    });

    return NextResponse.json({ success: true, ...result });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Transaction Rollback';
    console.error('[Hybrid Checkout Failed]:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}