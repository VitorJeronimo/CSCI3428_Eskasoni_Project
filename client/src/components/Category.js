const Category = ({ category }) => {
  return (
    <div className="Category">
      <label className="CategoryTitle">{category.title}</label>
      <input type="text"/>
    </div>
  );
};

export default Category;
