export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
    className={`flex-grow`}
  >
    {children}
  </div>
  );
}
