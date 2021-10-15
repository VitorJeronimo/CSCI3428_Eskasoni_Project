import Category from './Category'

const CategoryList = ({ categories, setCategories }) => {
  return (
    <section className="CategoryList">
      <ul className="Categories">
        {categories.map(category => (
          <Category key={category.id} title={category.title} />
        ))}
      </ul>
    </section>
  );
}

export default CategoryList;