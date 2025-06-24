export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={`flex-grow`}>{children}</section>;
}
