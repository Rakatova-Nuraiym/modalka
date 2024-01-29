import { useState } from "react";
import OpenModal from "./OpenModal";
import style from "./style.module.scss";
import RenderData from "./RenderData";
import { useEffect } from "react";
import RandomQestion from "./RandomQestion";

const url =
  "https://elchocrud.vercel.app/api/v1/294d4ddcc274b16ecd345745b55635b4/qestion";

const data = [
  {
    qestion: "Что такое React и в чем его основные преимущества?",
    id: 1,
  },
  {
    qestion: "Что такое Node.js и каковы его основные области применения?",
    id: 2,
  },
  {
    qestion: "Для чего используется папка node_modules в Node.js проектах?",
    id: 3,
  },
  {
    qestion:
      "Объясните назначение файлов package.json и package-lock.json в Node.js проектах.",
    id: 4,
  },
  {
    qestion: "Что такое npm и каковы его ключевые функции?",
    id: 5,
  },
  {
    qestion:
      "Какие команды Node.js наиболее часто используются разработчиками?",
    id: 6,
  },
  {
    qestion:
      "Что такое компоненты в React и какие у них основные характеристики?",
    id: 7,
  },
  {
    qestion: "Что такое JSX и каков его синтаксис?",
    id: 8,
  },
  {
    qestion: "Что такое состояние (state) в React и как оно используется? ",
    id: 9,
  },
  {
    qestion: "Что такое состояние (state) в React и как оно используется?",
    id: 10,
  },
];

const Qestion = () => {
  const [modalQestion, setModalQestion] = useState(false);
  const [qestionModal, setQuesionModal] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState("");
  const [dataList, setDataList] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [selectValue, setSelectValue] = useState("");

  const openQestion = () => setModalQestion(true);
  const closeQestion = () => setModalQestion(false);

  const openRandomQs = () => setQuesionModal(true);
  const closeRandomQs = () => setQuesionModal(false);

  const getReaquest = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addButton = () => {
    if (inputValue) {
      const qestion = {
        title: inputValue,
        type: selectValue,
        id: Math.random(),
        isCompleted: false,
      };
    }
    setInputValue("");
    setSelectValue("");

    postRequest(qestion);
    closeQestion();
  };

  const postRequest = async (data) => {
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getReaquest();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReaquest();
  }, []);

  const deleteRequest = async (_id) => {
    console.log(_id);
    try {
      await fetch(`${url}/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      getReaquest();
    } catch (error) {
      console.log(error);
    }
  };

  const [random, setRandom] = useState(data);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * random.length);
    const randomQuest = random[randomIndex];
    setRandom([randomQuest]);
    setRandomQuestion(randomQuest.qestion);
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const putRequest = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "great job",
        }),
      });
      getReaquest();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.qestionModule}>
      <button className={style.mainButton} onClick={openQestion}>
        qestion
      </button>
      <OpenModal isOpen={modalQestion}>
        <div onClick={closeQestion} className={style.mainModal}>
          <h2>Add your qestion for exem</h2>
          <div className={style.module_card}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="html">html</option>
              <option value="css">css</option>
              <option value="react">react</option>
              <option value="JavaScript">JavaScript</option>
            </select>
            <button id="addButton" onClick={() => addButton()}>
              Add
            </button>
          </div>
        </div>
      </OpenModal>
      <RenderData
        data={dataList}
        deleteRequest={deleteRequest}
        putRequest={putRequest}
      />

      <button className={style.mainButton} onClick={openRandomQs}>
        Answer this qestion!
      </button>
      <RandomQestion isOpen={qestionModal} closeQestion={closeQestion}>
        <div className={style.mainModal}>
          <h3>{randomQuestion}</h3>
          <button className={style.close} onClick={closeRandomQs}>
            close
          </button>
        </div>
      </RandomQestion>
    </div>
  );
};

export default Qestion;
