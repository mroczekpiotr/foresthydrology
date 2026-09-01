(() => {
  const translations = {
    pl: {
      "Articles":"Artykuły","Remote Sensing":"Teledetekcja","Modelling":"Modelowanie","Data":"Dane","About":"O stronie",
      "FOREST • WATER • DATA":"LAS • WODA • DANE",
      "Understanding forest–water interactions through":"Zrozumienie zależności między lasem a wodą poprzez",
      "and modelling.":"i modelowanie.",
      "A practical knowledge platform about forest hydrology, GIS, remote sensing and hydrological modelling.":"Praktyczna platforma wiedzy o hydrologii leśnej, GIS, teledetekcji i modelowaniu hydrologicznym.",
      "Explore articles":"Przeglądaj artykuły","Explore WebGIS":"Otwórz WebGIS",
      "FOREST WATER SYSTEM":"SYSTEM WODY LEŚNEJ","Featured visualisation":"Wyróżniona wizualizacja",
      "Forest water stress & hydrological indicators":"Stres wodny lasów i wskaźniki hydrologiczne",
      "EXPLORE":"ODKRYWAJ","Core topics":"Główne zagadnienia",
      "Spatial analysis, terrain, watersheds, databases and WebGIS workflows.":"Analizy przestrzenne, rzeźba terenu, zlewnie, bazy danych i workflow WebGIS.",
      "Remote Sensing":"Teledetekcja","Sentinel, Landsat, UAV, vegetation and water-related indices.":"Sentinel, Landsat, UAV oraz wskaźniki roślinności i wody.",
      "Hydrological Modelling":"Modelowanie hydrologiczne","Catchment models, calibration, validation, scenarios and uncertainty.":"Modele zlewniowe, kalibracja, walidacja, scenariusze i niepewność.",
      "Open geospatial, climate, soil, forest and hydrological datasets.":"Otwarte dane geoprzestrzenne, klimatyczne, glebowe, leśne i hydrologiczne.",
      "LATEST":"NAJNOWSZE","Featured articles":"Wyróżnione artykuły","View all →":"Zobacz wszystkie →",
      "What NDMI measures, how it is calculated and how it can be interpreted in forest water-stress studies.":"Co mierzy NDMI, jak się go oblicza i jak można go interpretować w badaniach stresu wodnego lasów.",
      "A practical workflow for connecting radar observations with spatial analysis of forest sites.":"Praktyczny workflow łączący obserwacje radarowe z analizą przestrzenną obszarów leśnych.",
      "A framework for precipitation, interception, evapotranspiration, soil storage and runoff.":"Schemat obejmujący opad, intercepcję, ewapotranspirację, retencję glebową i odpływ.",
      "READ ARTICLE →":"CZYTAJ ARTYKUŁ →",
      "Explore forest water in space":"Odkrywaj wodę w lesie w przestrzeni",
      "Interactive maps can connect forest inventory, satellite indicators, soil moisture, terrain, groundwater and hydrological model outputs.":"Interaktywne mapy mogą łączyć dane inwentaryzacji lasów, wskaźniki satelitarne, wilgotność gleby, rzeźbę terenu, wody gruntowe i wyniki modeli hydrologicznych.",
      "Open WebGIS":"Otwórz WebGIS","FOREST WATER INDICATORS":"WSKAŹNIKI WODY LEŚNEJ",
      "Independent knowledge platform":"Niezależna platforma wiedzy",
      "Practical notes and explainers covering forest hydrology, GIS, remote sensing and hydrological modelling.":"Praktyczne opracowania dotyczące hydrologii leśnej, GIS, teledetekcji i modelowania hydrologicznego.",
      "Remote sensing":"Teledetekcja","NDVI, NDMI, NDWI, NBR, NDRE, soil moisture and other indicators.":"NDVI, NDMI, NDWI, NBR, NDRE, wilgotność gleby i inne wskaźniki.",
      "GIS":"GIS","QGIS workflows, spatial analysis, terrain metrics, databases and WebGIS.":"Workflow QGIS, analizy przestrzenne, metryki terenu, bazy danych i WebGIS.",
      "Modelling":"Modelowanie","Water balance, runoff, evapotranspiration, calibration, validation and uncertainty.":"Bilans wodny, odpływ, ewapotranspiracja, kalibracja, walidacja i niepewność.",
      "Spatial analysis for forest hydrology: terrain, watersheds, spatial databases and WebGIS.":"Analizy przestrzenne w hydrologii leśnej: rzeźba terenu, zlewnie, bazy przestrzenne i WebGIS.",
      "Terrain analysis":"Analiza rzeźby terenu","DEM, slope, aspect, flow direction, flow accumulation and topographic wetness.":"NMT, nachylenie, ekspozycja, kierunek przepływu, akumulacja przepływu i wilgotność topograficzna.",
      "Spatial databases":"Bazy danych przestrzennych","PostGIS concepts for storing, querying and analysing large geospatial datasets.":"Koncepcje PostGIS dotyczące przechowywania, zapytań i analizy dużych zbiorów danych geoprzestrzennych.",
      "Publishing spatial layers and building interactive maps with modern web technologies.":"Publikowanie warstw przestrzennych i tworzenie interaktywnych map z wykorzystaniem nowoczesnych technologii webowych.",
      "Satellite and UAV observations for monitoring vegetation, water availability and forest response.":"Obserwacje satelitarne i UAV do monitorowania roślinności, dostępności wody i reakcji lasu.",
      "Optical data":"Dane optyczne","Sentinel-2 and Landsat for vegetation, moisture and disturbance indicators.":"Sentinel-2 i Landsat do analizy roślinności, wilgotności i wskaźników zaburzeń.",
      "Radar":"Radar","Sentinel-1 and radar backscatter for soil-moisture and structural information.":"Sentinel-1 i rozpraszanie wsteczne radaru do informacji o wilgotności gleby i strukturze.",
      "Indicators":"Wskaźniki","NDVI, NDMI, NDWI, EVI, NBR, NDRE, LAI and related metrics.":"NDVI, NDMI, NDWI, EVI, NBR, NDRE, LAI i powiązane metryki.",
      "Hydrological modelling workflows for forested catchments and water-balance studies.":"Workflow modelowania hydrologicznego dla zalesionych zlewni i badań bilansu wodnego.",
      "Model workflow":"Workflow modelu","Data preparation → parameterisation → calibration → validation → scenario analysis.":"Przygotowanie danych → parametryzacja → kalibracja → walidacja → analiza scenariuszy.",
      "Performance":"Ocena jakości","NSE, KGE, RMSE, PBIAS, sensitivity and uncertainty analysis.":"NSE, KGE, RMSE, PBIAS, analiza wrażliwości i niepewności.",
      "Applications":"Zastosowania","Runoff, evapotranspiration, drought, groundwater interactions and forest-management scenarios.":"Odpływ, ewapotranspiracja, susza, interakcje z wodami gruntowymi i scenariusze gospodarowania lasem.",
      "A practical guide to geospatial, climate, soil, forest and hydrological datasets.":"Praktyczny przewodnik po danych geoprzestrzennych, klimatycznych, glebowych, leśnych i hydrologicznych.",
      "Satellite":"Dane satelitarne","Sentinel-1, Sentinel-2, Landsat and other Earth-observation sources.":"Sentinel-1, Sentinel-2, Landsat i inne źródła obserwacji Ziemi.",
      "Climate":"Klimat","Precipitation, temperature, radiation and potential evapotranspiration.":"Opad, temperatura, promieniowanie i potencjalna ewapotranspiracja.",
      "Forest & hydrology":"Las i hydrologia","Forest structure, soil properties, streamflow, groundwater and evapotranspiration.":"Struktura lasu, właściwości gleby, przepływ rzeczny, wody gruntowe i ewapotranspiracja.",
      "Forest water — interactive map":"Woda w lesie — mapa interaktywna","Prototype map prepared for future connection to GeoServer, PostGIS, GeoJSON and raster services.":"Mapa demonstracyjna przygotowana z myślą o przyszłym połączeniu z GeoServer, PostGIS, GeoJSON i usługami rastrowymi.",
      "Layers":"Warstwy","Forest sites":"Obszary leśne","Water-stress risk":"Ryzyko stresu wodnego",
      "This prototype uses sample points. Replace the GeoJSON in":"Ten prototyp wykorzystuje przykładowe punkty. Zastąp plik GeoJSON w",
      "with your own data or connect the map to WMS/WFS later.":"własnymi danymi lub później podłącz mapę do WMS/WFS.",
      "Interactive forest hydrology map":"Interaktywna mapa hydrologii leśnej",
      "ForestHydrology.com is an independent knowledge platform focused on forest–water interactions and the application of GIS, remote sensing and hydrological modelling.":"ForestHydrology.com to niezależna platforma wiedzy poświęcona zależnościom między lasem a wodą oraz zastosowaniu GIS, teledetekcji i modelowania hydrologicznego.",
      "Purpose":"Cel","The goal is to connect scientific concepts with reproducible spatial workflows, open data and practical examples.":"Celem jest łączenie koncepcji naukowych z powtarzalnymi workflow przestrzennymi, otwartymi danymi i praktycznymi przykładami.",
      "What you will find":"Co znajdziesz na stronie","Articles, GIS tutorials, remote-sensing methods, hydrological modelling workflows, datasets and interactive WebGIS experiments.":"Artykuły, tutoriale GIS, metody teledetekcyjne, workflow modelowania hydrologicznego, zbiory danych i interaktywne eksperymenty WebGIS.",
      "Approach":"Podejście","Methods are presented with attention to assumptions, spatial scale, data quality, uncertainty and reproducibility.":"Metody są przedstawiane z uwzględnieniem założeń, skali przestrzennej, jakości danych, niepewności i powtarzalności.",
      "Mapping soil moisture with Sentinel-1":"Mapowanie wilgotności gleby z Sentinel-1",
      "Sentinel-1 provides C-band synthetic aperture radar observations that can support spatial analysis of surface conditions. In forested areas, however, canopy structure strongly affects the signal.":"Sentinel-1 dostarcza obserwacji radarowych SAR w paśmie C, które mogą wspierać analizę przestrzenną warunków powierzchniowych. Na obszarach leśnych struktura koron silnie wpływa jednak na sygnał.",
      "Radar backscatter as a spatial indicator":"Rozpraszanie wsteczne radaru jako wskaźnik przestrzenny",
      "Methodological notes":"Uwagi metodyczne","A robust workflow requires careful preprocessing, terrain correction and attention to forest structure. For operational studies, combine radar information with field measurements or complementary optical and climatic data.":"Wiarygodny workflow wymaga starannego przetwarzania wstępnego, korekcji terenowej i uwzględnienia struktury lasu. W badaniach operacyjnych warto łączyć informacje radarowe z pomiarami terenowymi lub uzupełniającymi danymi optycznymi i klimatycznymi.",
      "Forest hydrology applications":"Zastosowania w hydrologii leśnej","Potential applications include drought assessment, spatial comparison of forest stands, time-series analysis and integration with hydrological models. Always document the sensor, processing chain, spatial resolution, temporal window and uncertainty.":"Potencjalne zastosowania obejmują ocenę suszy, przestrzenne porównanie drzewostanów, analizę szeregów czasowych i integrację z modelami hydrologicznymi. Zawsze dokumentuj sensor, łańcuch przetwarzania, rozdzielczość przestrzenną, okno czasowe i niepewność.",
      "← Back to articles":"← Powrót do artykułów",
      "Forest water balance":"Bilans wodny lasu",
      "A conceptual forest water balance links precipitation, interception, evapotranspiration, runoff and changes in storage. The exact formulation depends on the spatial and temporal scale of the study.":"Koncepcyjny bilans wodny lasu łączy opad, intercepcję, ewapotranspirację, odpływ i zmiany retencji. Dokładne sformułowanie zależy od skali przestrzennej i czasowej badania.",
      "GIS and remote sensing can provide spatial predictors and observations, while hydrological models can integrate these components through time. Validation should use independent observations wherever possible.":"GIS i teledetekcja mogą dostarczać przestrzennych predyktorów i obserwacji, a modele hydrologiczne mogą integrować te elementy w czasie. Walidacja powinna, o ile to możliwe, wykorzystywać niezależne obserwacje.",
      "NDMI for forest drought assessment":"NDMI w ocenie suszy lasów",
      "The Normalized Difference Moisture Index is commonly used as an indicator related to vegetation water content. In forest studies, temporal changes can help identify vegetation response to drying conditions.":"Znormalizowany różnicowy wskaźnik wilgotności (NDMI) jest powszechnie stosowany jako wskaźnik związany z zawartością wody w roślinności. W badaniach leśnych zmiany w czasie mogą pomóc identyfikować reakcję roślinności na warunki wysychania.",
      "For Sentinel-2, a common implementation uses NIR and SWIR bands. The interpretation should consider canopy structure, seasonality, atmospheric correction and spatial scale. NDMI is an indicator, not a direct measurement of soil or groundwater moisture.":"Dla Sentinel-2 często wykorzystuje się pasma NIR i SWIR. Interpretacja powinna uwzględniać strukturę koron, sezonowość, korekcję atmosferyczną i skalę przestrzenną. NDMI jest wskaźnikiem, a nie bezpośrednim pomiarem wilgotności gleby lub wód gruntowych.",
      "GIS • Remote Sensing • Hydrological Modelling":"GIS • Teledetekcja • Modelowanie hydrologiczne",
      "Independent knowledge platform":"Niezależna platforma wiedzy"
    },
    es: {
      "Articles":"Artículos","Remote Sensing":"Teledetección","Modelling":"Modelización","Data":"Datos","About":"Acerca de",
      "FOREST • WATER • DATA":"BOSQUE • AGUA • DATOS",
      "Understanding forest–water interactions through":"Comprender las interacciones entre los bosques y el agua mediante",
      "and modelling.":"y la modelización.",
      "A practical knowledge platform about forest hydrology, GIS, remote sensing and hydrological modelling.":"Una plataforma práctica de conocimiento sobre hidrología forestal, SIG, teledetección y modelización hidrológica.",
      "Explore articles":"Explorar artículos","Explore WebGIS":"Explorar WebGIS",
      "FOREST WATER SYSTEM":"SISTEMA HÍDRICO FORESTAL","Featured visualisation":"Visualización destacada",
      "Forest water stress & hydrological indicators":"Estrés hídrico forestal e indicadores hidrológicos",
      "EXPLORE":"EXPLORAR","Core topics":"Temas principales",
      "Spatial analysis, terrain, watersheds, databases and WebGIS workflows.":"Análisis espacial, terreno, cuencas, bases de datos y flujos de trabajo WebGIS.",
      "Sentinel, Landsat, UAV, vegetation and water-related indices.":"Sentinel, Landsat, UAV e índices relacionados con la vegetación y el agua.",
      "Hydrological Modelling":"Modelización hidrológica","Catchment models, calibration, validation, scenarios and uncertainty.":"Modelos de cuenca, calibración, validación, escenarios e incertidumbre.",
      "Open geospatial, climate, soil, forest and hydrological datasets.":"Datos abiertos geoespaciales, climáticos, edáficos, forestales e hidrológicos.",
      "LATEST":"NOVEDADES","Featured articles":"Artículos destacados","View all →":"Ver todos →",
      "What NDMI measures, how it is calculated and how it can be interpreted in forest water-stress studies.":"Qué mide el NDMI, cómo se calcula y cómo puede interpretarse en estudios de estrés hídrico forestal.",
      "A practical workflow for connecting radar observations with spatial analysis of forest sites.":"Un flujo de trabajo práctico para conectar observaciones radar con el análisis espacial de zonas forestales.",
      "A framework for precipitation, interception, evapotranspiration, soil storage and runoff.":"Un marco para la precipitación, intercepción, evapotranspiración, almacenamiento del suelo y escorrentía.",
      "READ ARTICLE →":"LEER ARTÍCULO →","Explore forest water in space":"Explorar el agua forestal en el espacio",
      "Interactive maps can connect forest inventory, satellite indicators, soil moisture, terrain, groundwater and hydrological model outputs.":"Los mapas interactivos pueden conectar inventarios forestales, indicadores satelitales, humedad del suelo, terreno, aguas subterráneas y resultados de modelos hidrológicos.",
      "Open WebGIS":"Abrir WebGIS","FOREST WATER INDICATORS":"INDICADORES DEL AGUA FORESTAL",
      "Independent knowledge platform":"Plataforma independiente de conocimiento",
      "Practical notes and explainers covering forest hydrology, GIS, remote sensing and hydrological modelling.":"Notas prácticas y explicaciones sobre hidrología forestal, SIG, teledetección y modelización hidrológica.",
      "Remote sensing":"Teledetección","NDVI, NDMI, NDWI, NBR, NDRE, soil moisture and other indicators.":"NDVI, NDMI, NDWI, NBR, NDRE, humedad del suelo y otros indicadores.",
      "QGIS workflows, spatial analysis, terrain metrics, databases and WebGIS.":"Flujos de trabajo de QGIS, análisis espacial, métricas del terreno, bases de datos y WebGIS.",
      "Water balance, runoff, evapotranspiration, calibration, validation and uncertainty.":"Balance hídrico, escorrentía, evapotranspiración, calibración, validación e incertidumbre.",
      "Spatial analysis for forest hydrology: terrain, watersheds, spatial databases and WebGIS.":"Análisis espacial para la hidrología forestal: terreno, cuencas, bases de datos espaciales y WebGIS.",
      "Terrain analysis":"Análisis del terreno","DEM, slope, aspect, flow direction, flow accumulation and topographic wetness.":"MDE, pendiente, orientación, dirección del flujo, acumulación del flujo y humedad topográfica.",
      "Spatial databases":"Bases de datos espaciales","PostGIS concepts for storing, querying and analysing large geospatial datasets.":"Conceptos de PostGIS para almacenar, consultar y analizar grandes conjuntos de datos geoespaciales.",
      "Publishing spatial layers and building interactive maps with modern web technologies.":"Publicación de capas espaciales y creación de mapas interactivos con tecnologías web modernas.",
      "Satellite and UAV observations for monitoring vegetation, water availability and forest response.":"Observaciones satelitales y UAV para monitorizar la vegetación, la disponibilidad de agua y la respuesta forestal.",
      "Optical data":"Datos ópticos","Sentinel-2 and Landsat for vegetation, moisture and disturbance indicators.":"Sentinel-2 y Landsat para indicadores de vegetación, humedad y perturbaciones.",
      "Radar":"Radar","Sentinel-1 and radar backscatter for soil-moisture and structural information.":"Sentinel-1 y retrodispersión radar para información sobre humedad del suelo y estructura.",
      "Indicators":"Indicadores","NDVI, NDMI, NDWI, EVI, NBR, NDRE, LAI and related metrics.":"NDVI, NDMI, NDWI, EVI, NBR, NDRE, LAI y métricas relacionadas.",
      "Hydrological modelling workflows for forested catchments and water-balance studies.":"Flujos de trabajo de modelización hidrológica para cuencas forestales y estudios de balance hídrico.",
      "Model workflow":"Flujo de trabajo del modelo","Data preparation → parameterisation → calibration → validation → scenario analysis.":"Preparación de datos → parametrización → calibración → validación → análisis de escenarios.",
      "Performance":"Rendimiento","NSE, KGE, RMSE, PBIAS, sensitivity and uncertainty analysis.":"NSE, KGE, RMSE, PBIAS, análisis de sensibilidad e incertidumbre.",
      "Applications":"Aplicaciones","Runoff, evapotranspiration, drought, groundwater interactions and forest-management scenarios.":"Escorrentía, evapotranspiración, sequía, interacciones con aguas subterráneas y escenarios de gestión forestal.",
      "A practical guide to geospatial, climate, soil, forest and hydrological datasets.":"Una guía práctica de datos geoespaciales, climáticos, edáficos, forestales e hidrológicos.",
      "Satellite":"Datos satelitales","Sentinel-1, Sentinel-2, Landsat and other Earth-observation sources.":"Sentinel-1, Sentinel-2, Landsat y otras fuentes de observación de la Tierra.",
      "Climate":"Clima","Precipitation, temperature, radiation and potential evapotranspiration.":"Precipitación, temperatura, radiación y evapotranspiración potencial.",
      "Forest & hydrology":"Bosque e hidrología","Forest structure, soil properties, streamflow, groundwater and evapotranspiration.":"Estructura forestal, propiedades del suelo, caudal, aguas subterráneas y evapotranspiración.",
      "Forest water — interactive map":"Agua forestal — mapa interactivo","Prototype map prepared for future connection to GeoServer, PostGIS, GeoJSON and raster services.":"Mapa prototipo preparado para una futura conexión con GeoServer, PostGIS, GeoJSON y servicios ráster.",
      "Layers":"Capas","Forest sites":"Zonas forestales","Water-stress risk":"Riesgo de estrés hídrico",
      "This prototype uses sample points. Replace the GeoJSON in":"Este prototipo utiliza puntos de ejemplo. Sustituye el GeoJSON en",
      "with your own data or connect the map to WMS/WFS later.":"por tus propios datos o conecta el mapa a WMS/WFS más adelante.",
      "Interactive forest hydrology map":"Mapa interactivo de hidrología forestal",
      "ForestHydrology.com is an independent knowledge platform focused on forest–water interactions and the application of GIS, remote sensing and hydrological modelling.":"ForestHydrology.com es una plataforma independiente de conocimiento centrada en las interacciones entre los bosques y el agua y en la aplicación de SIG, teledetección y modelización hidrológica.",
      "Purpose":"Objetivo","The goal is to connect scientific concepts with reproducible spatial workflows, open data and practical examples.":"El objetivo es conectar conceptos científicos con flujos de trabajo espaciales reproducibles, datos abiertos y ejemplos prácticos.",
      "What you will find":"Qué encontrarás","Articles, GIS tutorials, remote-sensing methods, hydrological modelling workflows, datasets and interactive WebGIS experiments.":"Artículos, tutoriales de SIG, métodos de teledetección, flujos de trabajo de modelización hidrológica, conjuntos de datos y experimentos WebGIS interactivos.",
      "Approach":"Enfoque","Methods are presented with attention to assumptions, spatial scale, data quality, uncertainty and reproducibility.":"Los métodos se presentan teniendo en cuenta los supuestos, la escala espacial, la calidad de los datos, la incertidumbre y la reproducibilidad.",
      "Mapping soil moisture with Sentinel-1":"Cartografía de la humedad del suelo con Sentinel-1",
      "Sentinel-1 provides C-band synthetic aperture radar observations that can support spatial analysis of surface conditions. In forested areas, however, canopy structure strongly affects the signal.":"Sentinel-1 proporciona observaciones de radar de apertura sintética en banda C que pueden apoyar el análisis espacial de las condiciones de la superficie. Sin embargo, en zonas forestales la estructura del dosel afecta fuertemente a la señal.",
      "Radar backscatter as a spatial indicator":"Retrodispersión radar como indicador espacial",
      "Methodological notes":"Notas metodológicas","A robust workflow requires careful preprocessing, terrain correction and attention to forest structure. For operational studies, combine radar information with field measurements or complementary optical and climatic data.":"Un flujo de trabajo robusto requiere un preprocesamiento cuidadoso, corrección del terreno y atención a la estructura forestal. Para estudios operativos, combina la información radar con mediciones de campo o datos ópticos y climáticos complementarios.",
      "Forest hydrology applications":"Aplicaciones en hidrología forestal","Potential applications include drought assessment, spatial comparison of forest stands, time-series analysis and integration with hydrological models. Always document the sensor, processing chain, spatial resolution, temporal window and uncertainty.":"Las aplicaciones potenciales incluyen la evaluación de la sequía, la comparación espacial de masas forestales, el análisis de series temporales y la integración con modelos hidrológicos. Documenta siempre el sensor, la cadena de procesamiento, la resolución espacial, la ventana temporal y la incertidumbre.",
      "← Back to articles":"← Volver a los artículos",
      "Forest water balance":"Balance hídrico forestal",
      "A conceptual forest water balance links precipitation, interception, evapotranspiration, runoff and changes in storage. The exact formulation depends on the spatial and temporal scale of the study.":"Un balance hídrico forestal conceptual relaciona la precipitación, la intercepción, la evapotranspiración, la escorrentía y los cambios en el almacenamiento. La formulación exacta depende de la escala espacial y temporal del estudio.",
      "GIS and remote sensing can provide spatial predictors and observations, while hydrological models can integrate these components through time. Validation should use independent observations wherever possible.":"El SIG y la teledetección pueden proporcionar predictores espaciales y observaciones, mientras que los modelos hidrológicos pueden integrar estos componentes a lo largo del tiempo. La validación debería utilizar observaciones independientes siempre que sea posible.",
      "NDMI for forest drought assessment":"NDMI para la evaluación de la sequía forestal",
      "The Normalized Difference Moisture Index is commonly used as an indicator related to vegetation water content. In forest studies, temporal changes can help identify vegetation response to drying conditions.":"El Índice de Humedad de Diferencia Normalizada (NDMI) se utiliza habitualmente como indicador relacionado con el contenido de agua de la vegetación. En estudios forestales, los cambios temporales pueden ayudar a identificar la respuesta de la vegetación a condiciones de secado.",
      "For Sentinel-2, a common implementation uses NIR and SWIR bands. The interpretation should consider canopy structure, seasonality, atmospheric correction and spatial scale. NDMI is an indicator, not a direct measurement of soil or groundwater moisture.":"Para Sentinel-2, una implementación habitual utiliza las bandas NIR y SWIR. La interpretación debe considerar la estructura del dosel, la estacionalidad, la corrección atmosférica y la escala espacial. El NDMI es un indicador, no una medición directa de la humedad del suelo o de las aguas subterráneas.",
      "GIS • Remote Sensing • Hydrological Modelling":"SIG • Teledetección • Modelización hidrológica"
    }
  };

  const titleTranslations = {
    pl: {"Forest Hydrology | GIS • Remote Sensing • Hydrological Modelling":"Hydrologia leśna | GIS • Teledetekcja • Modelowanie hydrologiczne","Articles | Forest Hydrology":"Artykuły | Hydrologia leśna","GIS | Forest Hydrology":"GIS | Hydrologia leśna","Remote Sensing | Forest Hydrology":"Teledetekcja | Hydrologia leśna","Hydrological Modelling | Forest Hydrology":"Modelowanie hydrologiczne | Hydrologia leśna","Data | Forest Hydrology":"Dane | Hydrologia leśna","WebGIS | Forest Hydrology":"WebGIS | Hydrologia leśna","About | Forest Hydrology":"O stronie | Hydrologia leśna","Mapping soil moisture with Sentinel-1 | Forest Hydrology":"Mapowanie wilgotności gleby z Sentinel-1 | Hydrologia leśna","Forest water balance | Forest Hydrology":"Bilans wodny lasu | Hydrologia leśna","NDMI for forest drought assessment | Forest Hydrology":"NDMI w ocenie suszy lasów | Hydrologia leśna"},
    es: {"Forest Hydrology | GIS • Remote Sensing • Hydrological Modelling":"Hidrología forestal | SIG • Teledetección • Modelización hidrológica","Articles | Forest Hydrology":"Artículos | Hidrología forestal","GIS | Forest Hydrology":"SIG | Hidrología forestal","Remote Sensing | Forest Hydrology":"Teledetección | Hidrología forestal","Hydrological Modelling | Forest Hydrology":"Modelización hidrológica | Hidrología forestal","Data | Forest Hydrology":"Datos | Hidrología forestal","WebGIS | Forest Hydrology":"WebGIS | Hidrología forestal","About | Forest Hydrology":"Acerca de | Hidrología forestal","Mapping soil moisture with Sentinel-1 | Forest Hydrology":"Cartografía de la humedad del suelo con Sentinel-1 | Hidrología forestal","Forest water balance | Forest Hydrology":"Balance hídrico forestal | Hidrología forestal","NDMI for forest drought assessment | Forest Hydrology":"NDMI para la evaluación de la sequía forestal | Hidrología forestal"}
  };
  const langNames = {pl:"PL", en:"EN", es:"ES"};
  const path = location.pathname;
  const base = path.includes("/articles/") ? "../" : "";
  const switcher = document.createElement("div");
  switcher.className = "language-switcher";
  switcher.setAttribute("aria-label","Language");
  Object.keys(langNames).forEach(lang => {
    const b=document.createElement("button");
    b.type="button"; b.dataset.lang=lang; b.textContent=langNames[lang];
    b.addEventListener("click",()=>setLanguage(lang));
    switcher.appendChild(b);
  });
  document.querySelector(".nav-wrap")?.appendChild(switcher);

  function applyMap(obj){
    document.querySelectorAll("body *").forEach(el=>{
      el.childNodes.forEach(node=>{
        if(node.nodeType===Node.TEXT_NODE){
          const key=node.nodeValue.trim();
          if(obj[key]) node.nodeValue=node.nodeValue.replace(key,obj[key]);
        }
      });
    });
    document.title = titleTranslations[document.documentElement.lang]?.[document.title] || document.title;
    document.querySelectorAll('meta[name="description"]').forEach(m=>{
      const key=m.content; if(obj[key]) m.content=obj[key];
    });
  }
  function setLanguage(lang){
    localStorage.setItem("foresthydrology-language",lang);
    document.documentElement.lang=lang;
    applyMap(translations[lang] || {});
    switcher.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  }
  const saved=localStorage.getItem("foresthydrology-language") || "pl";
  setLanguage(saved);

  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav");
  if(toggle && nav){
    toggle.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded",String(open));
    });
  }
})();