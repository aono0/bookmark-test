import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //routerオブジェクトを取得
  const router = useRouter();
  //statusには、authenticated,unauthenticated,loadingのいずれか
  const { status } = useSession();

  //下記のuseEffectでrouter（=ページ）もしくはstatusに変更があったときに、statusを確認。
  //statusが、unaunthenticatedだったらログイン画面にリダイレクトする
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [router, status]);

  if (status === 'unauthenticated') return null;

  return <>{children}</>;
};

export default ProtectedRoute;
