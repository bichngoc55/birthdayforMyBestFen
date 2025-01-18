import React, { useState, useRef, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import quy from "./assets/quy.jpg";
const quotesData = {
  happiness: [
    "Joy is the simplest form of gratitude.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "The greatest happiness of life is the conviction that we are loved.",
    "For every minute you are angry you lose sixty seconds of happiness.",
    "Happiness is a warm puppy.",
    "The secret of happiness is freedom, the secret of freedom is courage.",
    "Count your age by friends, not years. Count your life by smiles, not tears.",
    "The most important thing is to enjoy your life—to be happy—it's all that matters.",
    "Happiness is not a destination, it's a journey.",
    "The purpose of our lives is to be happy.",
    "Happiness is the best makeup.",
    "Happy people plan actions, they don't plan results.",
    "The happiness of your life depends upon the quality of your thoughts.",
    "Happiness is not something you postpone for the future.",
    "The only joy in the world is to begin.",
    "Happiness is having a large, loving, caring, close-knit family in another city.",
    "The greatest happiness is to scatter your enemy and drive him before you.",
    "Happiness is a choice that requires effort at times.",
    "The key to being happy is knowing you have the power to choose what to accept.",
    "Happiness is a state of mind. It's just according to the way you look at things.",
  ],
  sadness: [
    "Even the darkest night will end and the sun will rise.",
    "Behind every cloud is another cloud.",
    "Tears come from the heart and not from the brain.",
    "The good life is not one immune to sadness.",
    "Sadness flies away on the wings of time.",
    "Sadness is but a wall between two gardens.",
    "The walls we build around us to keep sadness out also keeps out the joy.",
    "Some days are just bad days, that's all.",
    "Every human walks around with a certain kind of sadness.",
    "The word 'happy' would lose its meaning if it were not balanced by sadness.",
    "Sadness gives depth. Happiness gives height.",
    "Life is sad. Everything ends.",
    "First, accept sadness. Realize that without losing, winning isn't so great.",
    "Our sweetest songs are those that tell of saddest thought.",
    "The longer and more carefully we look at a funny story, the sadder it becomes.",
    "Experiencing sadness and anger can make you feel more creative.",
    "Every person has a secret sorrow which the world knows not.",
    "The heart will break, but broken live on.",
    "There are moments when I wish I could roll back the clock.",
    "Some people are just not meant to be in our lives forever.",
  ],
  awkward: [
    "Life is full of awkward moments, embrace them!",
    "Sometimes the most memorable moments are the most awkward ones.",
    "In every awkward situation lies a funny story waiting to be told.",
    "Awkwardness is just unprocessed charm.",
    "Life would be boring without those awkward moments.",
    "Embrace the awkward, it makes you unique.",
    "Sometimes silence is more awkward than words.",
    "The best stories start with awkward moments.",
    "Awkward moments create the best memories.",
    "When in doubt, laugh it off.",
    "Life is too short to worry about awkward moments.",
    "Sometimes the most awkward situations lead to the best friendships.",
    "Awkwardness is just personality in beta testing.",
    "Every awkward moment is a chance to learn something new.",
    "The best people are the ones who make awkward look cute.",
    "Life's too short to pretend you're not awkward.",
    "Awkward moments are just life's way of testing your sense of humor.",
    "Behind every confident person is a collection of awkward moments.",
    "Sometimes the most awkward situations bring out the best in people.",
    "Embrace the awkward, it's what makes you real.",
  ],
  depressed: [
    "Even the darkest hour has only 60 minutes.",
    "You are stronger than you know.",
    "This too shall pass.",
    "Every storm runs out of rain.",
    "The sun will rise and we will try again.",
    "Your present situation is not your final destination.",
    "Life doesn't get easier, you just get stronger.",
    "Sometimes the bad things that happen in our lives put us directly on the path to the best things.",
    "Rock bottom became the solid foundation on which I rebuilt my life.",
    "Hope is a powerful thing. Some say it's a different breed of magic altogether.",
    "What seems to us as bitter trials are often blessings in disguise.",
    "The only way out is through.",
    "You are not alone in this journey.",
    "Small steps are still progress.",
    "Your story isn't over yet.",
    "Sometimes we need the dark to see the stars.",
    "You have survived 100% of your worst days.",
    "Recovery is not one and done. It happens in bits and pieces.",
    "The comeback is always stronger than the setback.",
    "Every day is a new beginning.",
  ],
  normal: [
    "Life is what happens while you're busy making other plans.",
    "The best thing about being normal is the meeting in the middle.",
    "Normal is not something to aspire to, it's something to get away from.",
    "What's normal anyways?",
    "Be yourself, everyone else is already taken.",
    "Life is too short to be normal.",
    "Normal is boring, be weird!",
    "The only normal people are the ones you don't know very well.",
    "There's no such thing as normal, there's just you.",
    "Normal is just a setting on the washing machine.",
    "Life is a journey, not a destination.",
    "The best kind of weird is your kind of weird.",
    "Embrace your quirks, they make you who you are.",
    "Why fit in when you were born to stand out?",
    "Being normal is vastly overrated.",
    "Normal is an illusion. What is normal for the spider is chaos for the fly.",
    "The only way to be truly satisfied is to do what you believe is great work.",
    "Don't be normal, be you.",
    "Life isn't about finding yourself, it's about creating yourself.",
    "The road to success is always under construction.",
  ],
  shy: [
    "Quiet people have the loudest minds.",
    "Sometimes the quietest people have the most to say.",
    "Being shy is not a bad thing, it just means you're selective with your energy.",
    "Shyness is a gift, it allows you to observe and understand.",
    "Behind every shy person is an awesome person you wish you knew.",
    "The flower that blooms in adversity is the most rare and beautiful of all.",
    "Don't underestimate the quiet ones.",
    "Shyness is not a character flaw, it's just a different way of experiencing the world.",
    "Sometimes the bravest thing you can do is just show up.",
    "Being shy means being sensitive enough to know what really matters.",
    "The shy ones are often the most interesting once you get to know them.",
    "Your silence speaks volumes.",
    "Shyness is only the beginning of a beautiful journey of self-discovery.",
    "The best things in life are worth waiting for.",
    "Don't let shyness hold you back from being awesome.",
    "Being shy doesn't mean you're not confident.",
    "Some of the best people are the ones who don't say much.",
    "Take your time, the world will wait.",
    "There's strength in being gentle.",
    "The quieter you become, the more you can hear.",
  ],
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f3e7ff, #ffe7f3)",
    padding: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "3rem",
    color: "#553c9a",
  },
  bottleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "1rem",
  },
  bottleCard: {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  },
  // bottle: {
  //   position: "relative",
  //   height: "160px",
  //   width: "80px",
  //   margin: "0 auto",
  // },
  bottleShape: {
    position: "absolute",
    inset: 0,
    background: "#e6f3ff",
    borderRadius: "12px",
    border: "2px solid #93c5fd",
  },
  water: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: "#60a5fa",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    transition: "height 0.5s ease",
  },
  emotionLabel: {
    textAlign: "center",
    marginTop: "1rem",
    textTransform: "capitalize",
    fontWeight: "500",
    color: "#5b21b6",
  },
  quotesContainer: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f3e7ff, #ffe7f3)",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteCard: {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "90%",
    textAlign: "center",
  },
  fortuneCookie: {
    width: "128px",
    height: "128px",
    margin: "0 auto 1.5rem auto",
  },
  quote: {
    fontSize: "1.25rem",
    fontWeight: "500",
    color: "#553c9a",
    marginBottom: "2rem",
  },
  button: {
    background: "#7c3aed",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  bottle: {
    position: "relative",
    height: "200px",
    width: "180px",
    margin: "0 auto",
  },
  scratchCard: {
    position: "relative",
    width: "300px",
    height: "200px",
    margin: "2rem auto",
    borderRadius: "8px",
    overflow: "hidden",
  },
  scratchCanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    cursor: "crosshair",
  },
  quoteText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    textAlign: "center",
    color: "#553c9a",
    fontSize: "1.1rem",
    lineHeight: "1.5",
  },
  playerContainer: {
    marginTop: "2rem",
    width: "100%",
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  songTitle: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.2rem",
    color: "#553c9a",
  },
  playerWrapper: {
    position: "relative",
    paddingTop: "56.25%",
  },
};

