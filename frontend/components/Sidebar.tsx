const categories = [
    "Batteries",
    "Motor Oils",
    "Accessories",
    "Auto Parts",
    "Tools",
    "Car Care"
]

export default function Sidebar() {

    return (

        <aside
            className="
        w-[320px]
        bg-neutral-950
        border
        border-neutral-800
        p-8
        h-fit
      "
        >

            <h3
                className="
          text-2xl
          font-bold
          uppercase
          mb-8
        "
            >
                Catalog
            </h3>

            <div className="space-y-4">

                {categories.map(category => (

                    <button
                        key={category}
                        className="
              w-full
              text-left
              px-5
              py-4
              border
              border-neutral-800
              hover:border-red-600
              hover:bg-red-600/10
              transition
              uppercase
              text-sm
              tracking-wide
            "
                    >
                        {category}
                    </button>

                ))}

            </div>

            <div className="mt-12">

                <h4
                    className="
            text-xl
            font-bold
            mb-6
            uppercase
          "
                >
                    Price
                </h4>

                <input
                    type="range"
                    className="w-full"
                />

                <div
                    className="
            flex
            justify-between
            mt-4
            text-gray-400
          "
                >
                    <span>1000 ₽</span>
                    <span>10000 ₽</span>
                </div>

            </div>

            <button
                className="
          mt-10
          w-full
          bg-red-600
          hover:bg-red-700
          transition
          py-4
          uppercase
          font-bold
        "
            >
                Apply Filters
            </button>

        </aside>
    )
}