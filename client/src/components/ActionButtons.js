const ActionButtons = ({onClick}) => {
  return (
    <section className="ActionButtons">
      <button className="btn" onClick={onClick}>New character</button>
      <button className="btn">New List</button>
    </section>
  );
}

export default ActionButtons;