const emotionSongs = {
  happiness: [
    {
      url: "https://www.youtube.com/watch?v=lMKfZwnHzig&list=RDMM&index=8",
      title: "Happy Song 1",
    },
    {
      url: "https://www.youtube.com/watch?v=v6sTjHZbVD0",
      title: "Happy Song 2",
    },
    {
      url: "https://www.youtube.com/watch?v=iY4kQLVmfpY&list=RDGMEMPdLDZ-FVVWuzckFEguTm5QVMiY4kQLVmfpY&start_radio=1&rv=v6sTjHZbVD0",
      title: "Happy Song 3",
    },
    {
      url: "https://www.youtube.com/watch?v=_OP5G_YawL4",
      title: "Happy Song 4",
    },

    {
      url: "https://www.youtube.com/watch?v=6Q5xqNkCk7w",
      title: "Happy Song 5",
    },

    {
      url: "https://www.youtube.com/watch?v=O7cPItnfRNY",
      title: "Happy Song 6",
    },

    {
      url: "https://www.youtube.com/watch?v=08hiSR9_hBM",
      title: "Happy Song 7",
    },

    {
      url: "https://www.youtube.com/watch?v=Kzx_s6NTGAM",
      title: "Happy Song 8",
    },

    {
      url: "https://www.youtube.com/watch?v=LZN4I3K8SC0",
      title: "Happy Song 9",
    },

    {
      url: "https://www.youtube.com/watch?v=B0c8pqCdp58",
      title: "Happy Song 10",
    },
  ],
  sadness: [
    {
      url: "https://www.youtube.com/watch?v=2SYwkOL_6ag",
      title: "Sad Song 1",
    },
    {
      url: "https://www.youtube.com/watch?v=I16KdDTQGTc&list=RDI16KdDTQGTc&start_radio=1&rv=2SYwkOL_6ag",
      title: "Sad Song 2",
    },
    {
      url: "https://www.youtube.com/watch?v=OmmbiyE-d4Q&list=RDI16KdDTQGTc&index=26",
      title: "Sad Song 3",
    },
    {
      url: "https://www.youtube.com/watch?v=GCWl50HQZIM&list=RDMM&index=2",
      title: "Sad Song 4",
    },

    { url: "https://youtu.be/w8r5zDA4awM?t=127", title: "Sad Song 5" },

    {
      url: "https://www.youtube.com/watch?v=pmRJzHgg-Nw",
      title: "Sad Song 6",
    },

    {
      url: "https://www.youtube.com/watch?v=KlxdWb2bcSA",
      title: "Sad Song 7",
    },

    {
      url: "https://www.youtube.com/watch?v=By8Iv_TpxCI",
      title: "Sad Song 8",
    },

    {
      url: "https://www.youtube.com/watch?v=S_E2EHVxNAE",
      title: "Sad Song 9",
    },

    {
      url: "https://www.youtube.com/watch?v=WJK8486VjfU&list=RDMM&start_radio=1&rv=S_E2EHVxNAE",
      title: "Sad Song 10",
    },
  ],
  awkward: [
    {
      url: "https://www.youtube.com/watch?v=etc4jLhWAa0",
      title: "Awkward Song 1",
    },
    {
      url: "https://www.youtube.com/watch?v=Dpl2rOq18EU",
      title: "Awkward Song 2",
    },
    {
      url: "https://www.youtube.com/watch?v=GH1STTWR4Sw",
      title: "Awkward Song 3",
    },
    {
      url: "https://www.youtube.com/watch?v=B7Y4LHbpXv0",
      title: "Awkward Song 4",
    },
    {
      url: "https://www.youtube.com/watch?v=sr8FdaeMuIo",
      title: "Awkward Song 5",
    },
    {
      url: "https://www.youtube.com/watch?v=KtlgYxa6BMU",
      title: "Awkward Song 6",
    },
    {
      url: "https://www.youtube.com/watch?v=UzKdy75GqXQ",
      title: "Awkward Song 7",
    },
    {
      url: "https://www.youtube.com/watch?v=98zHKN-xSHk",
      title: "Awkward Song 8",
    },
    {
      url: "https://www.youtube.com/watch?v=_jEP347F6_g",
      title: "Awkward Song 9",
    },
    {
      url: "https://www.youtube.com/watch?v=AdBzzpq3xV4",
      title: "Awkward Song 10",
    },
  ],
  depressed: [
    {
      url: "https://www.youtube.com/watch?v=DvKGTYotSew",
      title: "Depressed Song 1",
    },
    {
      url: "https://www.youtube.com/watch?v=ovExasFv7Nw",
      title: "Depressed Song 2",
    },
    {
      url: "https://www.youtube.com/watch?v=FvOpPeKSf_4",
      title: "Depressed Song 3",
    },
    {
      url: "https://www.youtube.com/watch?v=pZ1NdE69VTs",
      title: "Depressed Song 4",
    },
    {
      url: "https://www.youtube.com/watch?v=vVhKA9Av6vA",
      title: "Depressed Song 5",
    },
    {
      url: "https://www.youtube.com/watch?v=ON6IkGCH7e4",
      title: "Depressed Song 6",
    },
    {
      url: "https://www.youtube.com/watch?v=IQKM7Rh4b58",
      title: "Depressed Song 7",
    },
    {
      url: "https://www.youtube.com/watch?v=f61MT6yxaiM",
      title: "Depressed Song 8",
    },
    {
      url: "https://www.youtube.com/watch?v=Jy-dLvnJaw8",
      title: "Depressed Song 9",
    },
    {
      url: "https://www.youtube.com/watch?v=3XqqkrJENB4",
      title: "Depressed Song 10",
    },
  ],
  normal: [
    {
      url: "https://www.youtube.com/watch?v=aXuYQ9v_j9M",
      title: "Normal Song 1",
    },
    {
      url: "https://www.youtube.com/watch?v=lFnR-K5n_dM",
      title: "Normal Song 2",
    },
    {
      url: "https://www.youtube.com/watch?v=gD868L5k0L8",
      title: "Normal Song 3",
    },
    {
      url: "https://www.youtube.com/watch?v=5MAJ1ZtXjyo",
      title: "Normal Song 4",
    },
    {
      url: "https://www.youtube.com/watch?v=vTJdVE_gjI0",
      title: "Normal Song 5",
    },
    {
      url: "https://www.youtube.com/watch?v=zEWSSod0zTY",
      title: "Normal Song 6",
    },
    {
      url: "https://youtu.be/ZqDBgYPpUTg?t=12",
      title: "Normal Song 7",
    },
    {
      url: "https://www.youtube.com/watch?v=R0jbjEX0dBY",
      title: "Normal Song 8",
    },
    {
      url: "https://www.youtube.com/watch?v=GIDoQsQyS0s",
      title: "Normal Song 9",
    },
    {
      url: "https://www.youtube.com/watch?v=eI4Mlp9JGsQ",
      title: "Normal Song 10",
    },
  ],
  shy: [
    {
      url: "https://www.youtube.com/watch?v=7NrvCoFyzpI",
      title: "Shy Song 1",
    },
    {
      url: "https://www.youtube.com/watch?v=uKxyLmbOc0Q",
      title: "Shy Song 2",
    },
    {
      url: "https://www.youtube.com/watch?v=VI47bTJaMe4",
      title: "Shy Song 3",
    },
    {
      url: "https://www.youtube.com/watch?v=Jbl_7LQudeI",
      title: "Shy Song 4",
    },
    {
      url: "https://www.youtube.com/watch?v=mZF9BRZkTDQ",
      title: "Shy Song 5",
    },
    {
      url: "https://youtu.be/XFVNxCs97ys?t=18",
      title: "Shy Song 6",
    },
    {
      url: "https://www.youtube.com/watch?v=x9qQujBVXAo",
      title: "Shy Song 7",
    },
    {
      url: "https://www.youtube.com/watch?v=Y3kkGR1IvCI",
      title: "Shy Song 8",
    },
    {
      url: "https://www.youtube.com/watch?v=vSTGNuZvnmc",
      title: "Shy Song 9",
    },
    {
      url: "https://www.youtube.com/watch?v=hwjG7Af1Do0",
      title: "Shy Song 10",
    },
  ],
};
const Bottle = ({ fillPercentage, color }) => (
  <svg viewBox="0 0 180 300" style={{ width: "100%", height: "100%" }}>
    {/* Bottle cap */}
    <path
      d="M73 0 
         L73 15 
         C73 20, 70 22, 70 25 
         L110 25
         C110 22, 107 20, 107 15
         L107 0"
      fill="#0051ba"
      stroke="#003c8a"
      strokeWidth="1"
    />

    {/* Bottle neck */}
    <path
      d="M70 25
         L70 50
         L110 50
         L110 25"
      fill="#e6f3ff"
      stroke="#cce4ff"
      strokeWidth="1"
    />

    {/* Bottle body - main container */}
    <path
      d="M40 50
         C40 45, 140 45, 140 50
         L140 270
         C140 285, 40 285, 40 270
         Z"
      fill="#e6f3ff"
      stroke="#cce4ff"
      strokeWidth="1"
    />

    {/* Ridges on bottle - decorative lines */}
    {[...Array(10)].map((_, i) => (
      <path
        key={i}
        d={`M40 ${80 + i * 20}
            C40 ${75 + i * 20}, 140 ${75 + i * 20}, 140 ${80 + i * 20}
            C140 ${85 + i * 20}, 40 ${85 + i * 20}, 40 ${80 + i * 20}`}
        fill="none"
        stroke="#cce4ff"
        strokeWidth="1"
      />
    ))}

    {/* Water fill */}
    <path
      d={`M40 ${300 - fillPercentage * 2.2}
          C40 ${285 - fillPercentage * 2.2},
            140 ${285 - fillPercentage * 2.2},
            140 ${300 - fillPercentage * 2.2}
          L140 270
          C140 285, 40 285, 40 270
          Z`}
      fill={color}
      opacity="0.8"
    >
      <animate
        attributeName="d"
        dur="4s"
        repeatCount="indefinite"
        values={`
          M40 ${300 - fillPercentage * 2.2}
          C40 ${285 - fillPercentage * 2.2},
            140 ${285 - fillPercentage * 2.2},
            140 ${300 - fillPercentage * 2.2}
          L140 270
          C140 285, 40 285, 40 270
          Z;

          M40 ${298 - fillPercentage * 2.2}
          C40 ${283 - fillPercentage * 2.2},
            140 ${287 - fillPercentage * 2.2},
            140 ${298 - fillPercentage * 2.2}
          L140 270
          C140 285, 40 285, 40 270
          Z;

          M40 ${300 - fillPercentage * 2.2}
          C40 ${285 - fillPercentage * 2.2},
            140 ${285 - fillPercentage * 2.2},
            140 ${300 - fillPercentage * 2.2}
          L140 270
          C140 285, 40 285, 40 270
          Z
        `}
      />
    </path>

    {/* Bottle shine effect */}
    <path d="M60 60 L62 270" stroke="white" strokeWidth="3" opacity="0.3" />
    <path d="M100 60 L102 270" stroke="white" strokeWidth="2" opacity="0.2" />
  </svg>
);
const MusicPlayer = ({ emotion }) => {
  const [currentSong, setCurrentSong] = useState(() => {
    const songs = emotionSongs[emotion] || [];
    return songs[Math.floor(Math.random() * songs.length)];
  });

  const getRandomSong = () => {
    const songs = emotionSongs[emotion] || [];
    const newSong = songs[Math.floor(Math.random() * songs.length)];
    setCurrentSong(newSong);
  };

  return (
    <div style={styles.playerContainer}>
      <h3 style={styles.songTitle}>{currentSong.title}</h3>
      <div style={styles.playerWrapper}>
        <ReactPlayer
          url={currentSong.url}
          width="100%"
          height="100%"
          playing={true}
          style={{ position: "absolute", top: 0, left: 0 }}
          // controls={true}
          onEnded={getRandomSong}
        />
      </div>
      <button
        style={styles.button}
        onClick={getRandomSong}
        className="mt-4 w-full"
      >
        Play Another Song
      </button>
    </div>
  );
};
const ScratchCard = ({ quote, onRevealed }) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fill with scratch-off color
    ctx.fillStyle = "#282C34";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const calculatePercentageScratched = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparentPixels++;
    }

    return (transparentPixels / (canvas.width * canvas.height)) * 100;
  };

  const scratch = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    lastPosition.current = { x, y };

    if (calculatePercentageScratched() > 50 && !isRevealed) {
      setIsRevealed(true);
      onRevealed();
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div style={styles.scratchCard}>
      <div style={styles.quoteText}>{quote}</div>
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        style={styles.scratchCanvas}
        onMouseDown={startDrawing}
        onMouseMove={scratch}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={scratch}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
};
const Home = () => {
  const navigate = useNavigate();
  const [bottleStates, setBottleStates] = useState(() => {
    const savedStates = localStorage.getItem("bottleStates");
    return savedStates
      ? JSON.parse(savedStates)
      : {
          happiness: 0,
          sadness: 0,
          awkward: 0,
          depressed: 0,
          normal: 0,
          shy: 0,
        };
  });

  const getBottleColor = (emotion) => {
    const colors = {
      happiness: "#FCD34D",
      sadness: "#60A5FA",
      awkward: "#F472B6",
      depressed: "#818CF8",
      normal: "#34D399",
      shy: "#F87171",
    };
    return colors[emotion] || "#60A5FA";
  };

  const handleBottleClick = (emotion) => {
    const newStates = {
      ...bottleStates,
      [emotion]: bottleStates[emotion] + 1,
    };
    setBottleStates(newStates);
    localStorage.setItem("bottleStates", JSON.stringify(newStates));
    navigate(`/quotes/${emotion}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Happy Birthday! 🎉</h1>
      <img
        src={quy}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "400px",
          display: "block",
          margin: "10 auto",
        }}
      />
      <div style={styles.bottleGrid}>
        {Object.keys(bottleStates).map((emotion) => (
          <motion.div
            key={emotion}
            whileHover={{ scale: 1.05 }}
            style={styles.bottleCard}
            onClick={() => handleBottleClick(emotion)}
          >
            <div style={styles.bottle}>
              <Bottle
                fillPercentage={Math.min(100, bottleStates[emotion] * 10)}
                color={getBottleColor(emotion)}
              />
            </div>
            <p style={styles.emotionLabel}>{emotion}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const QuotesPage = () => {
  const navigate = useNavigate();
  const { emotion } = useParams();
  const [showButton, setShowButton] = useState(false);
  const [currentQuote] = useState(() => {
    const quotes = quotesData[emotion] || [];
    return quotes[Math.floor(Math.random() * quotes.length)];
  });

  return (
    <div style={styles.quotesContainer}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.quoteCard}
      >
        <ScratchCard
          quote={currentQuote}
          onRevealed={() => setShowButton(true)}
        />
        <div style={{ display: "none" }}>
          <MusicPlayer emotion={emotion} />
        </div>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate("/")}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6d28d9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7c3aed")}
          >
            Choose Another Emotion
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quotes/:emotion",
    element: <QuotesPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
