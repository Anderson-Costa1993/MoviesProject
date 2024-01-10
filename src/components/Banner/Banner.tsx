import style from "./banner.module.css"


type Props = {
  banner: {
    Banner: string;
  };
};

export function BannerHome({ banner }: Props) {
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "cover",
    height: "680px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: "0.3",
    margin: "0  px auto",
  };

  const mobileStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "600px",
    opacity: "0.5",
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
