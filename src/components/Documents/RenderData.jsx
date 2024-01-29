import style from "./style.module.scss";

const RenderData = ({ data, deleteRequest, putRequest }) => {
  return (
    <div className={style.renderRandom}>
      {data?.map((item) => (
        <div className={style.render} key={item._id}>
          <div className={style.miniRender}>
            <h2>{item.title}</h2>
            <p>{item.type}</p>
            <div className={style.buttonsContainer}>
              <button
                className={style.inButton}
                onClick={() => deleteRequest(item._id)}
              >
                delete
              </button>
              <button
                className={style.inButton2}
                onClick={() => {
                  putRequest(item._id);
                }}
              >
                learned
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderData;
