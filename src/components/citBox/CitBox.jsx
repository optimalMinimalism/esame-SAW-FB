import "./CitBox_styles.scss";
function CitBox({ text, reference }) {
  return (
    <>
      <div className="cit-box">
        <p className="cit-text">&quot;{text}&quot;</p>
        <p className="cit-ref">{reference}</p>
      </div>
    </>
  );
}

export default CitBox;
