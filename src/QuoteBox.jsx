import PropTypes from 'prop-types';

export default function QuoteBox({ quote }) {
  if (quote.loading) {
    return (
      <div className="quote-box-top">
        <p className="quote-loading">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="quote-box-top">
        <p
          className="quote-text"
          id="text"
        >
          {`"${quote.quote}"`}
        </p>
        <p
          className="quote-author"
          id="author"
        >
          {quote.author}
        </p>
      </div>
    );
  }
}

QuoteBox.propTypes = {
  quote: PropTypes.object,
};
