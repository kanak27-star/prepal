export default function Categories() {
  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Interview Categories
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {["DSA","SQL","React","Node.js","HR","System Design"].map((item)=>(
          <div
            key={item}
            className="px-6 py-3 rounded-xl bg-indigo-100 font-semibold"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}