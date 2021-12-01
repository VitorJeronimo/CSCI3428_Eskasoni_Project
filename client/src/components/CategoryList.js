import Category from "./Category";

const CategoryList = ({ categories }) => {
  return (
    <section className="CategoryList">
      <div className="CategoriesContainer">
        {categories.map((category) => (
          <Category key={category.id} category={category}/>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
