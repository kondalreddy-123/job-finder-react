import Nav from "./Nav.jsx";
import Jobcart from "./Jobcart.jsx";
import { useEffect, useState } from "react";
import  "./ST.css";
function App() {
  let jobs = [
    {
      id: 21,
      title: "ai engineer",
      company: "google",
      location: "hyderabad",
      type: "full-time",
      skills: "strong communication skills"
    },
    {
        id:20,
        title:"software developer",
        company:"microsoft",
        location:"Bangalore",
        type:"full-time",
        skills:"strong communication ans inter personal skills"
    },
    {
        
      id:12,
      title: "HR",
      company: "google",
      location: "work-from-home",
      type: "part-time",
      skills: "java,mysql,c++,dsa"
    }
  ];
 const [page,nnav]=useState("Home");
  const [search, news] = useState("");
  const [favorites,newf]=useState([]);
  const [jobtype,cjob]=useState("all");
  const [location,setlocation]=useState("all");
  const [sjob,setjob]=useState(null);
  const [applied,sapply]=useState([]);
  const [appform,sform]=useState(null);
  const [name,sname]=useState("");
  const [email,semail]=useState("");
  const [phone,sphone]=useState("");
  let filt = jobs.filter((job) => {

  const text = search.toLowerCase().trim();

  const matchesSearch =
    job.title.toLowerCase().includes(text) ||
    job.company.toLowerCase().includes(text) ||
    job.skills.toLowerCase().includes(text);

  const matchesType =
    jobtype === "all" ||
    job.type === jobtype || job.location.toLowerCase() === location.toLowerCase();;

  const matchesLocation =
    location === "all" ||
    job.location.toLowerCase() === location.toLowerCase();

  return (
    matchesSearch &&
    matchesType &&
    matchesLocation
  );
});
function Favor(Jobid) {
        if(!favorites.includes(Jobid)){
          const updated=[...favorites,Jobid];
          newf(updated)
          localStorage.setItem("favorites",JSON.stringify(updated))}
        }
function Remove(Jobid){
  const r=favorites.filter((id)=>id!==Jobid);      
  newf(r);
  localStorage.setItem("favorites",JSON.stringify(r));

}
function Onform(job){
  sform(job);
  nnav("Apply");
}
function Apply(jobid){
  if(!applied.includes(jobid)){
  const a=[...applied,jobid];
  sapply(a);
  localStorage.setItem("applied",JSON.stringify(a));  }
}
 useEffect(()=>{
     const k=localStorage.getItem("favorites");
     if(k===null){
      newf([])
     }
     else{
      newf(JSON.parse(k))
     }
     const app=localStorage.getItem("applied");
     if(app===null){
      sapply([])
     }
     else{
      sapply(JSON.parse(app))
     }
  },[])
function Rem(jobid){
  const rap=applied.filter((app)=>jobid!==app)
  sapply(rap);
  localStorage.setItem("applied",JSON.stringify(rap));
}
  return (
    <div>
      <Nav nnav={nnav}/>{page==="Home" &&
      <section className="hero">
        <div>
          <h1>Finding your Dream job</h1>
          <p>Find opportunities that match your skills and career goals.</p>

          <input
            type="text"
            placeholder="search for job" className="searh"
            onChange={(e) => {
              news(e.target.value);
            }}
          />
        </div>
      </section>}
      
       {search && page==="Home" &&(
      <section className="search">
           <p>Search Results</p><div className="fil">
           <select onChange={(e)=>{cjob(e.target.value)}}>
            <option value="all">ALL</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">part-time</option></select>
             <select onChange={(e)=>{cjob(e.target.value)}}>
            <option value="hyderabad">Hyderabad</option>
            <option value="bangalore">Bangalore</option>
            <option value="mumbai">Mumbai</option></select></div>
            {filt.length===0?(<p style={{color:"#64748B"}}>no results.</p>):(
       filt.map((job) => (
              <div key={job.id}>
                <Jobcart
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  skills={job.skills}
                  onfavor={Favor}
                  onRemove={Remove}
                   isFavor={favorites.includes(job.id)}
                  ondetails={()=>setjob(job)}
                  onapply={Onform}
                  IsApply={applied.includes(job.id)}
                   onrem={Rem}
                />
                 {sjob && sjob.id===job.id &&(<section><div className="description">
        <h3>Job Description</h3>
        <h4>Title:{sjob.title}</h4>
        <p>Id:{sjob.id}</p>
        <p>Company:{sjob.company}</p>
        <p>Location:{sjob.location}</p>
        <p>Type:{sjob.type}</p>
        <p>skills required:{sjob.skills}</p>
         <button onClick={()=>setjob(null)}>Close</button></div>
      </section>)}
              </div>
            )))}</section>)}
            {page==="Jobs"  && (
          <section className="job">
            <h1>Latest Jobs</h1>
          {jobs.map((job) => (
              <div key={job.id}>
                <Jobcart
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  skills={job.skills}
                  onfavor={Favor}
                  onRemove={Remove}
                   isFavor={favorites.includes(job.id)}
                    ondetails={()=>setjob(job)}
                     onapply={Onform}
                     IsApply={applied.includes(job.id)}
                     onrem={Rem}
                />
                {sjob && sjob.id===job.id &&(<section>
                  <div className="description">
        <h3>Job Description</h3>
        <p>Id:{sjob.id}</p>
        <p>Title:{sjob.title}</p>
        <p>Company:{sjob.company}</p>
        <p>Location:{sjob.location}</p>
        <p>Type:{sjob.type}</p>
        <p>skills required:{sjob.skills}</p>
         <button onClick={()=>setjob(null)}>Close</button></div>
      </section>)}
              </div>
            ))}
      </section>)}
      {appform && page==="Apply" &&(<section className="ap">
        <h1>application started for {appform.title}</h1>
      <form onSubmit={(e)=>{e.preventDefault();
        nnav("Applied");Apply(appform.id);}
      }>
        <input type="text" placeholder="name" value={name} onChange={(e)=>sname(e.target.value)} required/>
        <input type="email" placeholder="email" value={email} onChange={(e)=>semail(e.target.value)} required/>
        <input type="number" placeholder="phone" value={phone} onChange={(e)=>sphone(e.target.value)} required/>
        <button type="submit">Submit</button>
        <button className='can' onClick={()=>{sform(null);
                             nnav("Home");}}>Cancel</button>
        
      </form></section>)}

      {page==="Favorites" &&
      (<section>{
        favorites.length!==0?(
          <>
      <h1>Favourite jobs</h1>
      {
        favorites.map((id)=>{
             const j=jobs.find((job)=>id===job.id)
             return(
              <>
              <Jobcart
                  id={j.id}
                  title={j.title}
                  company={j.company}
                  location={j.location}
                  type={j.type}
                  skills={j.skills}
                  onfavor={Favor}
                  onRemove={Remove}
                  isFavor={favorites.includes(j.id)}
                  ondetails={()=>setjob(j)}
                  onapply={Onform}
                  IsApply={applied.includes(j.id)}
                   onrem={Rem}/>
                   {sjob && sjob.id===j.id &&(<section>
        <h3>Job Description</h3>
        <p>Id:{sjob.id}</p>
        <p>Title:{sjob.title}</p>
        <p>Company:{sjob.company}</p>
        <p>Location:{sjob.location}</p>
        <p>Type:{sjob.type}</p>
        <p>skills required:{sjob.skills}</p>
         <button onClick={()=>setjob(null)}>Close</button>
      </section>)}</>)})
             }</>):("No Favourites")}</section>)}
      {page==="Applied" &&
      (<section>{
        applied.length!==0?(
          <>
      <h1>Applied jobs</h1>{
        applied.map((id)=>{
             const j=jobs.find((job)=>id===job.id)
             return(
              <>
              <Jobcart
                  id={j.id}
                  title={j.title}
                  company={j.company}
                  location={j.location}
                  type={j.type}
                  skills={j.skills}
                  ondetails={()=>setjob(j)}
                  IsApply={applied.includes(j.id)}
                  
                />
                {sjob && sjob.id===j.id &&(<section>
        <h3>Job Description</h3>
        <p>Id:{sjob.id}</p>
        <p>Title:{sjob.title}</p>
        <p>Company:{sjob.company}</p>
        <p>Location:{sjob.location}</p>
        <p>Type:{sjob.type}</p>
        <p>skills required:{sjob.skills}</p>
         <button onClick={()=>setjob(null)}>Close</button>
      </section>)}</>
                )
             })}</>):("No Jobs applied")}
            </section>)}
      </div>);
}
export default App;