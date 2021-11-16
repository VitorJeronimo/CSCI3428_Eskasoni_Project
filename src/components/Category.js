const Category = ({ category, onBlur }) => {
  function getData(val) {
    if (val.target.value === "~") {
      val.target.value = "ɨ";
    }
  }

  return (
    <div className="Category">
      <label className="CategoryTitle">{category.title}</label>
      <input
        type="text"
        onInput={getData}
        onBlur={(e) => onBlur(e.target.value, category.id)}
      />
    </div>
  );
};

export default Category;
