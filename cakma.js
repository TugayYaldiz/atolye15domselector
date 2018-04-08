/**
 * Chain yapabilmek için return this döndürmek gerekiyormuş yeni öğrendim daha once chain yapmamıştım.
 * Bu yüzden her zaman sondaki get() methodunu da cagırmak zorunda kaldığımız bir yapı oluşturmak zorunda kaldım
 * cunkü return this döndürmezsem 2. chainde hata veriyordu
 * return this dondurunce de haliyle vs code selectten sonra sonuna . koyunca any önerilerini veriyor element önerilerini vermedi
 * örnegin D.select("#selam"). dediğimde element önerisi geliyordu direk 'return document.querySelector(str)' yaptığımda
 * bunu nasıl düzelticeğimi bulamadım ama öneriyi vermese de yine de elementi döndürüyorum
 * yani kendimiz yazarsak bütün özelliklere erişebilir, değiştirebiliriz
 * ör: D.select("#selam62").get().style.color = "blue"; gibi
 */

let D = {
  currentElement: null,
  /**
   * document.querySelector(str) ile istenilen elemanı currentElement değişkenine atıyorum
   * @param {String} str
   * @return {this}
   */
  select: function(str) {
    if (typeof str !== "string") return "Wrong type";
    this.currentElement = document.querySelector(str);
    return this;
  },
  /**
   * document.querySelectorAll(str) ile istenilen nodeList'i döndürüyorum
   * @param {String} str
   * @return {this}
   */
  selectAll: function(str) {
    if (typeof str !== "string") return "Wrong type";
    return document.querySelectorAll(str); // select all nodelist döndüreceği için chaine gerek yok diye dire döndürdüm
  },
  /**
   * this.currentElement de bulunan elemanın parentElement ini şuankı eleman olarak ayarlıyorum
   * @return {this}
   */
  getParent: function() {
    this.currentElement = this.currentElement.parentElement;
    return this;
  },
  /**
   * Öncelik ile kardeşini bulacagımız elemanın parentinin firstChild'ını bir değişkene atıyorum
   * daha sonra bu değişkeni yanında hiç sibling i kalmayana kadar iterate ediyorum
   * ve eger kardeşi aranan elementte değil ise bulunan elementi bir arraya push ediyorum
   * bu arrayi this.currentElement değişkenine atıyorum .get() ile çekince bir array dönmüş oluyor
   * @return {this}
   */
  getSiblings: function() {
    let siblings = [];
    let sibling = this.currentElement.parentNode.firstChild; //parentin ilk elementine gittik ki element ortadaysa sağına soluna ayrı ayrı bakmak zorunda kalmayalım
    for (; sibling; sibling = sibling.nextSibling) {
      //next sibling boş olmadığı surece sona kadar gidiyoruz
      if (sibling.nodeType !== 1 || sibling === this.currentElement) continue; // elementin kendisini es geçtik
      siblings.push(sibling);
    }
    this.currentElement = siblings; //suanki elementimizi siblings arrayi ile degistirdik artık get ile dondurebiliriz
    return this;
  },
  /**
   * bildiğim kadarı ile childNodes nodeList döndürüyordu tek tek bütün childlarını bakmadan
   * this.currentElement de ki childi aranacak elemanın childlarını bulup tekrar this.currentElement olarak atıyorum
   * @return {this}
   */
  getChildrens: function() {
    this.currentElement = this.currentElement.childNodes;
    return this;
  },
  /**
   * daha chain yapmayı yeni öğrendiğimden buna mecbur kaldım mecburen her işlemin sonunda get() methodunu da cagırmak gerekli
   * @return {this.currentElement}
   */
  get: function() {
    return this.currentElement;
  }
};

// select element
console.log(D.select("#selam").get());
D.select("#selam62").get().style.color = "blue";
D.select("#selam62").get().innerHTML = "Ben çok değiştim";

// select all div nodeList dönrür bu yuzden loop edilebiliyor
console.log(D.selectAll("div"));
console.log(D.selectAll("div").length);

// select parent
console.log(
  D.select("#child")
    .getParent()
    .get()
);

// select siblings
console.log(
  D.select("#child")
    .getParent()
    .get()
);

// select Childrens
console.log(
  D.select("#selam")
    .getChildrens()
    .get()
);
