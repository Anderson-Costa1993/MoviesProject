// Banner.tsx
type Props = {
  banner: {
    Banner: string;
  }
};

export function BannerHome({ banner }: Props) {
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    height: "550px",
    opacity: "0.5",
  };

  const mobileStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "550px",
    opacity: "0.3"
  };


return (
  <div style={{ ...backgroundImageStyle, ...(window.innerWidth < 600 && mobileStyle) }}></div>
  )
}