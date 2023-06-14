//* Selectors
const productsPreview=document.querySelector("#products-preview")//Urunlerin bulunduğu bolüm seçildi

const navList=document.querySelector(".nav__list")


//*Variables
const taxRate=0.18;
const shippingPrice=25.99;




//* Functions



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
    document.querySelector(".main__sum-price").innerText=(araToplam).toFixed(2);
    
    
    //Kargo masrafı hesaplanır
    let cargoMasrafi=0;

    if(araToplam >= 3000||araToplam==0){
        
        document.querySelector("#cart-shipping-amount").innerText = 0;
    } else {
        
        document.querySelector("#cart-shipping-amount").innerText = shippingPrice;
        cargoMasrafi=shippingPrice;
    } 
    
    //vergi hesaplanır
      let vergi=(araToplam*taxRate).toFixed(2)
      document.querySelector("#cart-tax-span").innerText=vergi; 
      
    //Ödenecek toplam Miktar Hesaplanır
    document.querySelector("#cart-total-span").innerText=`${(Number(vergi)+cargoMasrafi+araToplam).toFixed(2)}`
} 

//*Event Listener

//sayfa yüklendiğnde bilgileri güncelleyen event
window.addEventListener("load",()=>{
    toplamFiyatiHesapla();
})

//bütün ürünleri silen event
navList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("nav__list--btn") || e.target.classList.contains("fa-trash-can")){
        document.querySelector("#myCart").innerText="My Cart"
        document.querySelector("#product-painel ").innerText="No Product"
        toplamFiyatiHesapla();       
    }
})


productsPreview.addEventListener("click",(e)=>{

    //?ürün adedini düşüren event
    if(e.target.classList.contains("fa-minus")){
        let miktar=e.target.closest("div").querySelector("p").textContent;
        if(miktar>1){
            miktar = Number(miktar)-1           
            e.target.nextElementSibling.textContent=miktar;
        }else if(confirm(`${(e.target).closest(".main__product-info").querySelector("h2").innerText} ürününü silmek istediğinize emin misiniz?`)){
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
        if(confirm(`${(e.target).closest(".main__product-info").querySelector("h2").innerText} ürününü silmek istediğinize emin misiniz?`)){
            e.target.closest(".main__product").remove();
        }        
        
    }
    let urunSayisi=productsPreview.querySelectorAll(".main__product-line-price").length;
    document.querySelector("#myCart").querySelector("span").innerText=` (${urunSayisi} Product)`
    toplamFiyatiHesapla()
})


