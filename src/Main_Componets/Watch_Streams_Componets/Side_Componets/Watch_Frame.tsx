
function Watch_Frame({URL}:{URL:string}) {
  return (
     <section className=" pb-[55%] lg:pb-[40%] xl:pb-[35%] relative ">
        {URL!=='' && (
        <iframe 
        allowFullScreen
        className='shadow-(--Dark_Shadow) absolute top-0 left-0 dark:shadow-(--Light_Shadow) border-3 Border_Color rounded-lg Border_Hover
         w-full h-full '
        src={URL}>  
        </iframe>)}
        {URL==='' && (<h1 className="Non_Data_State">Trailer unavailable at this time</h1>)}
      </section>
  )
}

export default Watch_Frame