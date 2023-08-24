import "./styles.css";

export default function SeachInput({searchText, setSearchText}) {
  const handleUserInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <main className="search-main">
      <label for="search" className="label">
        Search by name
      </label>
      <input
        className="input"
        type="text"
        id="userInput"
        onChange={handleUserInputChange}
      />
    </main>
  );
}
