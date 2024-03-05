import "./Toolbar.css";
import ModalSlide from "../modal/ModalSlide";
import imgTask from "/img/task.jpeg"
import imgSidebar from "/img/sidebar.png"
import imgCanvas from "/img/canvas.png"
import imgResult from "/img/result.png"

export default function TopBar() {
  return (
    <div id="top-bar" className="bar">
      <section className="left-section">
        <ModalSlide buttonText={"Условие"}>
          <h1>Условие</h1>
          <span>Вариант 18</span>
          <p>
            На плоскасти заданы два множества точек. Найти пару окружностей, каждая из которых
            проходит хотя бы через <b>3</b> различные точки одного и того же множества (точки берутся из
            разных множеств для разных окружностей), для которых площадь четырехугольника,
            образованного центрами окружностей и точками касания общей касательной, максимальна.
          </p>
          <img src={imgTask} alt="Условие" />
        </ModalSlide>

        <ModalSlide buttonText={"Инструкция"}>
          <header>
            <h1>Инструкция к программе для решения задачи №18</h1>
          </header>
          <nav>
            <ul>
              <li>
                <a href="#interface">Интерфейс программы</a>
              </li>
              <li>
                <a href="#usage">Использование</a>
              </li>
              <li>
                <a href="#download">Скачивание файлов с координатами</a>
              </li>
              <li>
                <a href="#upload">Загрузка файлов с координатами</a>
              </li>
            </ul>
          </nav>
          <main>
            <section id="interface">
              <h2>Интерфейс программы</h2>
              <p>На интерфейсе программы есть несколько основных элементов:</p>
              <ol>
                <li>
                  <strong>Сайдбар с множествами точек:</strong>
                  <p>
                    Справа расположен сайдбар, в котором отображаются два множества точек. Каждое
                    множество содержит кнопки для управления точками, список координат точек и
                    возможность добавления новых точек.
                    <img src={imgSidebar} alt="Сайдбар с множествами точек" />
                  </p>
                </li>
                <li>
                  <strong>Холст для рисования:</strong>
                  <p>
                    По центру экрана располагается холст, на котором отображаются точки из двух
                    множеств. Пользователь может масштабировать и перемещать холст для просмотра
                    различных областей.
                    <img src={imgCanvas} alt="Холст для рисования" />
                  </p>
                </li>
                <li>
                  <strong>Окно с результатом:</strong>
                  <p>
                    Справа от холста находится окно с результатом вычислений. Здесь может
                    отображаться площадь фигуры, сообщение о текущем расчете или отсутствие
                    результата.
                    <img src={imgResult} alt="Окно с результатом" />
                  </p>
                </li>
                <li>
                  <strong>Кнопка переключения темы:</strong>
                  <p>
                    В нижней части окна есть кнопка для переключения темы интерфейса
                    (светлая/темная).
                  </p>
                </li>
              </ol>
            </section>
            <section id="usage">
              <h2>Использование программы</h2>
              <p>Пошаговая инструкция по использованию программы:</p>
            </section>
            <section id="download">
              <h2>Скачивание файлов с координатами</h2>
              <p>Как скачать файлы с координатами множеств точек в формате .txt:</p>
            </section>
            <section id="upload">
              <h2>Загрузка файлов с координатами</h2>
              <p>Как загрузить файлы с координатами множеств точек в формате .txt:</p>
            </section>
          </main>
          <footer>
            <p>Автор: [Ваше имя]</p>
          </footer>
        </ModalSlide>

        <ModalSlide buttonText={"Об авторе"}>
          <p>Яночкин Александр ИУ7-45Б</p>
        </ModalSlide>
      </section>


    </div>
  );
}
