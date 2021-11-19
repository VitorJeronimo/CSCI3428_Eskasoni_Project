const Category = ({ category, checkInput }) => {
  return (
    <div className="Category">
      <label className="CategoryTitle">{category.title}</label>
      <input
        type="text"
        onBlur={(e) => checkInput(e.target.value, category.id)}
      />
    </div>
  );
};

export default Category;
