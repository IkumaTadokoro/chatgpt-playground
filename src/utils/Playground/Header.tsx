export default function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section>
      <h2 className="font-bold text-xl text-zinc-300">{title}</h2>
      <p className="text-sm my-4 text-zinc-400">{description}</p>
    </section>
  );
}
