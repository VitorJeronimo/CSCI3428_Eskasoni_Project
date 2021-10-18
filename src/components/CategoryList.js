import Category from './Category'

const CategoryList = ({ categories, onBlur }) => {
  return (
    <section className="CategoryList">
        {categories.map((category) => (
          <Category 
          key={category.id} 
          category={category}
          onBlur={onBlur}
          />
        ))}
    </section>
  );
};

export default CategoryList;
