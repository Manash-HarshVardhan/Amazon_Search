const apiUrl = 'https://fakestoreapiserver.reactbd.com/nextamazon';

let searchInput=document.querySelector('.siteheader--searchcontainer--searchbox')
let searchbtn=document.querySelector('.siteheader--searchcontainer--searchbtn')
let drop=document.querySelector('.siteheader--searchcontainer--dropdown');

let contentsection=document.querySelector('.contentsection')
let chkBox=document.querySelector('.siteheader--searchcontainer--chkbox')
let chkBoxValue=false;

// fetching api
fetch(apiUrl)
  .then(response => {

    if (!response.ok) {
      throw new Error('Network issue');
    }

    return response.json();
  })
  .then(data => {
    //returned json here in data variable

    function createCard(data){
       contentsection.innerHTML='';
        data.forEach(field=>{
            let card=document.createElement('div');
            card.classList.add('contentsection--card');
            
            let imgcontainer=document.createElement('div');
            
            let imgtag=document.createElement('img');
            imgtag.src=field.image;
            imgtag.classList.add('contentsection--card--productimg')
            

            let brandname=document.createElement('h2');
            brandname.classList.add('contentsection--card--brandname');
            brandname.textContent=field.brand;
    
            let producttitle=document.createElement('h3');
            producttitle.classList.add('productdetails--title');
            let limitedTitle=(field.title.split(' ').slice(0, 4).join(' ') + '...').trim();
            producttitle.textContent=limitedTitle;
    
            let productprice=document.createElement('h4');
            productprice.classList.add('productdetails--price');
            productprice.textContent=`$ ${field.price}`;

            let productdesc=document.createElement('p');
            productdesc.classList.add('productdetails--price');
            let limitedDesc=(field.description.split(' ').slice(0, 10).join(' ') + '...').trim();
            productdesc.textContent=limitedDesc;

            let prodid=document.createElement('div')
            prodid.classList.add('contentsection--card--productid')
            prodid.textContent=`ID:${field._id}`;
    
            //appending items to parent divs
            card.appendChild(prodid)
            card.appendChild(brandname)
            imgcontainer.appendChild(imgtag)
            card.appendChild(imgtag)
            card.appendChild(producttitle)
            card.appendChild(productprice)
            card.appendChild(productdesc)
            card.appendChild(imgcontainer)
            contentsection.appendChild(card);
        })
    }
    
    chkBox.addEventListener('change',(event)=>{
      if(event.target.checked){
        chkBoxValue=true;
      }else{
        chkBoxValue=false;
      }


    })


    searchInput.addEventListener('input',()=>{
       
        const searchVal=searchInput.value.toLowerCase();

        if(searchVal){
            const filterItem=data.filter(field=>field.brand.toLowerCase().includes(searchVal.toLowerCase()));
            if(filterItem!=0){
                showDrop(filterItem);
                // createCard(filterItem);
            }else{
              hideDrop();
                
            }
            
        }else{
          hideDrop()
          if(chkBoxValue==false){
            createCard(data)
          }else{
            const filterItem=data.filter(field=>field.isNew==true);
            createCard(filterItem)
          }
        }
    })

    
    if(chkBoxValue==false){
            createCard(data)
          }else{
            const filterItem=data.filter(field=>field.isNew==true);
            createCard(filterItem)
          }

    //implementing dropdown

    function showDrop(filterItem){
      drop.innerHTML='';//clr prev res

      if(filterItem.length>0){
          filterItem.forEach(item => {
              const div=document.createElement('div');
              div.textContent=item.brand;
              div.classList.add('dropitem');
              div.addEventListener('click',()=>{
                   createCard([item]);//converting obj into arr for looping
                  searchInput.value=item.brand;
                  hideDrop();
              });
              
              drop.appendChild(div);
          });
          drop.style.display='block';
      }else{
          hideDrop();
      }
  
  }   
     
  function hideDrop(){
    drop.innerHTML='';
    drop.style.display='none';
  }

    
  })
  .catch(error => {
    
    console.error('Problem occur while fetching data', error);
  });

