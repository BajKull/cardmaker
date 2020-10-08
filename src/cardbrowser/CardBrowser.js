import React, { useRef, useState } from "react";
import CardContainer from "./CardContainer";
import { ReactComponent as SortIcon } from "./sort.svg";
import { CSSTransition } from "react-transition-group";

export default function CardBrowser() {
  const [category, setCategory] = useState("all");
  const [sorter, setSorter] = useState("datedesc");
  const [showSorters, setShowSorters] = useState(false);

  const categories = useRef(null);

  const sorterToUser = () => {
    switch (sorter) {
      case "datedesc":
        return "Newest";
      case "date":
        return "Oldest";
      case "likes":
        return "Most liked";
      case "views":
        return "Most viewed";
      default:
        return "Newest";
    }
  };

  const categorySwitch = (e, val) => {
    setCategory(val);
    categories.current.childNodes.forEach((btn) =>
      btn.classList.remove("cardBrowserActiveBtn")
    );
    e.target.classList.add("cardBrowserActiveBtn");
  };

  return (
    <div className="cardBrowser" onClick={() => setShowSorters(false)}>
      <div className="cardBrowserCategories">
        <div className="categories" ref={categories}>
          <button
            className="cardBrowserActiveBtn"
            onClick={(e) => categorySwitch(e, "all")}
          >
            All
          </button>
          <button onClick={(e) => categorySwitch(e, "birthday")}>
            Birthday
          </button>
          <button onClick={(e) => categorySwitch(e, "invitation")}>
            Invitation
          </button>
          <button onClick={(e) => categorySwitch(e, "congratulation")}>
            Congratulation
          </button>
          <button onClick={(e) => categorySwitch(e, "thankyou")}>
            Thank you
          </button>
        </div>
        <div className="sorters">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSorters(!showSorters);
            }}
            className="currentSorter"
          >
            <SortIcon className="currentSorterIcon" />
            {sorterToUser()}
          </button>
          <CSSTransition
            in={showSorters}
            timeout={250}
            classNames="dropDownFilter"
            unmountOnExit
          >
            <div className="currentSorterButtons">
              <button onClick={() => setSorter("datedesc")}>Newest</button>
              <button onClick={() => setSorter("date")}>Oldest</button>
              <button onClick={() => setSorter("likes")}>Most liked</button>
              <button onClick={() => setSorter("views")}>Most viewed</button>
            </div>
          </CSSTransition>
        </div>
      </div>
      <CardContainer category={category} sorter={sorter} />
    </div>
  );
}
