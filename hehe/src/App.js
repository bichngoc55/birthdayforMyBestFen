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
import ngoloi from "./assets/ngoloi.png";
import duongduong from "./assets/duongduong.webp";
import huaquanghan from "./assets/huaquanghan.webp";
import chanyeol from "./assets/chanyeol.jpg";
import who from "./assets/who.jpeg";
const quotesData = {
  happiness: [
    "Ohh Có chuyện gì vui z bạn? Kể t nghe với. Hihi",
    "Im happy that u clicked on this emotion.",
    "T mong một trong những hạnh phúc trong cuộc sống của m là niềm tin m được yêu thương.",
    "Mỗi phút m tức giận là m mất đi sáu mươi giây hạnh phúc. Hihi, không biết ns gì cả.",
    "BLEBLEBLE!!!",
    "Hạnh phúc thì cố kiếm tiền đi Mông Cổ thuiiii",
    "Đếm cuộc sống bằng những nụ cười, không phải nước mắt. Hihi",
    "Điều gì làm bà cười z bà thơ?",
    "Hạnh phúc không phải là một điểm đến, đó là một hành trình.",
    "Mục đích của cuộc sống chúng ta là để hạnh phúc.",
    "Woww!!! You should be happy more =)) cuz you are kind.",
    "Chúng ta là lũ quỷ sống ở tận rừng xanh",
    "Hình như trong lòng anh đã không còn hình bóng ai ngoài em đâu.",
    "Chú khỉ vui có chuyện gì vui hay là vì hôm nay là người bth nên vui z?",
    "Chị ấy là sự hoàn hảo tuyệt đối, là thành công của tạo hoá, là món quà duy nhất của Chúa, là thiên thần được gửi xuống thế gian thắp sáng cuộc đời của tôi, là kì quan vĩ đại nhất thế giới, là kiệt tác để đời của thần linh.",
    "Hạnh phúc là có một gia đình lớn, yêu thương, quan tâm, gắn bó ở một thành phố khác. Và có đôi ta ở Mông Cổ 1 ngày nào đó.",
    "Mong m có thể gặp được 1 người bạn trai yêu thương m hơn cả t yêu thương m rất nhiều. Hihi, happy days my fen",
    "Lalalala!!!! Share your happiness ưith me bro.",
    "Ai đọc được dòng này là đom đóm.",
    "Mẹ lao công học yêu đang vui.",
  ],

  sadness: [
    "Ohh nooo!!! Bạn Quý của t có chuyện gì buồn z? Khóc đi bạn r kể với t henn!! You are not alone.",
    "I wish i could be next to you right now and give you a hug. We can all be quiet and gaze at the stars.",
    "Nhắn tin cho tôi ngay lập tức!!! Sao lại mò vào đây xem quote mà không nhắn tin tâm sự với tôi?",
    "Hi big you! Its me, mini you. How are you? I really miss you. Is everything okay lately? I belive everyhing is going GREAT. Cuz big me always DO THE BEST",
    "When you die, who will sit at your grave the longest?",
    "Cuối cùng em vẫn chọn khóc chứ không chọn nói ra.",
    "Đến một lúc nào đó Quý nhận ra rằng cho dù quý có tổn thương hay đau lòng đến mức oà khóc trong vô vọng thì cũng chỉ có bản thân Quý mới an ủi được chính mình.",
    "Hey whats wrong? Do you wanna talk about it? Or you want me to keep silent?",
    "...Không biết nói gì ngoài chúc quý mau ổn nhé. Ồn lòi lìa !! Đi ngủ thì sẽ không buồn nữa",
    "The word 'happy' would lose its meaning if it were not balanced by sadness. Buồn lắm hả b :(( ",
    "Sadness gives depth. Happiness gives height.",
    "Đừng tiêu cực. Xem phim nhá?? Lets go to google meet and we can watch films together",
    "Có chuyện gì z? Are you okk? Do you wanna talk about it? Think about mongolian and snow and taking wonderful pictures of us together. Do you feel better now?",
    "Những bài hát ngọt ngào nhất là những bài kể về suy nghĩ buồn nhất.",
    "HUHUHUHU, bạn buồn tui cũng không vui. Bạn vui thì tui mới vui được. Nhưng mà cứ khóc đi nếu có thể and accept your emotions nhé.",
    "BLEBLEBLEBLE! Sao z cô pé ngok ngeck của anh. Em bùn z sao không đặt chân gà sốt thái + cháo sườn về ăn?",
    "Mỗi người đều có một nỗi buồn thầm kín mà thế giới không hề hay biết. Mong Quý có thể tha thứ cho họ và cũng như là tha thứ cho chính mình.",
    "Trái tim sẽ tan vỡ, nhưng vết thương sẽ tiếp tục sống. Mong Quý có thể có ít vết thương nhất để còn có chỗ để trái tim biết yêu thương nhìuuuu",
    "Có những khoảnh khắc ước có thể quay ngược thời gian. Yee you can. But within your minds only. Leave it behind and forgive yourself!",
    "Có những người đơn giản không phải ở trong cuộc đời chúng ta mãi mãi. Let them be where they should be.",
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
    "Quý không cô đơn đâu, tao luôn ở đây bên Quý mà.",
    "Không sao cả nếu hôm nay Quý chỉ muốn nghỉ ngơi, tao cho phép Quý làm z. Còn người khác thì không :((",
    "Quý không cần phải hoàn hảo, Quý luôn là người very tuyệt vời trong mắt tao. Hài hước xinh đẹp tốt bụng, im always proud to tell others u r my friend",
    "Quý không cần phải giả vờ là mình ổn, hãy cứ sống thật với cảm xúc của Quý.",
    "Hãy để thời gian chữa lành, Quý sẽ thấy bản thân mạnh mẽ hơn.",
    "Quý đang đi đúng hướng, kể cả không đúng hoặc m không biết làm gì tiếp thì tao sẽ là người luôn đồng hành cùng m nên cứ sống qua hôm nay đạ.",
    "Quý không cô đơn đâu. Có thể tao không hiểu chính xác cảm xúc của Quý nhưng tao vẫn ở bên Quý.",
    "Tao rất tiếc vì Quý đang phải trải qua điều này. Hãy nhớ là tao luôn ở đây khi Quý cần.",
    "Quý xứng đáng có được hạnh phúc. Nhiều hơn những gì t có thể làm cho m bây giờ. Sau này t mong qua mỗi năm ta lại có thể mở lòng với nhau hơn và biết yêu thương cuộc sống hơn.",
    "M thử viết ra cảm xúc của mình, đôi khi hn sẽ làm m nhẹ nhõm hơn.",
    "Đừng quên chăm sóc bản thân , ngay cả khi m cảm thấy không muốn.",
    "M là ánh sáng trong cuộc sống của những người xung quanh Quý. Không có m thì h t đã rất tự ti và mặc cảm về bản thân. Thanks for always there and supporting me mentally",
    "Quý không cần phải đối diện với thế giới khi Quý chưa sẵn sàng.",
    "Không ai là hoàn hảo cả, và Z là hoàn toàn bình thường.",
    "Biết nói gì h. Haizz mệt quá thì ngủ đi bạn, kệ mẹ hn. Nhưng mà t biết m sẽ không kệ được nên cố lên nha.",
    "M bùn lắm hả? Haiz !!! Nếu đã chọn vào emotion này thì chắc cảm xúc đã được tích tụ lâu r. M phải chịu đựng và vất vả nhiều r. Cố lết qua khoảng thời gian ni thôi b.",
    "Hãy để tao giúp Quý gánh nỗi buồn này một chút.",
    "Tao rất tự hào về Quý, dù Quý không nhận ra điều đó.",
    "Quý xứng đáng có được hạnh phúc.",
    "Cố gắng lết qua khoảng thời gian ni đi bạn. Rồi ta sẽ ở mông cổ và khóc cùng nhau!!!",
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
    // width: "100%",
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
  imageContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
    height: "400px",
    margin: "0 auto 48px auto",
  },
  heartContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "200px",
  },
  heartImage: {
    width: "100%",
    height: "100%",
    position: "relative",
    mask: `
      radial-gradient(circle at 70% 31%, #000 29%, transparent 30%) top left,
      radial-gradient(circle at 30% 31%, #000 29%, transparent 30%) top right,
      linear-gradient(to bottom, #000 50%, transparent 50%)
    `,
    maskComposite: "add",
    WebkitMaskComposite: "add",
    overflow: "hidden",
  },

  circleImage: {
    position: "absolute",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
  const surroundingImages = [
    { src: ngoloi, angle: 0 },
    { src: duongduong, angle: 72 },
    { src: huaquanghan, angle: 144 },
    { src: chanyeol, angle: 216 },
    { src: who, angle: 288 },
  ];
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
          margin: "0 auto",
        }}
      />
      {/* <div style={styles.imageContainer}>
        <div style={styles.heartContainer}>
          <div style={styles.heartImage}>
            <img src={quy} alt="Quy" />
          </div>
        </div>

        {surroundingImages.map((img, index) => (
          <motion.div
            key={index}
            style={{
              ...styles.circleImage,
              left: `${Math.cos((img.angle * Math.PI) / 180) * 150 + 250}px`,
              top: `${Math.sin((img.angle * Math.PI) / 180) * 150 + 200}px`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <img src={img.src} alt="Surrounding" style={styles.image} />
          </motion.div>
        ))}
      </div> */}
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
            Chọn thẻ khác hông!!
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
