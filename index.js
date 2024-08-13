const apiUrl = 'https://fakestoreapiserver.reactbd.com/nextamazon';

let searchInput=document.querySelector('.siteheader--searchcontainer--searchbox')
let searchbtn=document.querySelector('.siteheader--searchcontainer--searchbtn')

let contentsection=document.querySelector('.contentsection')

// let card=document.querySelector('.contentsection--card')
// let brandname=document.querySelector('.contentsection--card--brandname')
// let productImage=document.querySelector('.contentsection--card--productimg')

// let productdetails=document.querySelector('.productdetails')
// let productdetailsTitle=document.querySelector('.productdetails--title')
// let productdetailsPrice=document.querySelector('.productdetails--price')
// let productdetailsDesc=document.querySelector('.productdetails--desc')
// let productId=document.querySelector('.contentsection--card--productid')



fetch(apiUrl)
  .then(response => {

    if (!response.ok) {
      throw new Error('Network issue');
    }

    return response.json();
  })
  .then(data => {
    //returned json here



    function createCard(data){
        data.forEach(field=>{
            let card=document.createElement('div');
            card.classList.add('contentsection--card');
            
            let imgtag=document.createElement('img');
            imgtag.src=field.image;
            imgtag.classList.add('contentsection--card--productimg')
            
            let brandname=document.createElement('h2');
            brandname.classList.add('contentsection--card--brandname');
            brandname.textContent=field.brand;
    
            let producttitle=document.createElement('h3');
            producttitle.classList.add('productdetails--title');
            let limitedTitle=(field.title.split(' ').slice(0, 5).join(' ') + '...').trim();
            producttitle.textContent=limitedTitle;
    
            let productprice=document.createElement('h4');
            productprice.classList.add('productdetails--price');
            productprice.textContent=field.price;

            let productdesc=document.createElement('p');
            productdesc.classList.add('productdetails--price');
            let limitedDesc=(field.description.split(' ').slice(0, 10).join(' ') + '...').trim();

            productdesc.textContent=limitedDesc;
    
            card.appendChild(imgtag)
            card.appendChild(brandname)
            card.appendChild(producttitle)
            card.appendChild(productprice)
            card.appendChild(productdesc)
    
    
            contentsection.appendChild(card);
        })
    }
    

createCard(data)






    // console.log(data);
  })
  .catch(error => {
    
    console.error('Problem occur while fetching data', error);
  });


//   let limitedDesc=(field.description.paragraph.split(' ').slice(0, 50).join(' ') + '...').trim()