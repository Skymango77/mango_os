import { useEffect } from 'react';
// Using absolute-style relative pathing to ensure the root lib is found
import { supabase } from './src/lib/supabase';
import { useWalletStore } from './src/store/useWalletStore';
// npm install @supabase/supabase-js 실행 필요
import { RealtimePostgresUpdatePayload } from '@supabase/supabase-js';

// DB의 'profiles' 또는 'wallet' 테이블 구조에 맞는 인터페이스 정의
export interface Profile {
  id: string;
  pi_balance: number | null;
  mng_balance: number | null;
}

// Zustand 스토어의 상태 타입 정의
interface WalletState {
  syncBalances: (pi: number, mng: number) => void;
}

/**
 * MANGO NEXUS: Real-time Balance Synchronizer
 * Listens for database updates on the 'profiles' table and syncs the Zustand store.
 */
export function useSupabaseSync(userId: string | undefined) {
  const syncBalances = useWalletStore((state) => (state as unknown as WalletState).syncBalances);

  useEffect(() => {
    if (!userId) return;

    // 1. Initialize the Real-time Channel
    const channel = supabase
      .channel(`profile-sync-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        (payload: RealtimePostgresUpdatePayload<Profile>) => {
          // 2. Extract new balances from the DB update
          if (payload.new) {
            const { pi_balance, mng_balance } = payload.new;
          
            // 3. Update Zustand global state instantly
            console.log('[Nexus Sync] Balance update received:', { pi_balance, mng_balance });
            syncBalances(pi_balance ?? 0, mng_balance ?? 0);
          }
        }
      )
      .subscribe();

    // Cleanup on unmount or user logout
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, syncBalances]);
};