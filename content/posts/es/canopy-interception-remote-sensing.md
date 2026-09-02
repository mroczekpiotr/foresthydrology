La intercepción del dosel — la fracción de la lluvia retenida y evaporada por hojas y ramas antes de llegar al suelo — es difícil de medir directamente a gran escala. Los pluviómetros de trascolación en campo dan estimaciones puntuales; los productos satelitales de índice de área foliar (LAI) permiten extender esas estimaciones a cuencas enteras.

## Por qué el LAI es una aproximación razonable

La capacidad de almacenamiento por intercepción escala, en una primera aproximación, con la cantidad de superficie de hojas y ramas disponible para retener agua. Las series temporales de LAI de sensores como MODIS o productos derivados de Sentinel-2 siguen el desarrollo del dosel a lo largo de la temporada de crecimiento, lo que las convierte en una covariable útil para modelos estacionales de intercepción — alta en pleno follaje, más baja tras la caída de hojas en rodales caducifolios.

## Consideraciones prácticas

Algunas cosas que conviene revisar antes de confiar en una estimación de intercepción basada en LAI:

- **Saturación en LAI alto.** Los productos ópticos de LAI tienden a saturarse por encima de LAI ≈ 5–6, algo común en rodales densos de coníferas, lo que aplana la relación aparente con la capacidad de intercepción.
- **Píxeles mixtos en bordes forestales.** Un píxel MODIS de 500 m que abarca el límite de una corta a hecho reportará un LAI que no representa bien ninguna de las dos coberturas — conviene recortar cuidadosamente a la máscara de la cuenca.
- **Contribución del sotobosque.** Los productos de LAI suelen medir el dosel total, no solo el estrato superior; en cuencas con sotobosque denso, la intercepción atribuida "al bosque" puede incluir una capa arbustiva con una dinámica de almacenamiento muy distinta.

## Un flujo de trabajo simple

1. Extraer un compuesto de LAI libre de nubes sobre la cuenca para cada paso temporal de interés.
2. Convertir el LAI en una estimación de capacidad de almacenamiento del dosel usando un coeficiente específico de especie o tipo de rodal tomado de la literatura (varían de forma importante entre rodales de coníferas y de frondosas).
3. Alimentar un modelo simple de intercepción (por ejemplo, un modelo analítico tipo Rutter o Gash) con la capacidad de almacenamiento resultante y datos locales de intensidad de lluvia.
4. Validar frente a cualquier medición de trascolación disponible, aunque sea de una breve campaña de campo, antes de confiar en los resultados a escala de cuenca.

Esto es deliberadamente un punto de partida, no un flujo de trabajo terminado — la elección del coeficiente en el paso 2 suele importar más que cualquier otra cosa en el proceso.
