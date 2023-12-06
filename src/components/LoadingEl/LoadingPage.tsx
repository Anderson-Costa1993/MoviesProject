import style from "./loading.module.css";

export function LoadingPage() {
  return (
    <div className={style.containerLoader}>
      <span className={style.loader}></span>
      <p>Carregando</p>
    </div>
  );
}
