import aboutData from '@/content/about.json';

export default function About() {
  return (
    <section id="sobre" className="py-20 px-6 md:px-12 bg-slate-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Placeholder */}
        <div className="aspect-square bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 shadow-inner">
          <span>{aboutData.photoAlt}</span>
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            {aboutData.heading}
          </h2>
          <p className="text-gray-600 text-lg mb-4">{aboutData.bio}</p>
          <ul className="space-y-3 mb-8">
            {aboutData.credentials.map((credential) => (
              <li key={credential} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
