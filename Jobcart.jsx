 function Jobcart(props) {
  return (
    <div className="job-card">

      <h3>Title: {props.title}</h3>

      <p>Company: {props.company}</p>

      <p>Location: {props.location}</p>

      <p>
        Type:{" "}
        {props.type === "full-time"
          ? "full-time"
          : "part-time"}
      </p>

      <p>Skills Required: {props.skills}</p>

      <div className="btn">

        {props.isFavor ? (
          <button
            className="rem-btn"
            onClick={() => props.onRemove(props.id)}
          >
            Remove Favorite
          </button>
        ) : (
          <button
            className="favorite-btn"
            onClick={() => props.onfavor(props.id)}
          >
            Favorite
          </button>
        )}

        <button
          className="det"
          onClick={() => props.ondetails()}
        >
          Details
        </button>

        {props.IsApply ? (
          <button
            className="can-btn"
            onClick={() => props.onrem(props.id)}
          >
          Applied
          </button>
        ) : (
          <button
            className="app-btn"
            onClick={() =>
              props.onapply({
                id: props.id,
                title: props.title,
                company: props.company,
                location: props.location,
                type: props.type,
                skills: props.skills
              })
            }
          >
            Apply
          </button>
        )}

      </div>

    </div>
  );
}

export default Jobcart;