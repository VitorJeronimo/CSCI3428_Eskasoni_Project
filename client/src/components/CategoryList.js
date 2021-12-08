// Author: Vitor Jeronimo (A00431599)

import Category from "./Category";

const CategoryList = ({ categories, setCategoryValue }) => {

  return (
    <section className="CategoryList">
      <div className="CategoriesContainer">
        {categories.map((category) => (
          <Category key={category.id} category={category} setCategoryValue={setCategoryValue}/>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
