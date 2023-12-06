import style from "./pagination.module.css";

type Props = {
  navPages: {
    navigateToPage: (direction: number) => void;
    scroolTop: () => void
  };
};

export function Pagination({ navPages }: Props) {
  return (
    <div className={style["container-buttom"]}>
      <i
        className="bi bi-arrow-left-square-fill"
        onClick={() => {navPages.navigateToPage(-1); navPages.scroolTop()}}

      ></i>

      <i
        className="bi bi-arrow-right-square-fill"
        onClick={() => {navPages.navigateToPage(+1); navPages.scroolTop()}}
      ></i>
    </div>
  );
}
