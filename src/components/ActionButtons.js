const ActionButtons = ({onClick}) => {
  return (
    <section className="ActionButtons">
      <button onClick={onClick}>New character</button>
      <button>New List</button>
    </section>
  );
}

export default ActionButtons;