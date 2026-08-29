import teamList from '@/content/team.json';

export default function Team() {
  return (
    <section id="equipe" className="py-20 px-6 md:px-12 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Nossa Equipe
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Profissionais dedicados a defender o seu direito previdenciário.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamList.map((member) => (
            <div key={member.id} className="text-center">
              <div className="aspect-square bg-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400 shadow-inner mb-4">
                <span className="text-sm px-4">{member.photoAlt}</span>
              </div>
              <h3 className="font-bold text-brand-primary">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
