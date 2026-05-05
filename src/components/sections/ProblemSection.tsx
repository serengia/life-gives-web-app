import RevealOnScroll from "@/components/RevealOnScroll";

const painPoints = [
  {
    icon: "😤",
    title: "You start strong, then fade",
    body: "Every January feels the same. Big goals, great energy, gone by February.",
  },
  {
    icon: "🔄",
    title: "You're busy but not progressing",
    body: "You're constantly doing things, but at the end of the week, nothing important moved.",
  },
  {
    icon: "📋",
    title: "You plan but don't execute",
    body: "You have notebooks full of goals and vision boards that collect dust.",
  },
  {
    icon: "🌀",
    title: "You feel stuck in the same patterns",
    body: "Same money problems. Same relationship issues. Same career ceiling. Year after year.",
  },
  {
    icon: "💭",
    title: "You know what to do but don't do it",
    body: "The information isn't the problem. The execution gap is.",
  },
  {
    icon: "🎯",
    title: "You want more but don't know where to start",
    body: "Not just success — a life that actually feels meaningful and intentional.",
  },
] as const;

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-light py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Does this sound familiar?
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl">
            You work hard. You set goals. But nothing seems to change.
          </h2>
          <p className="mt-5 max-w-2xl text-balance text-slate-600 md:mx-auto">
            You&apos;re not lazy. You&apos;re not broken. You just haven&apos;t
            had a system that actually works.
          </p>
        </RevealOnScroll>

        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          {painPoints.map((item) => (
            <li key={item.title}>
              <article className="h-full rounded-xl border-l-4 border-amber-600 bg-white p-6 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-3 text-2xl" aria-hidden>
                  {item.icon}
                </div>
                <h3 className="font-body text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600">{item.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center text-center md:mt-16">
          <p className="max-w-2xl font-heading text-xl italic text-navy md:text-2xl">
            This book doesn&apos;t just inspire you. It gives you the system.
          </p>
          <div className="mt-6 flex flex-col items-center gap-1 text-amber-600">
            <span
              className="h-px w-12 bg-amber-600/60"
              aria-hidden
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
