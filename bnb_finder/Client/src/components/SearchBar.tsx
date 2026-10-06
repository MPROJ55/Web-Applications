type SearchBarProps = {
  location: string;
  guests: number;

  onLocationChange: (location: string) => void;
  onGuestsChange: (guests: number) => void;
  onSearch: () => void;
};

function SearchBar({
  location,
  guests,
  onLocationChange,
  onGuestsChange,
  onSearch,
}: SearchBarProps) {
  return (
    <header className="header">
      <div className="brand">
        Open B
      </div>

      <div className="search-bar">
        <div className="search-field">
          <label htmlFor="location">
            Where?
          </label>

          <input
            id="location"
            type="text"
            placeholder="Washington, DC"
            value={location}
            onChange={(event) =>
              onLocationChange(
                event.target.value
              )
            }
          />
        </div>

        <div className="search-field">
          <label htmlFor="check-in">
            Check in
          </label>

          <input
            id="check-in"
            type="date"
          />
        </div>

        <div className="search-field">
          <label htmlFor="check-out">
            Check out
          </label>

          <input
            id="check-out"
            type="date"
          />
        </div>

        <div className="search-field guests">
          <label htmlFor="guests">
            Guests
          </label>

          <input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(event) => {
              const value = Number(
                event.target.value
              );

              onGuestsChange(
                Math.min(
                  10,
                  Math.max(1, value)
                )
              );
            }}
          />
        </div>

        <button
          className="search-button"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </header>
  );
}

export default SearchBar;