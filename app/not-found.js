import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band wrap">
      <h2>Project not found</h2>
      <p><Link href="/#projects">Back to projects</Link></p>
    </section>
  );
}
