import style from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style["container-principal"]}>
        <div className={style["container-nav"]}>
          <div className={style.logo}>
            <a href="">NetMovie</a>
            <i className="bi bi-collection-play-fill"></i>
          </div>
          <nav className={style.nav}>
            <div className={style.itens}>
              <ul className={style.ul}>
                <li onClick={() => navigate("/")}>
                  <i className="bi bi-house-fill"></i>
                  <a href="">Início</a>
                </li>
                <li onClick={() => navigate(`/films/${1}`)}>
                  <i className="bi bi-film"></i>
                  <a href="">Filmes</a>
                </li>
                <li onClick={() => navigate("/series/1/popularity")}>
                  <i className="bi bi-tv-fill"></i>
                  <a href="">Séries</a>
                </li>
                <li onClick={() => navigate("/teste/872585")}>
                  <i className="bi bi-tv-fill"></i>
                  <a href="">teste</a>
                </li>
              </ul>
              <div className={style["search-mobile"]}>
                    <i className="bi bi-search"></i>
                </div>
            </div>
          </nav>
        </div>
        <div className={style["line-bottom"]}></div>
      </div>
    </>
  );
}
