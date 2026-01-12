// src/components/TweetRotatorAOS.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const defaultTweets = [
  {
    id: 1,
    author: 'Movers',
    handle: '@yourcompany',
    content:
      'Need a reliable move? Book online in minutes — choose full-service packing or DIY options. Free quote: https://yourcompany.com/quote',
    time: '2 days ago',
  },
  {
    id: 2,
    author: 'Movers',
    handle: '@yourcompany',
    content:
      "Packing tip: label boxes by room and keep an 'open first' box for essentials — it makes settling in a breeze.",
    time: '3 days ago',
  },
  {
    id: 3,
    author: 'Movers',
    handle: '@yourcompany',
    content:
      'We handle pianos, safes, and antiques with specialized care. Ask about on-site assessments and insurance options.',
    time: '5 days ago',
  },
];

export default function TweetRotatorAOS({
  tweets = defaultTweets,
  interval = 6000,
  pauseOnHover = true,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // init AOS once
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false, // allow repeated animations on re-insert
      mirror: false,
    });
  }, []);

  // refresh AOS when index changes so the newly-mounted tweet text animates
  useEffect(() => {
    // small timeout to let DOM update then refresh AOS
    const t = setTimeout(() => {
      AOS.refresh();
    }, 40);
    return () => clearTimeout(t);
  }, [index]);

  // auto-advance
  useEffect(() => {
    if (paused || tweets.length <= 1) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % tweets.length);
    }, interval);
    return () => clearTimeout(id);
  }, [index, paused, tweets.length, interval]);

  const tweet = tweets[index];

  return (
    <section
      // container animates on scroll/mount
      data-aos="fade-up"
      data-aos-duration="850"
      className="w-full"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      style={{
        background: 'var(--color-primary, #f7b500)',
        color: 'var(--color-dark, #192338)',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-8 flex items-start gap-6">
        {/* left twitter icon + divider */}
        <div className="flex-none pr-6 border-r border-[rgba(0,0,0,0.06)]">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-transparent">
            <svg
              className="w-10 h-10 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.14 12.14 0 0 1 3.1 4.7a4.28 4.28 0 0 0 1.32 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.29 4.29 0 0 0 3.43 4.2c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.12 12.12 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0 0 22.46 6z" />
            </svg>
          </div>
        </div>

        {/* content */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-white">{tweet.author}</h4>
            <div className="text-xs text-[rgba(0,0,0,0.45)]">{tweet.handle}</div>
          </div>

          {/* the tweet text itself is keyed and has AOS fade-left so it animates on each change */}
          <div
            key={`${tweet.id}-${index}`}
            data-aos="fade-left"
            data-aos-duration="650"
            data-aos-delay="60"
            aria-live="polite"
            className="mt-3 text-base leading-relaxed text-white"
          >
            {tweet.content}
          </div>

          <div className="mt-3 text-xs text-[rgba(0,0,0,0.55)]">{tweet.time}</div>
        </div>
      </div>
    </section>
  );
}