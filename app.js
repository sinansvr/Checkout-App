//* Selectors
const productsPreview=document.querySelector("#products-preview")//Urunlerin bulunduğu bolüm seçildi


//*Variables
const taxRate=0.18;
const shippingPrice=25.99;




//* Functions

//Bütün eleanların silinmesi Clear All Button 

//Her bir urunun miktarını ve fiyatını çarparak hesaplayan fonksiyon
const urunToplamFiyatiHesapla=(element)=>{
    let fiyat=element.closest(".main__product-info").querySelector("strong").textContent;

    let adet=element.closest("div").querySelector("p").textContent;    

    let toplamFiyat= Number(adet)*Number(fiyat);
    
    element.closest(".main__product-info").querySelector(".main__product-line-price").textContent=(toplamFiyat).toFixed(2);
    
}

// Toplam sepet fiyatını hesaplayan fonksiyon
const toplamFiyatiHesapla=()=>{
    const toplamFiyatDivs=productsPreview.querySelectorAll(".main__product-line-price");
    let araToplam=0;
    toplamFiyatDivs.forEach((item)=>{araToplam +=parseFloat(item.innerText)})
    document.querySelector(".main__sum-price").innerText=araToplam;
} 

//*Event Listener


productsPreview.addEventListener("click",(e)=>{

    //?ürün adedini düşüren event
    if(e.target.classList.contains("fa-minus")){
        let miktar=e.target.closest("div").querySelector("p").textContent;
        if(miktar>1){
            miktar = Number(miktar)-1           
            e.target.nextElementSibling.textContent=miktar;
        }else if(confirm("Ürünü tamamen silmek istediğinize emin misiniz?")){
            e.target.closest(".main__product").remove();
        }

        urunToplamFiyatiHesapla(e.target)

    //?Ürün adedini arttıran event
    }else if(e.target.classList.contains("fa-plus")){
        let miktar=e.target.closest("div").querySelector("p").textContent;
        miktar = Number(miktar)+1
        e.target.previousElementSibling.textContent=miktar;

        urunToplamFiyatiHesapla(e.target)

    //?ürünü tamamen kaldıran event
    }else if(e.target.classList.contains("fa-trash-can")){
        if(confirm("Ürünü tamamen silmek istediğinize emin misiniz?")){
            e.target.closest(".main__product").remove();
        }        
        
    }
    toplamFiyatiHesapla()
})


