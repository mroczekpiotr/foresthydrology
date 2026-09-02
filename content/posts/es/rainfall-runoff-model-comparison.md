Elegir una estructura de modelo lluvia-escorrentía para una pequeña cuenca forestal suele reducirse a un equilibrio entre la disponibilidad de datos y las preguntas que realmente hay que responder. Esta es una breve comparación de estructuras agregadas (lumped) y semidistribuidas en tres cuencas de cabecera con distinta cobertura forestal.

## Las tres cuencas

- **Cuenca A** — 4,2 km², ~90% de cobertura de coníferas, terreno escarpado.
- **Cuenca B** — 6,8 km², bosque mixto con pastizal (~55% forestal), relieve moderado.
- **Cuenca C** — 3,1 km², rodal de coníferas raleado recientemente, pendientes suaves.

## Modelos agregados (lumped)

Un modelo conceptual agregado (compartimentos de almacenamiento únicos, forzamiento promediado para toda la cuenca) funcionó razonablemente bien en la Cuenca A, donde la cobertura forestal es casi uniforme y el terreno no genera fuertes gradientes espaciales de precipitación o radiación. La calibración fue rápida y la identificabilidad de los parámetros fue buena.

En la Cuenca B, la estructura agregada tuvo dificultades para reproducir el hidrograma de doble pico típico de tormentas en las que llueve simultáneamente sobre bosque y pastizal abierto — el modelo no tiene forma de representar los distintos tiempos de respuesta de ambas coberturas.

## Modelos semidistribuidos

Dividir la Cuenca B en subunidades de bosque y pastizal, cada una con sus propios parámetros de almacenamiento y tránsito, resolvió la mayor parte del problema del doble pico, a costa de un proceso de calibración más largo y un riesgo real de sobreparametrización dado el registro limitado de caudal disponible para validación.

En la Cuenca C, la estructura semidistribuida resultó útil por otra razón: permitió representar el rodal raleado como una subunidad diferenciada con parámetros distintos de intercepción y evapotranspiración, algo relevante porque el raleo ocurrió a mitad del periodo de observación.

## Conclusiones

- Empieza con un modelo agregado. Añade estructura espacial solo cuando tengas una hipótesis concreta sobre por qué la respuesta difiere dentro de la cuenca (cambio de cobertura, fuerte gradiente altitudinal, uso mixto del suelo).
- Cada subunidad añadida son parámetros añadidos. Comprueba la identificabilidad antes de confiar en los valores calibrados, especialmente con registros de caudal cortos.
- Un cambio de uso del suelo a mitad del registro (raleo, corta, daños por tormenta) es una de las razones más sólidas para preferir estructuras semidistribuidas incluso en cuencas por lo demás homogéneas.
