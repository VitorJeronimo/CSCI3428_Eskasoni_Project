import Category from "./Category";

const CategoryList = ({ categories, onBlur }) => {
  return (
    <section className="CategoryList">
      <div className="CategoriesContainer">
        {categories.map((category) => (
          <Category key={category.id} category={category} onBlur={onBlur} />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
