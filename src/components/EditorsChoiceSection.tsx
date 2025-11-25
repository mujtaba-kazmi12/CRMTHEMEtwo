interface ChoiceItem {
  category: string
  title: string
}

interface EditorColumn {
  name: string
  items: ChoiceItem[]
}

const editors: EditorColumn[] = [
  {
    name: "Samuel Paradise",
    items: [
      { category: "Strategy", title: "Now is the Time to Think About Your Small-Business Success" },
      { category: "Marketing", title: "How Mary Reagan Gave Glamour and Class to the Elites Society" },
      { category: "Finance", title: "Things to Look For in a Financial Trading Platform Environment" },
      { category: "Politics", title: "Sanders Gets Respectful Welcome at Conservative College" },
      { category: "Music", title: "Burberry is the First Brand to get an Apple Music Channel Line" }
    ]
  },
  {
    name: "Manuela Cole",
    items: [
      { category: "Food", title: "Best Places to Get Your Mexican Food Fix When You Visit Mexico City" },
      { category: "Travel", title: "The Cliffs of Moher Reach 1 Million Visitors Every Year Since 2014" },
      { category: "Weird", title: "Silicon Valley Stunned by the Fulminant Slashed Investments" },
      { category: "Celebrity", title: "The Most Popular Celebrity Name List of the Millennium is Here" },
      { category: "Politics", title: "Sanders Gets Respectful Welcome at Conservative College" }
    ]
  },
  {
    name: "Keisha Adams",
    items: [
      { category: "Weird", title: "Watch Awesome Kate Halle Go Full Wiming Pro in the Bahamas" },
      { category: "Finance", title: "The Secret to Your Company's Financial Health is Very Important" },
      { category: "Celebrity", title: "Fashion Finder: Biggest Shows, Parties and Celebrity for New Years" },
      { category: "Music", title: "For Composer Drew Silva, Music is All About Embracing Life" },
      { category: "Politics", title: "New Presidential Candidates Presented in Just a Few Minutes" }
    ]
  },
  {
    name: "George Pharell",
    items: [
      { category: "Marketing", title: "Entrepreneurial Advertising: The Future Of Marketing" },
      { category: "Finance", title: "A Look at How Social Media & Mobile Gaming Can Increase Sales" },
      { category: "Politics", title: "Things You Didn't Know About the American Past Politicians" },
      { category: "Music", title: "Pixar Brings it's Animated Movies to Life with Studio Music" },
      { category: "Celebrity", title: "The Biggest Hollywood Celebrities Visit the Ranches of California" }
    ]
  }
]

function EditorCard({ editor }: { editor: EditorColumn }) {
  return (
    <div className="px-6 py-8 bg-transparent">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200" />
        <h3 className="mt-4 text-xl font-semibold text-slate-800">{editor.name}</h3>
        <div className="mt-3 h-[2px] w-28 bg-red-500" />
      </div>

      {/* Items */}
      <ul className="mt-6 space-y-4">
        {editor.items.map((item, idx) => (
          <li key={idx}>
            <div className="grid grid-cols-[1fr_72px] items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-red-600">{item.category}</p>
                <p className="text-sm leading-snug text-slate-900">{item.title}</p>
              </div>
              {/* Thumbnail placeholder */}
              <div className="w-18 h-16 bg-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function EditorsChoiceSection() {
  return (
    <section className="bg-[#FAF6F4]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-6">
          <div className="hidden md:block h-[2px] w-64 bg-red-500" />
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Editor’s choice</h2>
          <div className="hidden md:block h-[2px] w-64 bg-red-500" />
        </div>

        {/* Columns */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-slate-200">
          {editors.map((e, i) => (
            <EditorCard key={i} editor={e} />
          ))}
        </div>
      </div>
    </section>
  )
}