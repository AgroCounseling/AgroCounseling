import React, {useEffect, useState} from "react";
import "./language.css";
import { useTranslation } from "react-i18next";
import {useDispatch} from "react-redux";
import {setLng} from "../../state/appReducer";

function Language() {
  const { i18n } = useTranslation();
  const [click, setClick] = useState(false);
  const dispatch = useDispatch()
  // const [lang, setLang] = useState("ru");
  const lng = localStorage.getItem('i18nextLng')
  useEffect(()=>{
    const kg = document.getElementById("kg");
    const rus = document.getElementById("rus");

    if (lng === 'kg') {
      kg.style.backgroundColor = "#ECBF2C";
      kg.style.color = "#fff";
      kg.disabled = true;
      kg.style.transition = "1s";
      kg.style.transitionTimingFunction = "ease";
      kg.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

      rus.style.backgroundColor = "#fff";
      rus.style.color = "#000";
      rus.disabled = false;
      rus.style.transition = "1s";
      rus.style.transitionTimingFunction = "ease";
      rus.style.boxShadow = "none";

      setClick(false);
    }

    if (lng === 'ru' || lng === 'ru-RU') {
      rus.style.backgroundColor = "#ECBF2C";
      rus.style.color = "#fff";
      rus.disabled = true;
      rus.style.transition = "1s";
      rus.style.transitionTimingFunction = "ease";
      rus.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

      kg.style.backgroundColor = "#fff";
      kg.style.color = "#000";
      kg.disabled = false;
      kg.style.transition = "1s";
      kg.style.transitionTimingFunction = "ease";
      kg.style.boxShadow = "none";

      setClick(true);
    }
  }, [lng])
  const changeLang = (lang) => {
    setClick(true);
    dispatch(setLng(lang))
    i18n.changeLanguage(lang);

    const kg = document.getElementById("kg");
    const rus = document.getElementById("rus");

    if (click) {
      kg.style.backgroundColor = "#ECBF2C";
      kg.style.color = "#fff";
      kg.disabled = true;
      kg.style.transition = "1s";
      kg.style.transitionTimingFunction = "ease";
      kg.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

      rus.style.backgroundColor = "#fff";
      rus.style.color = "#000";
      rus.disabled = false;
      rus.style.transition = "1s";
      rus.style.transitionTimingFunction = "ease";
      rus.style.boxShadow = "none";

      setClick(false);
    }

    if (!click) {
      rus.style.backgroundColor = "#ECBF2C";
      rus.style.color = "#fff";
      rus.disabled = true;
      rus.style.transition = "1s";
      rus.style.transitionTimingFunction = "ease";
      rus.style.boxShadow = "0px 0px 20px rgba(50, 180, 130, 0.25)";

      kg.style.backgroundColor = "#fff";
      kg.style.color = "#000";
      kg.disabled = false;
      kg.style.transition = "1s";
      kg.style.transitionTimingFunction = "ease";
      kg.style.boxShadow = "none";

      setClick(true);
    }
  };

  return (
    <div className="language">
      <button className="lg_change" id="rus" onClick={() => changeLang("ru")}>
        RUS
      </button>
      <button className="lg_change" id="kg" onClick={() => changeLang("kg")}>
        KG
      </button>
    </div>
  );
}

export default Language;
