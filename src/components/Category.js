const Category = ({ category, onBlur }) => {
  return (
    <div className="Category">
      <label className="CategoryTitle">{category.title}</label>
      <input
        type="text"
        onBlur={(e) => onBlur(e.target.value, category.id)}
      />
    </div>
  );
};

export default Category;
