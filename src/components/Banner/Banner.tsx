// Banner.tsx
type Props = {
  banner: {
    Banner: string;
  }
};

export function BannerHome({ banner }: Props) {
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "cover  ",  // Adicione esta linha se quiser cobrir completamente o elemento
    backgroundPosition: "left",  // Adicione esta linha se quiser centralizar a imagem
    backgroundRepeat: "no-repeat",
    height: "600px",  // Adapte conforme necessário
    opacity: "0.3"
  };

  const mobileStyle: React.CSSProperties = {
    backgroundImage: `url(${banner.Banner})`,
    backgroundSize: "100% 100%",  // Adicione esta linha se quiser cobrir completamente o elemento
    backgroundPosition: "center",  // Adicione esta linha se quiser centralizar a imagem
    backgroundRepeat: "no-repeat",
    height: "550px",  // Adapte conforme necessário
    opacity: "0.3"
  };


return (
  <div style={{ ...backgroundImageStyle, ...(window.innerWidth < 600 && mobileStyle) }}></div>
  )
}