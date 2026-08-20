 function Det(props){
    return(
        <div>
            <h3>id:{props.id}</h3>
                <h1>title:{props.title}</h1>
                <h2>company:{props.company}</h2>
                <h2>location:{props.location}</h2>
                <h3>type:{props.type}</h3>
                <p>skills:{props.skills}</p>
        </div>
    );
 }
 export default Det;