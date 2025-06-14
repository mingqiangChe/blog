import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">欢迎使用Next.js！</h1>
      <p className="text-lg text-gray-600">
        这是我从Vue转向Next.js的第一个项目
      </p>
    </main>
  );
}
