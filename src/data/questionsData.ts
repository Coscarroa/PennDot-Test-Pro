import { Question, DifficultyLevel } from '../types';

export const OFFICIAL_PENNDOT_QUESTIONS: Question[] = [
  // --- CAPÍTULO 2: SEÑALES, SEMÁFOROS Y MARCAS (Review Questions 1 to 58) ---
  {
    id: 'ch2-q1',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'Cuando vea esta señal de ALTO (STOP), usted debe:',
    textEn: 'When you see this red octagonal STOP sign, you must:',
    optionsEs: [
      'Detenerse por completo y ver si hay peatones y vehículos en el sentido contrario',
      'Reducir la velocidad sin detenerse por completo',
      'Detenerse por completo y esperar la luz verde',
      'Reducir la velocidad y ver si hay vehículos'
    ],
    optionsEn: [
      'Come to a complete stop and look for pedestrians and cross traffic',
      'Slow down without coming to a complete stop',
      'Stop completely and wait for a green light',
      'Slow down and look for vehicles'
    ],
    correctAnswer: 0,
    explanationEs: 'En toda intersección con señal de alto (STOP) deberá detenerse por completo antes de la línea de alto o cruce peatonal. Reducir la velocidad sin detenerse por completo (rolling stop) es ilegal.',
    explanationEn: 'At every STOP sign intersection, you must come to a complete stop before the stop line or crosswalk. Rolling stops are illegal in Pennsylvania.',
    manualRef: 'Capítulo 2, pág. 10 & 27 (Pregunta 1)',
    signId: 'sign-stop'
  },
  {
    id: 'ch2-q2',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'Esta es la forma y el color de una señal de:',
    textEn: 'This triangular shape and red-and-white color is the sign for:',
    optionsEs: [
      'Alto',
      'Sentido contrario',
      'Ceder el paso (YIELD)',
      'Prohibida la entrada'
    ],
    optionsEn: [
      'STOP',
      'Wrong way',
      'YIELD',
      'Do not enter'
    ],
    correctAnswer: 2,
    explanationEs: 'Las señales de Ceder el Paso (YIELD) son triangulares (3 lados apuntando hacia abajo). Debe reducir la velocidad y ceder el paso a los vehículos y peatones que cruzan.',
    explanationEn: 'YIELD signs are triangular (3 sides pointing downward). You must slow down and yield right-of-way to cross traffic and pedestrians.',
    manualRef: 'Capítulo 2, pág. 10 & 27 (Pregunta 2)',
    signId: 'sign-yield'
  },
  {
    id: 'ch2-q3',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal vial significa:',
    textEn: 'This road sign means:',
    optionsEs: [
      'Alto',
      'Prohibido girar en U',
      'Ceder el paso',
      'Prohibida la entrada / DO NOT ENTER'
    ],
    optionsEn: [
      'Stop',
      'No U-turn',
      'Yield',
      'DO NOT ENTER'
    ],
    correctAnswer: 3,
    explanationEs: 'La señal de prohibido el paso (DO NOT ENTER) aparece al comienzo de calles de un solo sentido y rampas de acceso para evitar choques frontales.',
    explanationEn: 'The DO NOT ENTER sign is placed at one-way street entrances and freeway ramps to prevent vehicles from entering oncoming flow.',
    manualRef: 'Capítulo 2, pág. 11 & 27 (Pregunta 3)',
    signId: 'sign-do-not-enter'
  },
  {
    id: 'ch2-q4',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con círculo rojo y barra oblicua significa:',
    textEn: 'This sign with a red slash means:',
    optionsEs: [
      'Prohibido girar en U (NO U-TURN)',
      'Prohibido girar',
      'Prohibido girar a la izquierda',
      'Prohibido girar a la derecha'
    ],
    optionsEn: [
      'NO U-TURN prohibited',
      'No turning',
      'No left turn',
      'No right turn'
    ],
    correctAnswer: 0,
    explanationEs: 'Esta señal prohíbe los giros en U. No gire en U para circular en sentido contrario.',
    explanationEn: 'This sign prohibits U-turns. Do not turn around to travel in the opposite direction.',
    manualRef: 'Capítulo 2, pág. 11 & 27 (Pregunta 4)',
    signId: 'sign-no-u-turn'
  },
  {
    id: 'ch2-q5',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal indica que:',
    textEn: 'This regulatory sign indicates:',
    optionsEs: [
      'Prohibido girar en U',
      'Prohibido girar a la izquierda',
      'Prohibido girar a la DERECHA (NO RIGHT TURN)',
      'Prohibido girar'
    ],
    optionsEn: [
      'No U-turn',
      'No left turn',
      'NO RIGHT TURN',
      'No turns allowed'
    ],
    correctAnswer: 2,
    explanationEs: 'Esta señal indica que se prohíben los giros a la derecha en esta intersección.',
    explanationEn: 'This sign means right turns are prohibited at this intersection.',
    manualRef: 'Capítulo 2, pág. 11 & 27 (Pregunta 5)',
    signId: 'sign-no-right-turn'
  },
  {
    id: 'ch2-q6',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal de "DIVIDED HIGHWAY" significa que:',
    textEn: 'This "DIVIDED HIGHWAY" sign means that:',
    optionsEs: [
      'Debe girar a la izquierda',
      'Se está acercando a una intersección en T',
      'La carretera por la que conduce cruza una autopista dividida',
      'Designa un paso elevado sobre una autopista dividida'
    ],
    optionsEn: [
      'You must turn left',
      'You are approaching a T-intersection',
      'The road you are driving on crosses a divided highway',
      'Designates an overpass above a divided highway'
    ],
    correctAnswer: 2,
    explanationEs: 'Significa que la calzada cruza una autopista dividida de dos sentidos separada por una mediana. En la primera calzada solo gira a la derecha y en la segunda a la izquierda.',
    explanationEn: 'It indicates that your roadway crosses a divided highway. In the first roadway you may only turn right; in the second, you may only turn left.',
    manualRef: 'Capítulo 2, pág. 11 & 27 (Pregunta 6)',
    signId: 'sign-divided-highway'
  },
  {
    id: 'ch2-q11',
    chapter: 2,
    category: 'signs',
    textEs: 'Si ve esta señal con panel amarillo "EXIT ONLY" arriba de su carril en la autopista, usted:',
    textEn: 'If you see this sign with yellow "EXIT ONLY" panel above your lane, you:',
    optionsEs: [
      'No puede salirse de la autopista en este carril',
      'Puede continuar en el enlace o salir de la autopista en este carril',
      'Puede permanecer en este carril y continuar hasta el enlace',
      'Debe salir de la autopista si permanece en este carril'
    ],
    optionsEn: [
      'Cannot exit the highway from this lane',
      'Can either continue or exit in this lane',
      'May stay in this lane and continue straight through',
      'Must exit the highway if you remain in this lane'
    ],
    correctAnswer: 3,
    explanationEs: 'El panel amarillo EXIT ONLY significa que ese carril terminará y se convertirá en rampa de salida obligatoria.',
    explanationEn: 'The yellow EXIT ONLY panel means the lane forms the exit ramp. You must exit if you stay in that lane.',
    manualRef: 'Capítulo 2, pág. 19 & 28 (Pregunta 11)',
    signId: 'sign-exit-only'
  },
  {
    id: 'ch2-q13',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal amarilla de rombo con flecha curva se usa para advertir a los conductores sobre:',
    textEn: 'This yellow diamond sign with a curved arrow warns drivers of:',
    optionsEs: [
      'Intersecciones próximas',
      'Construcción de carretera',
      'Se aproxima a una curva hacia la derecha',
      'Cambios en los carriles'
    ],
    optionsEn: [
      'Upcoming intersections',
      'Road construction',
      'Curve ahead to the right',
      'Lane changes'
    ],
    correctAnswer: 2,
    explanationEs: 'Advierte que la carretera dobla hacia la derecha más adelante. Debe reducir la velocidad y posicionar su vehículo ligeramente a la derecha del centro de su carril.',
    explanationEn: 'Warns that the road bends to the right ahead. Slow down and position your car slightly right of center of your lane.',
    manualRef: 'Capítulo 2, pág. 13 & 28 (Pregunta 13)',
    signId: 'sign-curve-right'
  },
  {
    id: 'ch2-q14',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con línea sinuosa (Winding Road) indica que:',
    textEn: 'This winding road warning sign indicates that:',
    optionsEs: [
      'No se permite girar en esta carretera',
      'La carretera se vuelve más angosta',
      'Se aproxima a una serie de tres (3) curvas seguidas o más',
      'La carretera puede estar resbalosa cuando está mojada'
    ],
    optionsEn: [
      'No turns allowed',
      'Road narrows ahead',
      'Upcoming series of three (3) or more curves',
      'Road may be slippery when wet'
    ],
    correctAnswer: 2,
    explanationEs: 'Esta señal indica que se aproximan 3 curvas seguidas o más en la carretera. Disminuya la velocidad con antelación.',
    explanationEn: 'Indicates three or more consecutive curves ahead. Reduce speed and prepare to steer smoothly.',
    manualRef: 'Capítulo 2, pág. 14 & 28 (Pregunta 14)',
    signId: 'sign-winding-road'
  },
  {
    id: 'ch2-q15',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con silueta de automóvil patinándose significa que:',
    textEn: 'This sign showing a vehicle with wavy tracks means that:',
    optionsEs: [
      'Se aproxima a una curva hacia la izquierda',
      'Hay una serie de curvas',
      'Se aproxima a una curva en S',
      'El pavimento es resbaloso cuando está mojado (Slippery When Wet)'
    ],
    optionsEn: [
      'Approaching a left curve',
      'Series of curves ahead',
      'S-curve ahead',
      'Pavement is slippery when wet'
    ],
    correctAnswer: 3,
    explanationEs: 'El pavimento se vuelve muy resbaloso con lluvia o humedad. Reduzca la velocidad de 5 a 10 mph y aumente la distancia de seguimiento.',
    explanationEn: 'Road surface gets slick in wet conditions. Reduce speed by 5 to 10 mph and increase following distance to 5-6 seconds.',
    manualRef: 'Capítulo 2, pág. 15 & 28 (Pregunta 15)',
    signId: 'sign-slippery-wet'
  },
  {
    id: 'ch2-q16',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con un camión bajando una pendiente indica que:',
    textEn: 'This sign showing a truck on an incline indicates that:',
    optionsEs: [
      'Se aproxima una pendiente muy inclinada / bajada empinada',
      'No se permiten camiones en la pendiente',
      'Se aproxima a una carretera de tala',
      'Hay camiones en la pendiente'
    ],
    optionsEn: [
      'Steep downgrade / steep hill ahead',
      'No trucks allowed on hill',
      'Logging road ahead',
      'Trucks stalled on slope'
    ],
    correctAnswer: 0,
    explanationEs: 'Se aproxima una pendiente empinada. Disminuya la velocidad y pase a un cambio más bajo antes de bajar para evitar desgastar o sobrecalentar los frenos.',
    explanationEn: 'Steep hill ahead. Slow down and shift into a lower gear before starting downhill to save brake wear.',
    manualRef: 'Capítulo 2, pág. 16 & 28 (Pregunta 16)',
    signId: 'sign-steep-hill'
  },
  {
    id: 'ch2-q18',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'La señal con esta forma de banderín y color amarillo es una señal de:',
    textEn: 'The sign with this pennant shape and yellow color is a:',
    optionsEs: [
      'Zona de no adelantamiento / NO PASSING ZONE',
      'Sentido contrario',
      'Cruce de ferrocarril',
      'Alto'
    ],
    optionsEn: [
      'NO PASSING ZONE pennant',
      'Wrong way sign',
      'Railroad crossing',
      'STOP sign'
    ],
    correctAnswer: 0,
    explanationEs: 'Esta es la ÚNICA señal preventiva en forma de banderín triangular. Se coloca en el lado IZQUIERDO de la calzada mirando al conductor.',
    explanationEn: 'This is the ONLY pennant-shaped warning sign, always posted on the LEFT side of the highway facing oncoming traffic.',
    manualRef: 'Capítulo 2, pág. 13 & 29 (Pregunta 18)',
    signId: 'sign-no-passing-zone'
  },
  {
    id: 'ch2-q19',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con la isla o divisor en la parte inferior muestra:',
    textEn: 'This yellow diamond with the median divider at the bottom shows:',
    optionsEs: [
      'Comienzo de autopista dividida',
      'FINAL de una autopista dividida (Divided Highway Ends)',
      'Doble sentido más adelante',
      'Intersección en T'
    ],
    optionsEn: [
      'Divided highway begins',
      'DIVIDED HIGHWAY ENDS',
      'Two-way traffic ahead',
      'T-intersection'
    ],
    correctAnswer: 1,
    explanationEs: 'La calzada dividida por la que circula termina más adelante y pasará a ser de doble sentido con tráfico de frente.',
    explanationEn: 'The divided roadway ends ahead and traffic will merge into a two-way undivided roadway.',
    manualRef: 'Capítulo 2, pág. 15 & 29 (Pregunta 19)',
    signId: 'sign-divided-highway-end'
  },
  {
    id: 'ch2-q20',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con línea recta a la izquierda y línea que se une a la derecha advierte que:',
    textEn: 'This yellow diamond with a converging right line warns that:',
    optionsEs: [
      'El carril de la derecha se termina, debe incorporarse hacia la izquierda (LANE ENDS)',
      'Se aproxima a curvas',
      'Intersecciones próximas',
      'Construcción de carretera'
    ],
    optionsEn: [
      'Right lane ends, merge left',
      'Approaching curves',
      'Upcoming intersections',
      'Road construction'
    ],
    correctAnswer: 0,
    explanationEs: 'Informa que el carril derecho termina más adelante y el tráfico debe incorporarse con precaución hacia la izquierda.',
    explanationEn: 'Indicates the right lane ends ahead; drivers must merge smoothly to the left.',
    manualRef: 'Capítulo 2, pág. 15 & 29 (Pregunta 20)',
    signId: 'sign-lane-ends'
  },
  {
    id: 'ch2-q21',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal amarilla con forma de cruz (+) muestra un tipo de:',
    textEn: 'This yellow diamond sign with a black cross (+) shows a:',
    optionsEs: [
      'Intersección de cruce de caminos (Crossroad)',
      'Curva',
      'Giro a la derecha',
      'Cambio de carril'
    ],
    optionsEn: [
      'Crossroad intersection',
      'Curve',
      'Right turn',
      'Lane shift'
    ],
    correctAnswer: 0,
    explanationEs: 'Indica un cruce de cuatro vías donde otra carretera atraviesa la suya. Mire bien hacia ambos lados antes de cruzar.',
    explanationEn: 'Warns of a four-way crossroad intersection ahead where another road crosses yours.',
    manualRef: 'Capítulo 2, pág. 15 & 29 (Pregunta 21)',
    signId: 'sign-crossroad'
  },
  {
    id: 'ch2-q22',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal amarilla en forma de T muestra un tipo de:',
    textEn: 'This yellow diamond sign with a black T indicates:',
    optionsEs: [
      'Giro a la derecha',
      'Intersección en T (la carretera que transita termina en el cruce)',
      'Cambio de carril',
      'Curva cerrada'
    ],
    optionsEn: [
      'Right turn',
      'T-intersection (the road you are on ends ahead)',
      'Lane shift',
      'Sharp curve'
    ],
    correctAnswer: 1,
    explanationEs: 'Una intersección en T significa que la carretera sobre la que circula no continúa de frente: deberá girar a la izquierda o a la derecha.',
    explanationEn: 'A T-intersection means the roadway you are traveling on ends ahead; you must turn right or left.',
    manualRef: 'Capítulo 2, pág. 15 & 29 (Pregunta 22)',
    signId: 'sign-t-intersection'
  },
  {
    id: 'ch2-q23',
    chapter: 2,
    category: 'signs',
    textEs: '¿Qué es lo que más le debe preocupar cuando ve esta señal de CUNETA EN DESNIVEL (Low Shoulder / Shoulder Drop Off)?',
    textEn: 'What is the primary danger when seeing this LOW SHOULDER warning sign?',
    optionsEs: [
      'Conducir con las luces delanteras desalineadas',
      'Dañar un neumático si se sale a la cuneta',
      'Hidroplanear si la cuneta tiene agua',
      'Perder el control del vehículo si se sale del pavimento y se voltea el volante bruscamente'
    ],
    optionsEn: [
      'Headlight misalignment',
      'Tire damage on shoulder',
      'Hydroplaning in ditch',
      'Losing vehicular control if wheels drop off and you jerk the wheel back'
    ],
    correctAnswer: 3,
    explanationEs: 'Si una rueda cae en el arcén en desnivel, girar el volante bruscamente o frenar en seco puede hacer volcar el auto o cruzarlo al tráfico opuesto. Mantenga el volante firme y reduzca la velocidad lentamente.',
    explanationEn: 'Jerking the wheel or braking hard when tires drop onto a low shoulder causes severe loss of control or rollover. Steer straight and ease off the throttle.',
    manualRef: 'Capítulo 2, pág. 16 & 29 (Pregunta 23)',
    signId: 'sign-low-shoulder'
  },
  {
    id: 'ch2-q24',
    chapter: 2,
    category: 'signs',
    textEs: '¿Cuál es el significado de esta señal amarilla con semáforo?',
    textEn: 'What is the meaning of this yellow diamond with a traffic light symbol?',
    optionsEs: [
      'El semáforo próximo está en rojo',
      'El semáforo próximo está descompuesto',
      'El semáforo próximo está en verde',
      'Hay un semáforo más adelante en la intersección que se aproxima'
    ],
    optionsEn: [
      'Upcoming light is red',
      'Upcoming light is broken',
      'Upcoming light is green',
      'Traffic control signal ahead at upcoming intersection'
    ],
    correctAnswer: 3,
    explanationEs: 'Advierte que hay un semáforo más adelante que podría no verse por una curva o colina. Prepárese para reducir la velocidad y detenerse.',
    explanationEn: 'Warns that an intersection controlled by traffic signals is ahead, possibly obstructed by curves or hills. Be prepared to stop.',
    manualRef: 'Capítulo 2, pág. 16 & 29 (Pregunta 24)',
    signId: 'sign-traffic-signal-ahead'
  },
  {
    id: 'ch2-q25',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal con divisor en la parte SUPERIOR significa:',
    textEn: 'This sign with the island divider at the TOP indicates:',
    optionsEs: [
      'Finaliza la autopista dividida',
      'Comienzo de calle de un solo sentido',
      'Fin de calle de un solo sentido',
      'Comienza la autopista dividida (Divided Highway Begins)'
    ],
    optionsEn: [
      'Divided highway ends',
      'One-way street starts',
      'End of one-way street',
      'DIVIDED HIGHWAY BEGINS'
    ],
    correctAnswer: 3,
    explanationEs: 'La autopista se divide más adelante en dos calzadas de un solo sentido separadas por una línea media o divisor. Manténgase a la derecha.',
    explanationEn: 'The highway splits into two one-way roadways with a center median ahead. Keep to the right of the divider.',
    manualRef: 'Capítulo 2, pág. 15 & 29 (Pregunta 25)',
    signId: 'sign-divided-highway-begin'
  },
  {
    id: 'ch2-q26',
    isHighProbability: true,
    chapter: 2,
    category: 'signs',
    textEs: 'De arriba a abajo, este es el orden correcto de las luces en un semáforo vertical:',
    textEn: 'From top to bottom, this is the correct order of lights in a vertical traffic signal:',
    optionsEs: [
      'Rojo, amarillo, verde',
      'Rojo, verde, amarillo',
      'Verde, rojo, amarillo',
      'Verde, amarillo, rojo'
    ],
    optionsEn: [
      'Red, yellow, green',
      'Red, green, yellow',
      'Green, red, yellow',
      'Green, yellow, red'
    ],
    correctAnswer: 0,
    explanationEs: 'En líneas verticales, el rojo siempre está arriba, el amarillo en medio y el verde abajo. En horizontales, el rojo a la izquierda y el verde a la derecha.',
    explanationEn: 'In vertical traffic lights, red is always on top, yellow in the middle, and green on bottom.',
    manualRef: 'Capítulo 2, pág. 7 & 29 (Pregunta 26)',
    signId: 'sign-traffic-light'
  },
  {
    id: 'ch2-q39',
    chapter: 2,
    category: 'traffic_laws',
    textEs: 'El límite de velocidad en Pensilvania es de ______ mph cuando están intermitentes las luces amarillas de la señal de ZONA ESCOLAR:',
    textEn: 'The speed limit in Pennsylvania is ______ mph when yellow lights flash on a SCHOOL ZONE sign:',
    optionsEs: [
      '25 mph',
      '15 MPH (y agrega 3 puntos en su expediente)',
      '20 mph',
      '35 mph'
    ],
    optionsEn: [
      '25 mph',
      '15 MPH (adds 3 points to driving record)',
      '20 mph',
      '35 mph'
    ],
    correctAnswer: 1,
    explanationEs: 'En zonas escolares el límite es de 15 mph cuando parpadean las luces amarillas. Superar este límite sumará 3 puntos en su expediente y una multa.',
    explanationEn: 'Speed limit is 15 mph when school flashers are active. Speeding in a school zone adds 3 points to your driving record plus fine.',
    manualRef: 'Capítulo 2, pág. 9 & 31 (Pregunta 39)',
    signId: 'sign-school-zone'
  },
  {
    id: 'ch2-q41',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta flecha verde fija que apunta hacia abajo en un semáforo para el control de carriles significa que:',
    textEn: 'This steady green arrow pointing down over a lane on a lane control signal means:',
    optionsEs: [
      'Puede usar este carril con seguridad',
      'No se permite transitar en este carril',
      'Usted tiene el derecho de vía absoluto',
      'Debe incorporarse de inmediato'
    ],
    optionsEn: [
      'You are permitted to drive in this lane',
      'Lane is closed to traffic',
      'You have absolute right-of-way',
      'Must merge immediately'
    ],
    correctAnswer: 0,
    explanationEs: 'Una flecha verde vertical apuntando hacia abajo indica que el carril está habilitado para su dirección de marcha.',
    explanationEn: 'A steady green downward arrow over a lane means you are allowed to travel in that lane.',
    manualRef: 'Capítulo 2, pág. 8 & 31 (Pregunta 41)',
    signId: 'sign-lane-arrow-green'
  },
  {
    id: 'ch2-q42',
    chapter: 2,
    category: 'work_zone',
    textEs: 'Esta señal naranja en zona de obras significa:',
    textEn: 'This orange diamond work zone sign means:',
    optionsEs: [
      'Se aproxima a peatones',
      'Termina la zona de construcción',
      'Se aproxima a un cruce escolar',
      'Se aproxima a un SEÑALIZADOR / BANDERILLERO (Flagger Ahead)'
    ],
    optionsEn: [
      'Pedestrians ahead',
      'End of construction',
      'School crossing',
      'FLAGGER AHEAD regulating traffic'
    ],
    correctAnswer: 3,
    explanationEs: 'Indica la presencia de un señalizador regulando el tráfico en una zona de obras. Obedezca sus indicaciones por encima de los semáforos normales.',
    explanationEn: 'Indicates a flagger is controlling traffic ahead. A flagger\'s instructions override normal traffic control devices.',
    manualRef: 'Capítulo 2, pág. 18 & 31 (Pregunta 42)',
    signId: 'sign-flagger'
  },
  {
    id: 'ch2-q43',
    chapter: 2,
    category: 'work_zone',
    textEs: 'Esta señal naranja con figura de trabajador excavando significa que:',
    textEn: 'This orange sign with a worker digging indicates:',
    optionsEs: [
      'Un grupo comunitario está recogiendo basura',
      'Hay TRABAJADORES en la carretera o muy cerca de esta en la zona de obras',
      'Zona de niños jugando',
      'Cruce peatonal ordinario'
    ],
    optionsEn: [
      'Litter cleanup crew ahead',
      'WORKERS are in or near the roadway in this work zone',
      'Children at play zone',
      'Standard pedestrian crossing'
    ],
    correctAnswer: 1,
    explanationEs: 'Se aproxima a trabajadores viales. Por ley encienda las luces delanteras y reduzca la velocidad; las multas se duplican en zonas de obras activas.',
    explanationEn: 'Warns that road workers are on or near the roadway. Turn on headlights by law; fines double in active work zones.',
    manualRef: 'Capítulo 2, pág. 18 & 31 (Pregunta 43)',
    signId: 'sign-workers-ahead'
  },
  {
    id: 'ch2-q44',
    chapter: 2,
    category: 'work_zone',
    textEs: 'Cuando un panel electrónico de flechas en una zona de obras muestra cuatro luces en las esquinas, significa:',
    textEn: 'When an electronic arrow board in a work zone flashes four corner dots, it means:',
    optionsEs: [
      'Los focos de la señal están descompuestos',
      'Conducir con extrema PRECAUCIÓN (zona de obras próxima)',
      'Cambiar de carril de inmediato',
      'Sintonizar la radio para noticias viales'
    ],
    optionsEn: [
      'Bulbs are burnt out',
      'Drive with extreme CAUTION',
      'Change lanes immediately',
      'Tune radio to traffic updates'
    ],
    correctAnswer: 1,
    explanationEs: 'Un panel con cuatro luces en las esquinas parpadeando significa PRECAUCIÓN: hay obras cerca del carril de circulación.',
    explanationEn: 'A display with 4 corner flashing lights means CAUTION: work operation is near travel lanes.',
    manualRef: 'Capítulo 2, pág. 19 & 31 (Pregunta 44)',
    signId: 'sign-arrow-board-caution'
  },
  {
    id: 'ch2-q48',
    chapter: 2,
    category: 'traffic_laws',
    textEs: 'Está prohibido adelantarse o rebasar por cualquiera de los dos lados sobre una:',
    textEn: 'Passing is strictly prohibited from either direction across a:',
    optionsEs: [
      'Combinación de línea sólida y discontinua',
      'Sola línea amarilla discontinua',
      'Línea amarilla DOBLE SÓLIDA en el centro',
      'Sola línea blanca discontinua'
    ],
    optionsEn: [
      'Combination of solid and broken yellow lines',
      'Single broken yellow line',
      'DOUBLE SOLID YELLOW centerline',
      'Single broken white line'
    ],
    correctAnswer: 2,
    explanationEs: 'Una línea doble sólida amarilla central indica que está prohibido adelantar en cualquier sentido a lo largo de esa carretera.',
    explanationEn: 'A double solid yellow centerline indicates that passing is prohibited in both directions along that roadway.',
    manualRef: 'Capítulo 2, pág. 22 & 28 (Pregunta 48)',
    signId: 'sign-pavement-double-yellow'
  },
  {
    id: 'ch2-q56',
    chapter: 2,
    category: 'signs',
    textEs: '¿Una carretera o autopista de DOBLE SENTIDO está marcada con cuál de estas señales?',
    textEn: 'A TWO-WAY TRAFFIC roadway is marked with which warning sign?',
    optionsEs: [
      'Flechas opuestas en rombo amarillo (Two-Way Traffic)',
      'Una flecha curvada a la derecha',
      'Señal de fin de carril',
      'Señal de curva cerrada'
    ],
    optionsEn: [
      'Opposing vertical arrows on yellow diamond (Two-Way Traffic)',
      'Curved right arrow',
      'Lane ends sign',
      'Sharp curve sign'
    ],
    correctAnswer: 0,
    explanationEs: 'El rombo amarillo con dos flechas verticales en sentidos contrarios advierte que la carretera es de doble sentido con tráfico de frente.',
    explanationEn: 'Yellow diamond with two opposing vertical arrows warns drivers of two-way oncoming traffic ahead.',
    manualRef: 'Capítulo 2, pág. 15 & 33 (Pregunta 56)',
    signId: 'sign-two-way-traffic'
  },
  {
    id: 'ch2-q57',
    chapter: 2,
    category: 'traffic_laws',
    textEs: '¿Qué maniobras se pueden realizar desde este carril central marcado con "CENTER LANE ONLY"?',
    textEn: 'What maneuvers are legally permitted from this "CENTER LANE ONLY" lane?',
    optionsEs: [
      'Girar a la IZQUIERDA solamente (desde ambos sentidos)',
      'Girar en U a alta velocidad',
      'Adelantarse a vehículos lentos de frente',
      'Continuar derecho para evitar el tráfico'
    ],
    optionsEn: [
      'Turn LEFT only (from either direction of travel)',
      'High-speed U-turns',
      'Passing slower vehicles',
      'Driving straight through traffic'
    ],
    correctAnswer: 0,
    explanationEs: 'El carril central reservado con dos flechas curvas enfrentadas se utiliza EXCLUSIVAMENTE para giros a la izquierda. Nunca lo use para seguir de frente ni para rebasar.',
    explanationEn: 'Center shared turn lane is reserved exclusively for vehicles turning left. Never use it for passing or driving straight.',
    manualRef: 'Capítulo 2, pág. 11 & 33 (Pregunta 57)',
    signId: 'sign-center-left-turn'
  },
  {
    id: 'ch2-q58',
    chapter: 2,
    category: 'signs',
    textEs: 'Esta señal blanca con la leyenda "KEEP RIGHT" y una flecha curvada alrededor de un divisor indica que:',
    textEn: 'This white "KEEP RIGHT" sign with an arrow curving around an obstacle tells drivers to:',
    optionsEs: [
      'Los conductores deben mantenerse a la DERECHA de la isla o divisor',
      'Girar a la derecha en la próxima esquina',
      'Cambiar al carril izquierdo de emergencia',
      'Carretera cerrada más adelante'
    ],
    optionsEn: [
      'Drivers must KEEP TO THE RIGHT of the traffic island or median barrier',
      'Turn right at next street',
      'Shift into the left lane',
      'Road closed ahead'
    ],
    correctAnswer: 0,
    explanationEs: 'Indica a los conductores que deben mantenerse a la derecha del divisor, isla o barrera central de tráfico.',
    explanationEn: 'Directs motorists to pass on the right side of a traffic island, median, or barrier.',
    manualRef: 'Capítulo 2, pág. 12 & 33 (Pregunta 58)',
    signId: 'sign-keep-right'
  },

  // --- CAPÍTULO 3 & 4 VISUAL QUESTIONS ---
  {
    id: 'ch3-q19',
    isHighProbability: true,
    chapter: 3,
    category: 'traffic_laws',
    textEs: 'Cuando un autobús escolar se detiene con luces rojas parpadeando y letrero de pare extendido, ¿a qué distancia mínima debe detenerse?',
    textEn: 'When a school bus stops with red flashers and extended stop arm, what is the minimum stopping distance?',
    optionsEs: [
      'Al menos a 10 PIES de distancia del autobús',
      'A 25 pies de distancia',
      'A 5 pies de distancia',
      'A 50 pies de distancia'
    ],
    optionsEn: [
      'At least 10 FEET away from the school bus',
      '25 feet away',
      '5 feet away',
      '50 feet away'
    ],
    correctAnswer: 0,
    explanationEs: 'La ley de Pensilvania exige detenerse al menos a 10 pies de distancia. Violarlo causa 60 días de suspensión de licencia, 5 puntos en su expediente y multa.',
    explanationEn: 'PA law requires drivers to stop at least 10 feet from a stopped school bus with red flashers. Violations result in a 60-day license suspension and 5 points.',
    manualRef: 'Capítulo 3, pág. 58 & 67 (Pregunta 19)',
    signId: 'sign-school-bus-stop'
  },
  {
    id: 'ch3-q30',
    chapter: 3,
    category: 'safe_driving',
    textEs: 'Cuando el brazo del conductor sale horizontalmente recto por la ventanilla, como muestra la imagen, está señalizando:',
    textEn: 'When the driver extends their left arm straight out horizontally, as shown, they are signaling:',
    optionsEs: [
      'Giro a la IZQUIERDA (Left Turn)',
      'Giro a la derecha',
      'Reducción de velocidad o parada',
      'Saludando a otro conductor'
    ],
    optionsEn: [
      'LEFT TURN',
      'Right turn',
      'Slowing down or stop',
      'Waving at another driver'
    ],
    correctAnswer: 0,
    explanationEs: 'El brazo izquierdo extendido horizontalmente señala un giro a la izquierda. Brazo hacia arriba señala giro a la derecha; hacia abajo señala frenado o parada.',
    explanationEn: 'Hand extended straight out signals a left turn. Pointed upward signals a right turn; pointed downward signals slowing or stopping.',
    manualRef: 'Capítulo 3, pág. 44 & 68 (Pregunta 30)',
    signId: 'sign-hand-left'
  },
  {
    id: 'ch3-q94',
    chapter: 3,
    category: 'emergencies',
    textEs: 'Si la parte trasera de su vehículo patina hacia la izquierda en carretera resbaladiza, usted debe girar el volante hacia:',
    textEn: 'If the rear of your vehicle skids to the left on a slick road, you should steer:',
    optionsEs: [
      'Hacia la IZQUIERDA (hacia la dirección en que se desliza la parte trasera) y no pisar el freno',
      'Hacia la derecha bruscamente',
      'Pisar el freno a fondo de inmediato',
      'Acelerar fuertemente'
    ],
    optionsEn: [
      'To the LEFT (in the direction of the skid) and avoid braking',
      'Sharply to the right',
      'Slam on the brakes',
      'Accelerate hard'
    ],
    correctAnswer: 0,
    explanationEs: 'Mire hacia donde desea ir y gire el volante en la misma dirección que la parte trasera se desliza (a la izquierda). No use los frenos para evitar empeorar el derrape.',
    explanationEn: 'Look in the direction you want to go and steer into the skid (to the left if rear slides left). Avoid slamming brakes.',
    manualRef: 'Capítulo 3, pág. 61 & 75 (Pregunta 94)',
    signId: 'sign-skid-recovery'
  },
  {
    id: 'ch3-q5',
    chapter: 3,
    category: 'traffic_laws',
    textEs: 'Al rebasar a un ciclista en Pensilvania, la ley exige dejar un espacio lateral mínimo de:',
    textEn: 'When passing a bicycle in Pennsylvania, state law mandates a minimum clearance of:',
    optionsEs: [
      'Al menos CUATRO (4) PIES de distancia',
      'Dos (2) pies',
      'Un (1) pie',
      'Seis (6) pulgadas'
    ],
    optionsEn: [
      'At least FOUR (4) FEET of clearance',
      'Two (2) feet',
      'One (1) foot',
      'Six (6) inches'
    ],
    correctAnswer: 0,
    explanationEs: 'La ley de Pensilvania exige un margen de al menos 4 pies al rebasar ciclistas. Se permite cruzar la doble línea amarilla si es seguro hacerlo.',
    explanationEn: 'PA law requires leaving at least 4 feet of buffer when passing bicycles, permitting crossing double yellow lines when safe.',
    manualRef: 'Capítulo 3, pág. 44 & Capítulo 5, pág. 92',
    signId: 'sign-bike-passing-4ft'
  },
  {
    id: 'ch4-q12',
    isHighProbability: true,
    chapter: 4,
    category: 'alcohol_dui',
    textEs: 'Bajo la Ley de Tolerancia Cero de Pensilvania, si es MENOR DE 21 AÑOS, se considera que conduce bajo la influencia del alcohol si su BAC es de:',
    textEn: 'Under PA Zero Tolerance Law, if you are UNDER 21, you are driving under the influence if your BAC reaches:',
    optionsEs: [
      '0.08% o mayor',
      '0.05% o mayor',
      '0.02% O MAYOR',
      '0.10% o mayor'
    ],
    optionsEn: [
      '0.08% or higher',
      '0.05% or higher',
      '0.02% OR HIGHER',
      '0.10% or higher'
    ],
    correctAnswer: 2,
    explanationEs: 'Para menores de 21 años rige Tolerancia Cero: un BAC de apenas 0.02% es clasificado legalmente como DUI, acarreando arresto, cárcel de 2 días a 6 meses y suspensión de licencia de 1 año.',
    explanationEn: 'PA has a Zero Tolerance policy for drivers under 21: a BAC of 0.02% or higher constitutes DUI, leading to 2 days to 6 months jail and a 1-year license suspension.',
    manualRef: 'Capítulo 4, pág. 84 & 87 (Pregunta 12)'
  },
  {
    id: 'ch4-q9',
    isHighProbability: true,
    chapter: 4,
    category: 'alcohol_dui',
    textEs: 'Bajo la Ley de Consentimiento Implícito de Pensilvania, si se NIEGA a someterse a un análisis químico de alcohol:',
    textEn: 'Under PA Implied Consent Law, if you REFUSE a chemical sobriety test:',
    optionsEs: [
      'Su licencia será suspendida automáticamente por un (1) año por la negativa',
      'No le aplicarán ninguna sanción administrativa',
      'Solamente recibirá una advertencia verbal',
      'Podrá elegir hacer un examen escrito de reemplazo'
    ],
    optionsEn: [
      'Your driver license will automatically be suspended for one (1) year for the refusal',
      'No administrative penalties will be applied',
      'You only receive a verbal warning',
      'You may take an alternate written test instead'
    ],
    correctAnswer: 0,
    explanationEs: 'La posesión de una licencia en PA implica consentimiento para pruebas químicas. La negativa conlleva una suspensión automática de 1 año (más arancel de restauración de $500).',
    explanationEn: 'Holding a PA driver license implies consent to chemical testing. Refusing tests causes an automatic 1-year license suspension plus a $500 restoration surcharge.',
    manualRef: 'Capítulo 4, pág. 82 & 87 (Pregunta 9)'
  },
  {
    id: 'ch1-q1',
    isHighProbability: true,
    chapter: 1,
    category: 'penndot_rules',
    textEs: '¿Cuántas horas de práctica al volante debe completar un conductor menor de 18 años antes de tomar el examen práctico de PennDOT?',
    textEn: 'How many behind-the-wheel practice hours must a driver under 18 complete before taking the PennDOT road exam?',
    optionsEs: [
      '65 horas de práctica (incluyendo 10 horas de noche y 5 horas con mal tiempo)',
      '30 horas de práctica en autopistas',
      '50 horas de práctica únicamente de día',
      '20 horas con un instructor certificado'
    ],
    optionsEn: [
      '65 hours of practice (including 10 hours at night and 5 hours in inclement weather)',
      '30 hours on highways only',
      '50 hours of daytime driving only',
      '20 hours with a certified instructor'
    ],
    correctAnswer: 0,
    explanationEs: 'Los menores de 18 años deben certificar al menos 65 horas de práctica supervisada, que incluyen un mínimo de 10 horas nocturnas y 5 horas bajo lluvia/nieve/clima adverso.',
    explanationEn: 'PA requires drivers under 18 to log at least 65 hours of adult-supervised practice, including at least 10 night hours and 5 hours in inclement weather.',
    manualRef: 'Capítulo 1, pág. 2'
  },
  {
    id: 'ch5-q1',
    isHighProbability: true,
    chapter: 5,
    category: 'traffic_laws',
    textEs: 'Bajo la Ley 229 de Protección de Pasajeros Infantiles de PA, los niños menores de 2 años de edad deben viajar:',
    textEn: 'Under PA Child Passenger Protection Law 229, children under 2 years of age must ride:',
    optionsEs: [
      'En un asiento de seguridad orientado hacia ATRÁS (rear-facing) en el asiento trasero',
      'En el asiento del copiloto con cinturón regular',
      'En un asiento orientado hacia adelante sin arnés',
      'En el regazo de un adulto con cinturón compartido'
    ],
    optionsEn: [
      'In a rear-facing child safety seat in the rear seat',
      'In the front passenger seat with standard seat belt',
      'In a forward-facing seat without harness',
      'On an adult passenger lap'
    ],
    correctAnswer: 0,
    explanationEs: 'Los niños menores de 2 años deben ir en un asiento de seguridad orientado hacia atrás hasta que superen los límites del fabricante. NUNCA coloque un asiento orientado hacia atrás frente a una bolsa de aire.',
    explanationEn: 'Children under 2 years old must be secured in a rear-facing car seat in the back seat. Never install a rear-facing child seat in front of an active airbag.',
    manualRef: 'Capítulo 5, pág. 90'
  },
  {
    id: 'ch5-q2',
    isHighProbability: true,
    chapter: 5,
    category: 'traffic_laws',
    textEs: 'La ley contra textear (enviar o leer mensajes de texto al conducir) en Pensilvania establece una multa de:',
    textEn: 'Pennsylvania anti-texting law establishes that texting while driving is a primary offense with a fine of:',
    optionsEs: [
      '$50 dólares (falta primaria sin necesidad de otra infracción)',
      '$10 dólares',
      '$500 dólares y suspensión inmediata',
      'Solo una amonestación'
    ],
    optionsEn: [
      '$50 fine (primary violation with no other infraction required)',
      '$10 fine',
      '$500 fine and immediate suspension',
      'Warning letter only'
    ],
    correctAnswer: 0,
    explanationEs: 'Escribir, enviar o leer mensajes de texto en un dispositivo mientras conduce es una infracción primaria que conlleva una multa de $50 en Pensilvania.',
    explanationEn: 'Texting while operating a motor vehicle in PA is a primary offense resulting in a $50 fine plus statutory costs.',
    manualRef: 'Capítulo 5, pág. 93'
  }
,
  {
    id: 'ch3-q9',
    chapter: 3,
    category: 'safe_driving',
    textEs: "Debe tener extrema precaución y detenerse por completo cuando se aproxima a un peatón que lleva un bastón blanco o va acompañado por un perro guía porque:",
    textEn: "You must exercise extreme caution and come to a complete stop when approaching a pedestrian carrying a white cane or led by a guide dog because:",
    optionsEs: [
      "Tiene una discapacidad mental",
      "Es ciego o tiene una discapacidad visual severa",
      "Tiene un problema físico para caminar",
      "Es una persona sorda"
],
    optionsEn: [
      "Has a mental disability",
      "Is blind or severely visually impaired",
      "Has a physical walking problem",
      "Is a deaf person"
],
    correctAnswer: 1,
    explanationEs: "Los peatones que usan bastones blancos o perros guía son ciegos o tienen graves problemas visuales. La ley de Pensilvania exige detenerse por completo y cederles el paso en todo momento.",
    explanationEn: "Pedestrians carrying white canes or accompanied by guide dogs are blind. Pennsylvania law requires drivers to yield the right-of-way and come to a complete stop.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 9)',
    isHighProbability: true,
    probabilityReasonEs: "Pregunta obligatoria sobre peatones con discapacidad evaluada con gran frecuencia en PennDOT.",
    probabilityReasonEn: "Mandatory pedestrian safety question frequently drawn on PennDOT tests."
  },
  {
    id: 'ch3-q11',
    chapter: 3,
    category: 'safe_driving',
    textEs: "¿Quién debe ceder el paso cuando un conductor realiza un giro en una intersección y un peatón está cruzando la calle sin semáforo peatonal?",
    textEn: "Who must yield the right-of-way when a driver is making a turn at an intersection and a pedestrian is crossing without a signal?",
    optionsEs: [
      "El conductor del vehículo debe ceder el paso al peatón",
      "El peatón debe esperar a que pase el vehículo",
      "El que llegue primero a la esquina tiene la prioridad",
      "Ambos deben detenerse hasta que intervenga un oficial"
],
    optionsEn: [
      "The driver must yield right-of-way to the pedestrian",
      "The pedestrian must wait for the vehicle to pass",
      "Whoever arrives first at the corner has priority",
      "Both must stop until a police officer directs traffic"
],
    correctAnswer: 0,
    explanationEs: "Los conductores deben ceder el paso en todo momento a los peatones que cruzan en intersecciones y pasos peatonales, señalizados o no.",
    explanationEn: "Drivers turning at intersections must yield the right-of-way to crossing pedestrians whether the crosswalk is marked or unmarked.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 11)',
    isHighProbability: true,
    probabilityReasonEs: "PennDOT enfatiza la regla de prioridad absoluta del peatón en cruces peatonales.",
    probabilityReasonEn: "PennDOT emphasizes absolute pedestrian right-of-way at crosswalks."
  },
  {
    id: 'ch3-q12',
    chapter: 3,
    category: 'signs',
    textEs: "Un triángulo reflectante color naranja con borde rojo colocado en la parte trasera de un vehículo indica que:",
    textEn: "A reflective orange triangle with a red border on the back of a vehicle indicates that the vehicle:",
    optionsEs: [
      "Es un vehículo de marcha lenta (diseñado para viajar a 25 mph o menos)",
      "Transporta materiales químicos peligrosos",
      "Realiza giros amplios a la izquierda",
      "Se detiene frecuentemente en las vías del tren"
],
    optionsEn: [
      "Is a slow-moving vehicle (designed to travel at 25 mph or less)",
      "Is carrying hazardous radioactive materials",
      "Makes wide left-hand turns",
      "Stops frequently at railroad crossings"
],
    correctAnswer: 0,
    explanationEs: "El triángulo naranja reflectante identifica a vehículos de marcha lenta (como tractores agrícolas, carretas o maquinaria de construcción) que no pueden viajar a más de 25 mph. Tenga paciencia y rebáselos con precaución.",
    explanationEn: "The orange reflective triangle marks slow-moving vehicles (such as farm tractors or construction equipment) traveling at 25 mph or slower.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 12)',
    isHighProbability: true,
    probabilityReasonEs: "Pregunta característica de Pensilvania por sus zonas rurales y carreteras secundarias.",
    probabilityReasonEn: "Characteristic PA driving question common on rural and state highway tests."
  },
  {
    id: 'ch3-q13',
    chapter: 3,
    category: 'safe_driving',
    textEs: "Al conducir por la noche, ¿cuál de los siguientes elementos resulta considerablemente más difícil de ver y requiere mayor atención del conductor?",
    textEn: "When driving at night, which of the following is considerably harder to see and requires extra driver alertness?",
    optionsEs: [
      "Las señales de tránsito con material reflectante",
      "Los peatones caminando por la calzada o cruces",
      "Otros vehículos motorizados con faros encendidos",
      "Los postes de alumbrado público"
],
    optionsEn: [
      "Road signs with retro-reflective sheeting",
      "Pedestrians walking on the roadway or crossings",
      "Other motorized vehicles with headlights on",
      "Street light poles"
],
    correctAnswer: 1,
    explanationEs: "Por la noche, la visibilidad disminuye drásticamente. Los peatones que visten ropa oscura son los más difíciles de divisar a tiempo, por lo que se debe reducir la velocidad en áreas urbanas y residenciales.",
    explanationEn: "Pedestrians, especially wearing dark clothing, are much harder to see at night. Drivers must reduce speed and remain alert near residential zones.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 13)',
    isHighProbability: true,
    probabilityReasonEs: "Pregunta clásica de la sección de visión nocturna del examen de Pensilvania.",
    probabilityReasonEn: "Classic PA night vision test question."
  },
  {
    id: 'ch3-q16',
    chapter: 3,
    category: 'emergencies',
    textEs: "Si se detiene ante un cruce de ferrocarril que cuenta con MÁS DE UNA VÍA, después de que pase el primer tren usted debe:",
    textEn: "If you stop at a railroad crossing with MORE THAN ONE TRACK, after the first train passes you must:",
    optionsEs: [
      "Esperar hasta tener una vista completamente clara de ambas vías antes de avanzar",
      "Cruzar de inmediato antes de que el tren se aleje",
      "Detenerse entre las vías del tren para verificar",
      "Sonar el claxon y acelerar a fondo"
],
    optionsEn: [
      "Wait until you have a completely clear view of both tracks before proceeding",
      "Cross immediately before the train gets too far",
      "Stop on the tracks to check the second track",
      "Honk your horn and accelerate across"
],
    correctAnswer: 0,
    explanationEs: "En cruces de vías múltiples, un tren que pasa puede ocultar a otro tren que viene en sentido opuesto en la segunda vía. Nunca avance hasta cerciorarse de que todas las vías están despejadas.",
    explanationEn: "On multiple tracks, a departing train can hide an approaching train on the second track. Always ensure all tracks are clear in both directions.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 16)',
    isHighProbability: true,
    probabilityReasonEs: "Seguridad en cruces ferroviarios: pregunta recurrente en el examen oficial.",
    probabilityReasonEn: "Railroad grade crossing safety: recurrent question on official exam."
  },
  {
    id: 'ch3-q17',
    chapter: 3,
    category: 'safe_driving',
    textEs: "Si viaja detrás de un camión articulado grande que se abre hacia la izquierda antes de girar a la derecha en una intersección, es muy peligroso:",
    textEn: "If you are behind a large tractor-trailer that swings wide to the left before turning right at an intersection, it is very dangerous to:",
    optionsEs: [
      "Intentar rebasar o meterse por el lado derecho del camión",
      "Mantener la distancia de seguridad de 4 segundos",
      "Reducir la velocidad y esperar que complete el giro",
      "Encender sus luces direccionales"
],
    optionsEn: [
      "Attempt to pass or squeeze on the right side of the truck",
      "Maintain the 4-second following distance",
      "Slow down and wait for the truck to complete the turn",
      "Turn on your turn signal lights"
],
    correctAnswer: 0,
    explanationEs: "Los camiones grandes necesitan abrirse a la izquierda para que el remolque libre el bordillo. Si un auto intenta colarse por la derecha, quedará atrapado contra la acera o el camión (giros tipo navaja / squeeze play).",
    explanationEn: "Large trucks need wide right turns. Squeezing into the space on the right of a turning truck puts you in danger of being crushed against the curb.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 17)',
    isHighProbability: true,
    probabilityReasonEs: "Compartir la vía con camiones grandes (No-Zone): tema fundamental evaluado por PennDOT.",
    probabilityReasonEn: "Sharing the road with commercial trucks (No-Zone): fundamental PennDOT test topic."
  },
  {
    id: 'ch3-q18',
    chapter: 3,
    category: 'traffic_laws',
    textEs: "La ÚNICA situación en Pensilvania en la que usted NO tiene que detenerse ante un autobús escolar con luces rojas intermitentes y brazo de pare extendido es cuando usted:",
    textEn: "The ONLY situation in Pennsylvania where you DO NOT have to stop for a school bus with flashing red lights and stop sign extended is when you:",
    optionsEs: [
      "Viaja en el sentido contrario de una carretera dividida separada por una barrera física (como barandilla o muro de concreto)",
      "Viaja detrás del autobús y ve que los niños ya bajaron",
      "Conduce en una calle residencial con límite de 25 mph",
      "Llega a una intersección y gira a la derecha"
],
    optionsEn: [
      "Are traveling in the opposite direction on a divided highway separated by a physical barrier (guardrail or median)",
      "Are behind the bus and see that all kids have exited",
      "Are on a residential street with a 25 mph limit",
      "Reach an intersection and turn right"
],
    correctAnswer: 0,
    explanationEs: "Bajo el Código de Vehículos de Pensilvania, todos los conductores deben detenerse a al menos 10 pies de un autobús escolar con luces rojas, en ambos sentidos, SALVO cuando viajan en el sentido contrario de una carretera dividida por una barrera física de concreto o barandilla.",
    explanationEn: "Under PA law, you must stop at least 10 feet from a stopped school bus with red lights flashing in both directions, UNLESS you are on the opposite side of a divided highway separated by a physical barrier.",
    manualRef: 'Capítulo 3, pág. 66 & 78 (Pregunta 18)',
    isHighProbability: true,
    probabilityReasonEs: "Pregunta #1 más representativa y con mayores penalidades de Pensilvania (multa, 5 puntos y 60 días de suspensión).",
    probabilityReasonEn: "#1 most tested PA school bus law question (mandatory 60-day suspension and 5 points if violated)."
  },
  {
    id: 'ch3-q24',
    chapter: 3,
    category: 'safe_driving',
    textEs: "El \"punto ciego\" de su vehículo se define como:",
    textEn: "Your vehicle's \"blind spot\" is defined as:",
    optionsEs: [
      "El área de la carretera alrededor de su vehículo que no puede ver únicamente mediante los espejos retrovisores sin mover la cabeza",
      "El área que queda directamente detrás del maletero del auto",
      "El espacio entre las ruedas delanteras y la acera",
      "El área del capó cubierta por el reflejo del sol"
],
    optionsEn: [
      "The area of roadway around your vehicle that cannot be seen using mirrors alone without turning your head",
      "The area located directly behind your vehicle trunk",
      "The space between your front wheels and the curb",
      "The hood surface area covered by sunlight glare"
],
    correctAnswer: 0,
    explanationEs: "Los puntos ciegos son las áreas a los costados traseros del vehículo no cubiertas por los espejos. Siempre debe voltear rápidamente la cabeza hacia el hombro antes de cambiar de carril.",
    explanationEn: "Blind spots are areas near the rear corners of your vehicle not visible in mirrors. You must turn your head over your shoulder to check before changing lanes.",
    manualRef: 'Capítulo 3, pág. 67 & 78 (Pregunta 24)',
    isHighProbability: true,
    probabilityReasonEs: "Concepto clave de manejo defensivo evaluado en todos los centros de examen de PennDOT.",
    probabilityReasonEn: "Core defensive driving concept tested in all PennDOT driver testing centers."
  },
  {
    id: 'ch3-q25',
    chapter: 3,
    category: 'safe_driving',
    textEs: "Para mantener una distancia de seguimiento segura detrás de otro vehículo en condiciones normales en Pensilvania, usted debe aplicar la regla de:",
    textEn: "To maintain a safe following distance behind another vehicle under normal conditions in Pennsylvania, you should apply the:",
    optionsEs: [
      "1 segundo por cada 10 mph de velocidad",
      "2 segundos de distancia",
      "Al menos 4 segundos de distancia",
      "El largo de 2 vehículos únicamente"
],
    optionsEn: [
      "1 second for every 10 mph of speed",
      "2 seconds of distance",
      "At least 4 seconds of following distance",
      "Length of 2 vehicles only"
],
    correctAnswer: 2,
    explanationEs: "El Manual de Conductor de Pensilvania exige la regla de los 4 segundos para un seguimiento seguro bajo condiciones secas normales (y más en lluvia o nieve). Elija un punto fijo y cuente: \"mil uno, mil dos, mil tres, mil cuatro\".",
    explanationEn: "PennDOT specifies the 4-second rule for following distance under normal conditions. Pick a stationary marker and count four seconds before passing it.",
    manualRef: 'Capítulo 3, pág. 35 & 78 (Pregunta 25)',
    isHighProbability: true,
    probabilityReasonEs: "Pensilvania enseña formalmente 4 segundos (a diferencia de otros estados que usan 2 o 3 segundos).",
    probabilityReasonEn: "PA officially teaches the 4-second rule (distinct from other states using 2 or 3 seconds)."
  },
  {
    id: 'ch3-q27',
    chapter: 3,
    category: 'safe_driving',
    textEs: "En pavimento mojado por lluvia, para prevenir el hidroplaneo y mantener el control del vehículo, usted debería:",
    textEn: "On wet pavement caused by rain, to prevent hydroplaning and maintain vehicle control, you should:",
    optionsEs: [
      "Reducir su velocidad de 5 a 10 mph por debajo del límite marcado",
      "Aumentar la velocidad para superar los charcos rápidamente",
      "Conducir con las luces de emergencia intermitentes encendidas",
      "Aplicar los frenos de manera brusca continuamente"
],
    optionsEn: [
      "Reduce your speed by 5 to 10 mph below the posted limit",
      "Speed up to cross water patches quickly",
      "Drive with your emergency four-way hazard flashers on",
      "Pump your brakes sharply and continuously"
],
    correctAnswer: 0,
    explanationEs: "En caminos mojados, reduzca la velocidad de 5 a 10 mph. En nieve compacta reduzca a la mitad, y en hielo reduzca a paso de hombre. El hidroplaneo puede comenzar desde las 35 mph.",
    explanationEn: "On wet roads, reduce speed by 5 to 10 mph. Hydroplaning can occur at speeds as low as 35 mph when tires lose contact with the road.",
    manualRef: 'Capítulo 3, pág. 50 & 78 (Pregunta 27)',
    isHighProbability: true,
    probabilityReasonEs: "Manejo en clima adverso: una de las preguntas técnicas más repetidas en el examen.",
    probabilityReasonEn: "Adverse weather driving: high-frequency technical exam question."
  },
  {
    id: 'ch3-q31',
    chapter: 3,
    category: 'emergencies',
    textEs: "Al conducir en condiciones de niebla densa, humo o nevada intensa, usted debe utilizar:",
    textEn: "When driving in conditions of heavy fog, smoke, or heavy snowfall, you must use:",
    optionsEs: [
      "Las luces altas para iluminar más lejos",
      "Las luces bajas (low beams), nunca las luces altas",
      "Únicamente las luces de estacionamiento",
      "Ninguna luz para no reflejar el resplandor"
],
    optionsEn: [
      "High beams to see further ahead",
      "Low beams, never high beams",
      "Parking lights only",
      "No lights to avoid glare"
],
    correctAnswer: 1,
    explanationEs: "En niebla o lluvia intensa use siempre las luces bajas. La luz de las luces altas rebota en las diminutas gotas de agua y ciega al conductor con un muro blanco de reflejo.",
    explanationEn: "Always use low beam headlights in fog. High beams bounce off water droplets and reflect right back into the driver eyes.",
    manualRef: 'Capítulo 3, pág. 48 & 78 (Pregunta 29)',
    isHighProbability: true,
    probabilityReasonEs: "Pregunta recurrente sobre el uso adecuado de luces del vehículo.",
    probabilityReasonEn: "Standard headlight use safety question on PennDOT exams."
  },
  {
    id: 'ch3-q32',
    chapter: 3,
    category: 'traffic_laws',
    textEs: "Por ley en Pensilvania, usted debe cambiar sus luces altas a luces bajas cuando se encuentre a:",
    textEn: "By Pennsylvania law, you must dim your high beams to low beams whenever you are within:",
    optionsEs: [
      "500 pies de un vehículo que se aproxima de frente o 300 pies detrás de un vehículo al que sigue",
      "1,000 pies de un vehículo de frente o 500 pies detrás",
      "200 pies de cualquier vehículo",
      "Solamente cuando el otro conductor le haga cambio de luces"
],
    optionsEn: [
      "500 feet of an oncoming vehicle or 300 feet behind a vehicle you are following",
      "1,000 feet of an oncoming vehicle or 500 feet behind",
      "200 feet of any vehicle",
      "Only when the other driver flashes their lights at you"
],
    correctAnswer: 0,
    explanationEs: "La ley de Pensilvania exige bajar las luces altas a no menos de 500 pies de un vehículo que se acerca en sentido opuesto y a no menos de 300 pies cuando sigue a un vehículo.",
    explanationEn: "PA law requires drivers to dim high beams when within 500 feet of an oncoming vehicle and within 300 feet when following another vehicle.",
    manualRef: 'Capítulo 3, pág. 47 & 78 (Pregunta 30)',
    isHighProbability: true,
    probabilityReasonEs: "Distancias métricas legales de luces evaluadas frecuentemente.",
    probabilityReasonEn: "Specific legal statutory distance metric questions on knowledge tests."
  },
  {
    id: 'ch3-q33',
    chapter: 3,
    category: 'safe_driving',
    textEs: "Al estacionar su vehículo en una calle CUESTA ARRIBA (en subida) que tiene bordillo (acera), ¿hacia dónde debe girar las ruedas delanteras?",
    textEn: "When parking your vehicle facing UPHILL on a street with a curb, which way should you turn your front wheels?",
    optionsEs: [
      "Hacia la calle (lejos del bordillo / hacia la izquierda)",
      "Hacia el bordillo (hacia la derecha)",
      "Rectas y paralelas a la calzada",
      "No importa mientras active el freno de emergencia"
],
    optionsEn: [
      "Away from the curb (toward the street / to the left)",
      "Toward the curb (to the right)",
      "Straight ahead and parallel to the curb",
      "It does not matter as long as emergency brake is set"
],
    correctAnswer: 0,
    explanationEs: "Cuesta arriba con bordillo: gire las ruedas hacia la izquierda (lejos del bordillo) de modo que la parte trasera del neumático descanse contra la acera si los frenos fallan. Cuesta abajo: gire las ruedas hacia el bordillo (a la derecha).",
    explanationEn: "Uphill with curb: turn front wheels away from curb (left). Downhill with curb: turn front wheels toward the curb (right).",
    manualRef: 'Capítulo 3, pág. 44',
    isHighProbability: true,
    probabilityReasonEs: "Regla clásica de estacionamiento en pendientes común en el examen de Pensilvania.",
    probabilityReasonEn: "Classic hill parking rule tested on PA license exams."
  },
  {
    id: 'ch4-q1',
    chapter: 4,
    category: 'alcohol_dui',
    textEs: "En el estado de Pensilvania, la edad mínima legal para comprar, poseer o consumir bebidas alcohólicas es:",
    textEn: "In the Commonwealth of Pennsylvania, the legal minimum age to purchase, possess, or consume alcohol is:",
    optionsEs: [
      "18 años",
      "19 años",
      "21 años",
      "20 años"
],
    optionsEn: [
      "18 years of age",
      "19 years of age",
      "21 years of age",
      "20 years of age"
],
    correctAnswer: 2,
    explanationEs: "En Pensilvania la edad mínima legal para comprar o consumir alcohol es 21 años. Los menores que violen esta ley enfrentan suspensión obligatoria de la licencia de conducir.",
    explanationEn: "Under PA law, 21 is the legal minimum age to purchase, possess, or consume alcohol.",
    manualRef: 'Capítulo 4, pág. 86 & 88 (Pregunta 1)',
    isHighProbability: true,
    probabilityReasonEs: "Pregunta fundamental sobre leyes de alcohol para conductores principiantes.",
    probabilityReasonEn: "Core alcohol law question for novice and new PA drivers."
  },
  {
    id: 'ch4-q3',
    chapter: 4,
    category: 'alcohol_dui',
    textEs: "Para conductores de 21 años o más en Pensilvania, se considera legalmente intoxicado (DUI) con una concentración de alcohol en sangre (BAC) de:",
    textEn: "For drivers 21 years of age or older in Pennsylvania, you are considered legally intoxicated (DUI) at a blood alcohol concentration (BAC) of:",
    optionsEs: [
      "0.05% o más",
      "0.08% o más",
      "0.10% o más",
      "0.02% o más"
],
    optionsEn: [
      "0.05% or higher",
      "0.08% or higher",
      "0.10% or higher",
      "0.02% or higher"
],
    correctAnswer: 1,
    explanationEs: "Para mayores de 21 años, el límite legal de BAC es 0.08%. Para menores de 21 años rige la Ley de Tolerancia Cero con 0.02%, y para choferes comerciales 0.04%.",
    explanationEn: "For drivers 21 and older, the legal limit for Driving Under the Influence is 0.08% BAC. For drivers under 21, the Zero Tolerance limit is 0.02%.",
    manualRef: 'Capítulo 4, pág. 81 & 88 (Pregunta 3)',
    isHighProbability: true,
    probabilityReasonEs: "Límite legal estándar universal evaluado en el examen de conducir.",
    probabilityReasonEn: "Universal statutory BAC threshold tested on PennDOT exams."
  },
  {
    id: 'ch4-q6',
    chapter: 4,
    category: 'alcohol_dui',
    textEs: "Si una persona ha consumido bebidas alcohólicas, ¿cuál es la ÚNICA manera efectiva de que vuelva a estar sobria para conducir?",
    textEn: "If a person has consumed alcoholic drinks, what is the ONLY effective way to sober up before driving?",
    optionsEs: [
      "Esperar el tiempo necesario para que el hígado metabolice y elimine el alcohol",
      "Tomar varias tazas de café bien cargado",
      "Darse una ducha con agua fría y respirar aire fresco",
      "Hacer ejercicio físico vigoroso"
],
    optionsEn: [
      "Allowing enough time for the liver to process and eliminate the alcohol",
      "Drinking several cups of strong black coffee",
      "Taking a cold shower and breathing fresh outdoor air",
      "Doing vigorous physical exercise"
],
    correctAnswer: 0,
    explanationEs: "Ni el café, ni las duchas frías, ni el ejercicio aceleran la eliminación del alcohol. Solo el tiempo permite al cuerpo eliminar el alcohol de la sangre (aproximadamente 1 trago estándar por hora).",
    explanationEn: "Time is the only factor that produces sobriety. Coffee, cold showers, or exercise do not speed up the liver rate of metabolizing alcohol.",
    manualRef: 'Capítulo 4, pág. 82 & 88 (Pregunta 6)',
    isHighProbability: true,
    probabilityReasonEs: "Mito vs realidad del alcohol: pregunta de alta recurrencia en exámenes de PennDOT.",
    probabilityReasonEn: "Alcohol myth vs reality: high-frequency question on PennDOT exams."
  },
  {
    id: 'ch4-q7',
    chapter: 4,
    category: 'penndot_rules',
    textEs: "Si un conductor en Pensilvania acumula 6 o más puntos en su expediente de manejo por primera vez, PennDOT le exige:",
    textEn: "If a Pennsylvania driver accumulates 6 or more points on their driving record for the first time, PennDOT requires them to:",
    optionsEs: [
      "Aprobar un examen escrito especial dentro de los 30 días, o su licencia será suspendida",
      "Pagar una fianza judicial de $1,000 dólares de inmediato",
      "Repetir el examen práctico de manejo en un plazo de 5 días",
      "Instalar un dispositivo de bloqueo de encendido en su vehículo"
],
    optionsEn: [
      "Pass a special written point exam within 30 days, or their license will be suspended",
      "Pay an immediate $1,000 court bail bond",
      "Retake the road driving test within 5 days",
      "Install an ignition interlock device in their vehicle"
],
    correctAnswer: 0,
    explanationEs: "Cuando su expediente alcanza 6 puntos por primera vez, debe aprobar un examen escrito especial dentro de los 30 días. Si lo aprueba, se le deducen 2 puntos. Si no lo aprueba o no se presenta, su licencia queda suspendida.",
    explanationEn: "When your driving record reaches 6 points for the first time, you must pass a special written point examination within 30 days. Passing removes 2 points; failure results in suspension.",
    manualRef: 'Capítulo 4, pág. 79 & 88 (Pregunta 7)',
    isHighProbability: true,
    probabilityReasonEs: "Sistema oficial de puntos de Pensilvania (Capítulo 4): pregunta clave de la normativa estatal.",
    probabilityReasonEn: "Official Pennsylvania point system: core regulatory test question."
  },
  {
    id: 'ch4-q8',
    chapter: 4,
    category: 'penndot_rules',
    textEs: "Bajo el sistema de puntos de Pensilvania, por cada 12 meses consecutivos en los que no cometa ninguna infracción que sume puntos, PennDOT:",
    textEn: "Under the Pennsylvania point system, for every 12 consecutive months you commit no point-bearing violations, PennDOT:",
    optionsEs: [
      "Elimina todos los puntos acumulados por completo",
      "Reduce 3 puntos de su registro de conducir",
      "Reduce 1 punto de su registro de conducir",
      "Le otorga un descuento del 50% en la renovación de la licencia"
],
    optionsEn: [
      "Removes all accumulated points completely",
      "Reduces 3 points from your driving record",
      "Reduces 1 point from your driving record",
      "Grants a 50% discount on driver license renewal"
],
    correctAnswer: 1,
    explanationEs: "Por cada 12 meses consecutivos sin ninguna infracción que sume puntos, PennDOT resta 3 puntos de su registro hasta que llegue a cero puntos.",
    explanationEn: "PennDOT removes 3 points from your record for every 12 consecutive months without any point violation until the record reaches zero.",
    manualRef: 'Capítulo 4, pág. 79 & 88 (Pregunta 8)',
    isHighProbability: true,
    probabilityReasonEs: "Regla de reducción de puntos de Pensilvania evaluada frecuentemente.",
    probabilityReasonEn: "Official PA point reduction calculation question."
  },
  {
    id: 'ch4-q10',
    chapter: 4,
    category: 'work_zone',
    textEs: "En Pensilvania, al ingresar a una zona de obras viales activa señalizada, por ley estatal usted debe encender los faros delanteros y tener en cuenta que:",
    textEn: "In Pennsylvania, when entering an active posted work zone, by state law you must turn on your headlights and note that:",
    optionsEs: [
      "Las multas por exceso de velocidad se duplican y exceder 11 mph o más resulta en 15 días de suspensión de la licencia",
      "Solo los camiones pesados tienen que reducir la velocidad",
      "Las multas son las mismas que en cualquier otra calle",
      "No se aplican penalidades si no hay trabajadores visibles"
],
    optionsEn: [
      "Speeding fines are doubled and driving 11+ mph over the limit results in a 15-day license suspension",
      "Only heavy commercial trucks must reduce their speed",
      "Fines are the exact same as on regular streets",
      "No penalties apply if no workers are visibly present"
],
    correctAnswer: 0,
    explanationEs: "En zonas de obras de PA: los faros son obligatorios por ley estatal (multa de $25 si no los enciende). Las multas por exceso de velocidad se DUPLICAN y si excede el límite por 11 mph o más su licencia será suspendida por 15 días.",
    explanationEn: "In PA work zones: headlights are mandatory by law ($25 fine). Speeding fines double, and driving 11 mph or more over the limit triggers a mandatory 15-day license suspension.",
    manualRef: 'Capítulo 4, pág. 81 & 88 (Preguntas 9 y 10)',
    isHighProbability: true,
    probabilityReasonEs: "Leyes de zonas de obras de Pensilvania: una de las preguntas de mayor énfasis en la seguridad vial de PA.",
    probabilityReasonEn: "Pennsylvania Work Zone Safety Act questions are heavily emphasized on knowledge tests."
  },
  {
    id: 'ch5-q3',
    chapter: 5,
    category: 'traffic_laws',
    textEs: "Si usted se muda y cambia de dirección residencial o cambia su nombre legal en Pensilvania, ¿cuántos días tiene por ley para notificar a PennDOT?",
    textEn: "If you move and change your residential address or change your legal name in Pennsylvania, how many days do you have by law to notify PennDOT?",
    optionsEs: [
      "30 días posteriores al cambio",
      "Dentro de los 15 días posteriores al cambio",
      "60 días o al momento de renovar la licencia",
      "No es obligatorio si continúa residiendo en el mismo condado"
],
    optionsEn: [
      "30 days following the change",
      "Within 15 days following the change",
      "60 days or at the time of license renewal",
      "Not required if staying within the same county"
],
    correctAnswer: 1,
    explanationEs: "La ley de Pensilvania exige que todo conductor notifique a PennDOT cualquier cambio de nombre o dirección dentro de los 15 días posteriores al cambio, incluso si se muda temporalmente fuera del estado.",
    explanationEn: "PA law mandates that drivers must notify PennDOT of any address or name change within 15 days following the change.",
    manualRef: 'Capítulo 5, pág. 89',
    isHighProbability: true,
    probabilityReasonEs: "Regla administrativa obligatoria evaluada comúnmente en el examen teórico.",
    probabilityReasonEn: "Mandatory administrative rule tested on PA driver tests."
  }
];

