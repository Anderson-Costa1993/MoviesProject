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

return (
  <div style={backgroundImageStyle}></div>
  )
}