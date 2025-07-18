import Image from 'next/image';

export function LogoVator() {
  return (
    <section className="flex items-center justify-center">
      <div className="cool-shake inline-block rounded-full border-4 border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)] overflow-hidden w-[106px] h-[106px]">
        <Image
          src="/ae86.png"
          alt="AE86 Logo"
          width={106}
          height={106}
          className="object-cover"
        />
      </div>
    </section>
  );
}