export function generatePennDOTMockExam(difficulty: DifficultyLevel = 'normal'): Question[] {
  const highProbabilityQs = OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.isHighProbability);
  const visualSigns = OFFICIAL_PENNDOT_QUESTIONS.filter(q => !!q.signId);
  const otherQuestions = OFFICIAL_PENNDOT_QUESTIONS.filter(q => !q.signId);

  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  let selected: Question[] = [];

  if (difficulty === 'easy') {
    // Easy mode: heavier focus on intuitive visual road signs and core rules
    const easyVisuals = shuffle(visualSigns).slice(0, 11);
    const easyHighProb = shuffle(highProbabilityQs.filter(q => !q.signId)).slice(0, 7);
    selected = [...easyVisuals, ...easyHighProb];
  } else if (difficulty === 'hard') {
    // Hard mode: heavier focus on tricky laws, penalties, BAC thresholds, DUI suspensions and technical rules
    const technicalQs = shuffle(
      OFFICIAL_PENNDOT_QUESTIONS.filter(
        q => q.category === 'alcohol_dui' || q.category === 'traffic_laws' || q.chapter === 4 || q.chapter === 5
      )
    ).slice(0, 9);
    const complexSigns = shuffle(visualSigns.filter(q => q.chapter !== 2 || q.id.includes('48') || q.id.includes('19') || q.id.includes('94'))).slice(0, 9);
    selected = [...technicalQs, ...complexSigns];
  } else {
    // Normal mode: PennDOT official real exam composition
    // In real PA tests: ~8-10 high probability questions, ~10 visual signs
    const highProbVisuals = shuffle(visualSigns.filter(q => q.isHighProbability)).slice(0, 6);
    const highProbOthers = shuffle(otherQuestions.filter(q => q.isHighProbability)).slice(0, 7);
    const remainingVisuals = shuffle(visualSigns.filter(q => !highProbVisuals.some(hv => hv.id === q.id))).slice(0, 4);
    const remainingOthers = shuffle(otherQuestions.filter(q => !highProbOthers.some(ho => ho.id === q.id))).slice(0, 1);
    selected = [...highProbVisuals, ...highProbOthers, ...remainingVisuals, ...remainingOthers];
  }

  // Ensure unique 18 questions
  const uniqueMap = new Map<string, Question>();
  selected.forEach(q => uniqueMap.set(q.id, q));

  if (uniqueMap.size < 18) {
    const remainder = shuffle(OFFICIAL_PENNDOT_QUESTIONS.filter(q => !uniqueMap.has(q.id)));
    for (const q of remainder) {
      uniqueMap.set(q.id, q);
      if (uniqueMap.size >= 18) break;
    }
  }

  return shuffle(Array.from(uniqueMap.values())).slice(0, 18);
}
