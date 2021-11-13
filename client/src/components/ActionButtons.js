const ActionButtons = ({ handleNewCharacter }) => {
  return (
    <section className="ActionButtons">
      <button className="btn" onClick={handleNewCharacter}>New character</button>
      <button className="btn">New List</button>
    </section>
  );
}

export default ActionButtons;
