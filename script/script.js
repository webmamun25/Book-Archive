// search using onclick
const searching = () => {

    let searchbox = document.getElementById('searchField')
    let searchitem = searchbox.value;
    //  clear search value
    searchbox.value =""
    
    if(searchitem === ''){
        let alarm = document.getElementById('alarming')
        alarm.classList.add('alert','alert-danger','text-center','fs-1','w-25','mx-auto')
        alarm.innerHTML="Please Search Something"
        
    }
    
    else{
        // fetch data
        fetch(`https://openlibrary.org/search.json?q=${searchitem}`)
        .then(res => res.json())
        .then(data => ShowBooks(data))
        
        
    }
    
}


let ShowBooks = (data) =>{
    // alarming area
    if(data.docs.length === 0){
        let alarm = document.getElementById('alarming')
        alarm.classList.add('alert','alert-light','text-center','fs-1','w-25','mx-auto')
        alarm.innerHTML="No Result Found"
    }
    
    else
    {
        let item = data.docs.slice(0,26)
        console.log(item)
        let parentitem = document.getElementById('perItem')
        let last = document.getElementById('footer')
        parentitem.innerHTML=""
        item.forEach(ele =>{
            
            let imageUrl = ele.cover_i  
            let publisher = ele.publisher
            let author = ele.author
            
            let div = document.createElement('div')
            
            div.classList.add('col','mt-3')
            // checking
            if( imageUrl !== undefined  || publisher !== undefined || author !== undefined){
                div.innerHTML=`
                
                <div class="card">
                <img width="200px" height="400px" src="https://covers.openlibrary.org/b/id/${imageUrl}-M.jpg" class="card-img-top" alt="No resul found">
                <div class="card-body">
                  <h5 class="card-title">Book Name:${ele.title}</h5>
                  <h5 class="card-title">Author Name:${ele.author_name[0]}</h5>
                  <h5 class="card-title">Publisher Name:${ele.publisher[0]}</h5>
                  <p class="card-text">Publish Year:${ele.first_publish_year}</p>
                  
                </div>
                </div>`
            
            
            
            parentitem.appendChild(div)
            }
            else{
                div.innerHTML=`<div class="card">
                <img width="200px" height="400px" src="" class="card-img-top" alt="No result found">
                <div class="card-body">
                  <h5 class="card-title">Book Name:${ele.title}</h5>
                  <h5 class="card-title">Author Name:Not Found</h5>
                  <h5 class="card-title">Publisher Name:Not found</h5>
                  <p class="card-text">Publish Year:${ele.first_publish_year}</p>
                  
                </div>
                </div>`
            
            
            
            parentitem.appendChild(div)
            }
            // show the result how many output show
            last.innerHTML = `Show ${item.length} items from ${data.numFound} results`
            
           
        })
    }
    
}
    
