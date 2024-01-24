const Backgrounds = () => {
  const mainImages = [
    {
      src: "/assets/icons/circle-mid.svg",
      alt: "",
      className:
        "top-auto w-[1358px] h-[1740px] bottom-[100px] left-1/2 -translate-x-1/2",
    },
    {
      src: "/assets/icons/circle-bot.svg",
      alt: "",
      className:
        "top-auto aspect-squere w-[500px] object-contain right-[19%] -bottom-[250px]",
    },
    {
      src: "/assets/images/Lamp-Mid.png",
      alt: "",
      className: "blur-md h-[1534px] top-1/2 -translate-y-1/2",
    },
    {
      src: "/assets/images/lamp-bot.png",
      alt: "",
      className: "blur-md h-[882px] -left-[250px] -bottom-[250px]",
    },
    {
      src: "/assets/images/lamp-bot2.png",
      alt: "",
      className: "blur-md w-[1232px] -right-[450px] -bottom-[450px] ",
    },
  ];

  return (
    <>
      {mainImages.map((image, index) => (
        <img
          src={image.src}
          alt={image.alt}
          className={`${image.className ? image.className : ""} absolute`}
          key={index}
        />
      ))}
    </>
  );
};

export default Backgrounds;
