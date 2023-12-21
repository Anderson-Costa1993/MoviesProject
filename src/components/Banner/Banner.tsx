import style from "./banner.module.css"


type Props = {
  banner: {
    Banner: string;
  };
};

export function BannerHome({ banner }: Props) {
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "contain",
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: "0.5",
    margin: "20px auto",
  };

  const mobileStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "550px",
    opacity: "0.3",
  };

  return (
    <div className={style.banner}>
      <div
        style={{
          ...backgroundImageStyle,
          ...(window.innerWidth < 600 && mobileStyle),
        }}
      ></div>
    </div>
  );
}
