import './AsyncState.css';

// Wraps the loading / error / empty / loaded states every data-backed screen
// needs. The wireframes only show "loaded" — this is what fills the other three.
export default function AsyncState({ loading, error, isEmpty, emptyLabel, onRetry, children }) {
  if (loading) {
    return (
      <div className="async-state">
        <div className="spinner" aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="async-state async-state-error">
        <p>Couldn't load this. {error.message || 'Something went wrong.'}</p>
        {onRetry && (
          <button className="btn-retry" onClick={onRetry}>Try again</button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="async-state async-state-empty">
        <p>{emptyLabel || 'Nothing here yet.'}</p>
      </div>
    );
  }

  return children;
}
