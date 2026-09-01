(() => {
const T={"pl": {"Articles": "Artykuły", "Remote Sensing": "Teledetekcja", "Modelling": "Modelowanie", "Data": "Dane", "About": "O stronie", "FOREST • WATER • DATA": "LAS • WODA • DANE", "Understanding forest–water interactions through": "Zrozumienie zależności między lasem a wodą poprzez", "and modelling.": "i modelowanie.", "A practical knowledge platform about forest hydrology, GIS, remote sensing and hydrological modelling.": "Praktyczna platforma wiedzy o hydrologii leśnej, GIS, teledetekcji i modelowaniu hydrologicznym.", "Explore articles": "Przeglądaj artykuły", "Explore WebGIS": "Otwórz WebGIS", "Featured visualisation": "Wyróżniona wizualizacja", "Forest water stress & hydrological indicators": "Stres wodny lasów i wskaźniki hydrologiczne", "EXPLORE": "ODKRYWAJ", "Core topics": "Główne zagadnienia", "LATEST": "NAJNOWSZE", "Featured articles": "Wyróżnione artykuły", "View all →": "Zobacz wszystkie →", "READ ARTICLE →": "CZYTAJ ARTYKUŁ →", "Open WebGIS": "Otwórz WebGIS", "Independent knowledge platform": "Niezależna platforma wiedzy", "Purpose": "Cel", "What you will find": "Co znajdziesz na stronie", "Approach": "Podejście", "Remote sensing": "Teledetekcja", "GIS": "GIS", "Hydrological Modelling": "Modelowanie hydrologiczne", "Applications": "Zastosowania", "Optical data": "Dane optyczne", "Radar": "Radar", "Indicators": "Wskaźniki", "Satellite": "Dane satelitarne", "Climate": "Klimat", "Forest & hydrology": "Las i hydrologia", "Layers": "Warstwy", "Forest sites": "Obszary leśne", "Water-stress risk": "Ryzyko stresu wodnego", "Methodological notes": "Uwagi metodyczne", "Performance": "Ocena jakości", "Model workflow": "Workflow modelu", "Terrain analysis": "Analiza rzeźby terenu", "Spatial databases": "Bazy danych przestrzennych", "← Back to articles": "← Powrót do artykułów", "GIS • Remote Sensing • Hydrological Modelling": "GIS • Teledetekcja • Modelowanie hydrologiczne", "Forest water balance": "Bilans wodny lasu", "NDMI for forest drought assessment": "NDMI w ocenie suszy lasów", "Mapping soil moisture with Sentinel-1": "Mapowanie wilgotności gleby z Sentinel-1", "Radar backscatter as a spatial indicator": "Rozpraszanie wsteczne radaru jako wskaźnik przestrzenny", "Forest hydrology applications": "Zastosowania w hydrologii leśnej", "Spatial analysis, terrain, watersheds, databases and WebGIS workflows.": "Analizy przestrzenne, rzeźba terenu, zlewnie, bazy danych i workflow WebGIS.", "Sentinel, Landsat, UAV, vegetation and water-related indices.": "Sentinel, Landsat, UAV oraz wskaźniki roślinności i wody.", "Catchment models, calibration, validation, scenarios and uncertainty.": "Modele zlewniowe, kalibracja, walidacja, scenariusze i niepewność.", "Open geospatial, climate, soil, forest and hydrological datasets.": "Otwarte dane geoprzestrzenne, klimatyczne, glebowe, leśne i hydrologiczne."}, "es": {"Articles": "Artículos", "Remote Sensing": "Teledetección", "Modelling": "Modelización", "Data": "Datos", "About": "Acerca de", "FOREST • WATER • DATA": "BOSQUE • AGUA • DATOS", "Understanding forest–water interactions through": "Comprender las interacciones entre los bosques y el agua mediante", "and modelling.": "y la modelización.", "A practical knowledge platform about forest hydrology, GIS, remote sensing and hydrological modelling.": "Una plataforma práctica de conocimiento sobre hidrología forestal, SIG, teledetección y modelización hidrológica.", "Explore articles": "Explorar artículos", "Explore WebGIS": "Explorar WebGIS", "Featured visualisation": "Visualización destacada", "Forest water stress & hydrological indicators": "Estrés hídrico forestal e indicadores hidrológicos", "EXPLORE": "EXPLORAR", "Core topics": "Temas principales", "LATEST": "NOVEDADES", "Featured articles": "Artículos destacados", "View all →": "Ver todos →", "READ ARTICLE →": "LEER ARTÍCULO →", "Open WebGIS": "Abrir WebGIS", "Independent knowledge platform": "Plataforma independiente de conocimiento", "Purpose": "Objetivo", "What you will find": "Qué encontrarás", "Approach": "Enfoque", "Remote sensing": "Teledetección", "GIS": "SIG", "Hydrological Modelling": "Modelización hidrológica", "Applications": "Aplicaciones", "Optical data": "Datos ópticos", "Radar": "Radar", "Indicators": "Indicadores", "Satellite": "Datos satelitales", "Climate": "Clima", "Forest & hydrology": "Bosque e hidrología", "Layers": "Capas", "Forest sites": "Zonas forestales", "Water-stress risk": "Riesgo de estrés hídrico", "Methodological notes": "Notas metodológicas", "Performance": "Rendimiento", "Model workflow": "Flujo de trabajo del modelo", "Terrain analysis": "Análisis del terreno", "Spatial databases": "Bases de datos espaciales", "← Back to articles": "← Volver a los artículos", "GIS • Remote Sensing • Hydrological Modelling": "SIG • Teledetección • Modelización hidrológica", "Forest water balance": "Balance hídrico forestal", "NDMI for forest drought assessment": "NDMI para la evaluación de la sequía forestal", "Mapping soil moisture with Sentinel-1": "Cartografía de la humedad del suelo con Sentinel-1", "Radar backscatter as a spatial indicator": "Retrodispersión radar como indicador espacial", "Forest hydrology applications": "Aplicaciones en hidrología forestal", "Spatial analysis, terrain, watersheds, databases and WebGIS workflows.": "Análisis espacial, terreno, cuencas, bases de datos y flujos de trabajo WebGIS.", "Sentinel, Landsat, UAV, vegetation and water-related indices.": "Sentinel, Landsat, UAV e índices relacionados con la vegetación y el agua.", "Catchment models, calibration, validation, scenarios and uncertainty.": "Modelos de cuenca, calibración, validación, escenarios e incertidumbre.", "Open geospatial, climate, soil, forest and hydrological datasets.": "Datos abiertos geoespaciales, climáticos, edáficos, forestales e hidrológicos."}};
const TITLES={"pl": {"Forest Hydrology | GIS • Remote Sensing • Hydrological Modelling": "Hydrologia leśna | GIS • Teledetekcja • Modelowanie hydrologiczne", "Articles | Forest Hydrology": "Artykuły | Hydrologia leśna", "GIS | Forest Hydrology": "GIS | Hydrologia leśna", "Remote Sensing | Forest Hydrology": "Teledetekcja | Hydrologia leśna", "Hydrological Modelling | Forest Hydrology": "Modelowanie hydrologiczne | Hydrologia leśna", "Data | Forest Hydrology": "Dane | Hydrologia leśna", "WebGIS | Forest Hydrology": "WebGIS | Hydrologia leśna", "About | Forest Hydrology": "O stronie | Hydrologia leśna"}, "es": {"Forest Hydrology | GIS • Remote Sensing • Hydrological Modelling": "Hidrología forestal | SIG • Teledetección • Modelización hidrológica", "Articles | Forest Hydrology": "Artículos | Hidrología forestal", "GIS | Forest Hydrology": "SIG | Hidrología forestal", "Remote Sensing | Forest Hydrology": "Teledetección | Hidrología forestal", "Hydrological Modelling | Forest Hydrology": "Modelización hidrológica | Hidrología forestal", "Data | Forest Hydrology": "Datos | Hidrología forestal", "WebGIS | Forest Hydrology": "WebGIS | Hidrología forestal", "About | Forest Hydrology": "Acerca de | Hidrología forestal"}};
const names={pl:"PL",en:"EN",es:"ES"};

function replaceTextNodes(root,dict){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[]; let n;
  while(n=walker.nextNode()) nodes.push(n);
  nodes.forEach(node=>{
    const raw=node.nodeValue, key=raw.trim();
    if(dict[key]) node.nodeValue=raw.replace(key,dict[key]);
  });
}
function apply(lang){
  const dict=T[lang]||{};
  document.documentElement.lang=lang;
  replaceTextNodes(document.body,dict);
  const original=document.documentElement.dataset.originalTitle||document.title;
  document.documentElement.dataset.originalTitle=original;
  document.title=(TITLES[lang]&&TITLES[lang][original])||original;
  document.querySelectorAll(".language-switcher button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
}
function go(lang){
  localStorage.setItem("foresthydrology-language",lang);
  const u=new URL(location.href);
  u.searchParams.set("lang",lang);
  location.replace(u.href);
}
function init(){
  const wrap=document.querySelector(".nav-wrap");
  if(wrap && !wrap.querySelector(".language-switcher")){
    const box=document.createElement("div");
    box.className="language-switcher";
    Object.keys(names).forEach(lang=>{
      const b=document.createElement("button");
      b.type="button"; b.dataset.lang=lang; b.textContent=names[lang];
      b.addEventListener("click",()=>go(lang));
      box.appendChild(b);
    });
    wrap.appendChild(box);
  }
  const q=new URLSearchParams(location.search).get("lang");
  const lang=q||localStorage.getItem("foresthydrology-language")||"en";
  if(q) localStorage.setItem("foresthydrology-language",lang);
  apply(["pl","en","es"].includes(lang)?lang:"en");

  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav");
  if(toggle&&nav&&!toggle.dataset.bound){
    toggle.dataset.bound="1";
    toggle.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded",String(open));
    });
  }
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();