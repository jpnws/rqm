import { useEffect, useState } from 'react';

import QuoteBox from './QuoteBox';

import './App.css';

export default function App() {
  const [image, setImage] = useState({ loading: false, imageUrl: '' });

  const [quote, setQuote] = useState({
    loading: false,
    quote: '',
    author: '',
  });

  const [imageError, setImageError] = useState();
  const [quoteError, setQuoteError] = useState();

  const handleGetNewQuote = async () => {
    try {
      setQuote({ ...quote, loading: true });
      setTimeout(async () => {
        const resp = await fetch('https://api.quotable.io/random');
        const data = await resp.json();
        setQuote({ loading: false, quote: data.content, author: data.author });
      }, 1000);
    } catch (error) {
      setQuoteError(error);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        setImage((image) => {
          return { ...image, loading: true };
        });
        const resp = await fetch('https://picsum.photos/2840/2160?blur=1');
        setImage((image) => {
          return { ...image, loading: false, imageUrl: resp.url };
        });
      } catch (error) {
        setImageError(error);
      }
    };

    const getQuote = async () => {
      try {
        setQuote((quote) => {
          return {
            ...quote,
            loading: true,
          };
        });
        setTimeout(async () => {
          const resp = await fetch('https://api.quotable.io/random');
          const data = await resp.json();
          setQuote({
            loading: false,
            quote: data.content,
            author: data.author,
          });
        }, 1000);
      } catch (error) {
        setQuoteError(error);
      }
    };

    getImage();
    getQuote();
  }, []);

  if (imageError || quoteError) {
    console.log(imageError);
    console.log(quoteError);
  }

  let style;
  if (image.imageUrl) {
    style = {
      background: `url(${image.imageUrl})`,
    };
  }

  return (
    <div
      style={style}
      className="quote-container"
    >
      <div
        className="quote-box"
        id="quote-box"
      >
        <QuoteBox quote={quote} />
        <div className="quote-box-bottom">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            rel="noreferrer"
            href={
              quote.loading
                ? `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
                    `${quote.quote}-${quote.author}`
                  )}`
                : ''
            }
          >
            <img
              src="https://raw.githubusercontent.com/jiparkdev/random-quote-machine/master/icons8-twitter.svg"
              alt="Share via Twitter"
              className="quote-twitter"
            />
          </a>
          <button
            className="quote-button"
            id="new-quote"
            onClick={handleGetNewQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}
