const CategoryList = ({ categories, setCategories, initialLetter }) => {
  /**
   * Checks if the word given by the user is a valid answer to the category.
   * Initially, it only checks if the word starts with the chosen initial letter.
   * @param {blur} e Information about the event that triggered the function.
   */
  const checkInput = (e) => {
    const userInput = e.target.value;

    // If the input is not empty, check if the first letter of the input is
    // the chosen letter.
    if (userInput !== "") {
      if (userInput[0].toLowerCase() === initialLetter.toLowerCase()) {
        console.log("Valid");

        const thisId = e.target.id - 1;
        console.log(categories[thisId])
      } else {
        console.log("Not valid");
      }
    }
  };

  return (
    <section className="CategoryList">
      <form className="Categories">
        {categories.map((category) => (
          <div className="Category" key={category.id}>
            <label className="CategoryTitle">{category.title}</label>
            <input
              type="text"
              id={category.id}
              name={category.title}
              onBlur={checkInput}
            />
          </div>
        ))}
      </form>
    </section>
  );
};

export default CategoryList;
