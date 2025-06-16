// components/VideoCard.tsx
export default function VideoCard({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  return (
    <div className="rounded-xl bg-white/80 dark:bg-gray-900/80 shadow-lg overflow-hidden max-w-xl mx-auto my-8">
      {title && (
        <div className="px-4 pt-4 pb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </div>
      )}
      <div className="aspect-video bg-black">
        <video
          src={src}
          controls
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          // 可选封面
        />
      </div>
    </div>
  );
}
