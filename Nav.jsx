function Nav({nnav}){
    return(
        <nav>
            <h1>JOB FINDER</h1>
            <div>
            <button onClick={()=>nnav("Home")}>Home</button>
            <button onClick={()=>nnav("Jobs")}>Jobs</button>
            <button onClick={()=>nnav('Favorites')}>Favourites</button>
            <button onClick={()=>nnav("Applied")}>Applied Jobs</button>
            </div>
        </nav>
    )
}
export default Nav;