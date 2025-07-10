import Image from 'next/image';
export function LogoVator() {
  return (
    <section className="flex items-center justify-center">
      <div className="cool-shake inline-block">
        <Image
          src="https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E5%93%88%E5%A3%AB%E5%A5%87.png"
          alt="头像"
          width={106}
          height={106}
          className="object-cover"
        />
      </div>

      <style jsx>{`
        @keyframes coolShake {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(5deg);
          }
          65% {
            transform: rotate(-5deg);
          }
        }
        .cool-shake {
          animation: coolShake 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: center bottom;
          display: inline-block;
        }
      `}</style>
    </section>
  );
}
