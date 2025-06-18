import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard'); 
  }, []);

  return null; // No need to render anything here, we're redirecting
}
