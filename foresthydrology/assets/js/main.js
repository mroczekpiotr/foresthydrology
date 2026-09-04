
(function(){
  function base(){
    return location.hostname.endsWith("github.io") ? "/foresthydrology/" : "/";
  }
  function init(){
    const b=base();
    document.querySelectorAll("[data-site-link]").forEach(a=>{
      const p=a.getAttribute("data-site-link");
      a.href=b+p.replace(/^\/+/,"");
    });
    const q=document.querySelector("#search");
    if(q){
      const cards=[...document.querySelectorAll("[data-search]")];
      q.addEventListener("input",()=>{const x=q.value.toLowerCase();cards.forEach(c=>c.style.display=c.dataset.search.toLowerCase().includes(x)?"":"none")});
    }
  }
  document.addEventListener("DOMContentLoaded",init);
})();
