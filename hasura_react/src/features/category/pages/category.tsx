interface CategoryScreenProps {
  category?: string
}

export const CategoryScreen = ({ category }: CategoryScreenProps) => {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold capitalize">
        {category || "All Categories"}
      </h1>
      <p className="text-gray-500">Showing top stories for {category}...</p>
      {/* Add Article Grid here based on category */}
    </div>
  )
}
