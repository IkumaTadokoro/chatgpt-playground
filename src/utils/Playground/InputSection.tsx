export default function InputSection({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <section className="flex flex-col gap-y-4">
      <h3 className="font-bold text-zinc-300">入力</h3>
      {children}
    </section>
  );
}
