export default function HowItWorks() {
  return (
    <section className="py-16 px-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="font-bold text-xl">1️⃣ Choose</h3>
          <p>Select interview type.</p>
        </div>

        <div>
          <h3 className="font-bold text-xl">2️⃣ Practice</h3>
          <p>Talk with AI and solve problems.</p>
        </div>

        <div>
          <h3 className="font-bold text-xl">3️⃣ Improve</h3>
          <p>Receive detailed feedback.</p>
        </div>
      </div>
    </section>
  );
}