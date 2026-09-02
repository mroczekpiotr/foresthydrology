Delimitar el contorno de una cuenca suele ser el primer paso en cualquier estudio de hidrología forestal — antes de hablar de intercepción, infiltración o caudal, hay que saber exactamente qué porción de terreno drena hacia nuestro punto de interés.

## Punto de partida: el MDE

La mayoría de los flujos de trabajo comienzan con un modelo digital de elevación (MDE). En cuencas de cabecera, la resolución importa más que la extensión: una escena SRTM de 30 m suele ser demasiado gruesa para resolver pequeños cauces de primer orden bajo el dosel, mientras que un MDE derivado de LiDAR de 1–5 m puede captar rasgos sutiles del terreno que controlan las rutas de flujo.

Antes de delimitar nada, conviene rellenar las depresiones y resolver las zonas planas. Las depresiones sin rellenar —a menudo artefactos del propio MDE más que rasgos reales del paisaje— rompen la acumulación de flujo aguas abajo.

## Dirección y acumulación de flujo

Una vez acondicionado hidrológicamente el MDE, la secuencia estándar es:

1. Calcular la dirección de flujo (D8, D-infinity o MFD, según cuánto importe el flujo disperso en pendientes suaves).
2. Calcular la acumulación de flujo a partir de la malla de direcciones.
3. Aplicar un umbral a la malla de acumulación para definir la red de cauces.
4. Ajustar el punto de desagüe a la celda de mayor acumulación más cercana.
5. Delimitar la cuenca aguas arriba de ese punto de desagüe.

Bajo dosel denso, los caminos forestales y las rutas de arrastre pueden parecer visualmente cauces en un MDE derivado de fotogrametría — conviene siempre verificarlos frente a un MDE LiDAR capaz de penetrar el dosel.

## Una nota sobre la ubicación del punto de desagüe

Pequeños errores en la ubicación del punto de desagüe pueden producir errores desproporcionadamente grandes en el área de cuenca delimitada para cuencas de cabecera pequeñas, simplemente porque la red de cauces es corta y empinada. Ajustar al píxel más cercano por encima de un umbral de acumulación de flujo, en lugar de a coordenadas en bruto, evita la mayoría de estos errores.

## Hacia dónde va esto

Una vez que se tiene un contorno de cuenca fiable, este se convierte en la unidad espacial para todo lo demás en este sitio: las composiciones de teledetección se recortan a ella, las entradas de los modelos se agregan sobre ella, y los datos de monitoreo se reportan respecto a ella.
