import { ExerciseDataV2 } from './types';

export const EXERCISES_V2: ExerciseDataV2[] = [
  // 1. Crimp
  {
    id: 'crimp',
    names: { pt: 'Reglete (Crimp)', en: 'Crimp' },
    level: 'Avançado',
    tags: ['Mãos', 'Dedos', 'Força'],
    intro: { pt: "Segurar pequenas bordas usando a ponta dos dedos.", en: "Gripping small edges using fingertips." },
    description: { pt: "Arquear os dedos para criar uma ponte tensa. O polegar pode travar o indicador (Full Crimp) para força máxima.", en: "Arching fingers to create a tense bridge. Thumb can lock index (Full Crimp) for max power." },
    safety: { pt: "Alto risco de lesão nas polias (A2/A4). Evite Full Crimp repetitivo.", en: "High risk of pulley injury. Avoid repetitive Full Crimp." }
  },
  // 2. Sloper
  {
    id: 'sloper',
    names: { pt: 'Abaulado (Sloper)', en: 'Sloper' },
    level: 'Intermediário',
    tags: ['Mãos', 'Atrito', 'Posição'],
    intro: { pt: "Agarra arredondada que depende de atrito e posição corporal.", en: "Rounded hold relying on friction and body position." },
    description: { pt: "Mão aberta, máxima superfície de contato. O centro de gravidade deve estar abaixo da agarra.", en: "Open hand, max surface contact. Center of gravity must be below hold." },
    safety: { pt: "Requer punhos fortes. Risco de lesão por hiperextensão.", en: "Requires strong wrists. Hyperextension injury risk." }
  },
  // 3. Pinch
  {
    id: 'pinch',
    names: { pt: 'Pinça (Pinch)', en: 'Pinch' },
    level: 'Intermediário',
    tags: ['Mãos', 'Polegar', 'Força'],
    intro: { pt: "Agarra segurada em oposição entre polegar e dedos.", en: "Hold gripped in opposition between thumb and fingers." },
    description: { pt: "Ativação do adutor do polegar. Pode ser larga (bloco) ou estreita.", en: "Adductor pollicis activation. Can be wide (block) or narrow." },
    safety: { pt: "Cuidado com tenossinovite no polegar.", en: "Watch for thumb tenosynovitis." }
  },
  // 4. Undercling
  {
    id: 'undercling',
    names: { pt: 'Invertida (Undercling)', en: 'Undercling' },
    level: 'Iniciante',
    tags: ['Mãos', 'Bíceps', 'Tensão'],
    intro: { pt: "Puxar a agarra de baixo para cima.", en: "Pulling the hold from bottom to top." },
    description: { pt: "Palmas para cima. Requer pés altos e tensão corporal para funcionar.", en: "Palms up. Requires high feet and body tension to work." },
    safety: { pt: "Queda de costas é comum se o pé escorregar.", en: "Back fall common if foot slips." }
  },
  // 5. Gaston
  {
    id: 'gaston',
    names: { pt: 'Gaston', en: 'Gaston' },
    level: 'Intermediário',
    tags: ['Ombro', 'Oposição'],
    intro: { pt: "Puxar a agarra para fora com o cotovelo apontado para longe.", en: "Pulling hold outwards with elbow pointing away." },
    description: { pt: "Como abrir uma porta de elevador. Rotação interna do ombro.", en: "Like opening elevator doors. Internal shoulder rotation." },
    safety: { pt: "Alto estresse no manguito rotador (ombro).", en: "High stress on rotator cuff." }
  },
  // 6. Mantle
  {
    id: 'mantle',
    names: { pt: 'Mantle (Virada)', en: 'Mantle' },
    level: 'Avançado',
    tags: ['Tríceps', 'Topout'],
    intro: { pt: "Transição de puxar para empurrar.", en: "Transition from pull to push." },
    description: { pt: "Sair da piscina. Pressione a palma para baixo até esticar o braço.", en: "Pool exit. Press palm down until arm locks." },
    safety: { pt: "Cuidado com o ombro na transição.", en: "Watch shoulder during transition." }
  },
  // 7. Stemming
  {
    id: 'stemming',
    names: { pt: 'Ramone (Stemming)', en: 'Stemming' },
    level: 'Iniciante',
    tags: ['Pernas', 'Diedro'],
    intro: { pt: "Oposição de pés e mãos contra paredes opostas.", en: "Opposing feet/hands against opposite walls." },
    description: { pt: "Abrir as pernas e empurrar para fora. Confie no atrito.", en: "Spread legs and push out. Trust friction." },
    safety: { pt: "Risco de escorregar no meio (Split).", en: "Risk of slipping in the middle (Split)." }
  },
  // 8. Smear
  {
    id: 'smear',
    names: { pt: 'Aderência (Smear)', en: 'Smear' },
    level: 'Intermediário',
    tags: ['Pés', 'Atrito'],
    intro: { pt: "Usar a sola da sapatilha na parede lisa.", en: "Using shoe sole on flat wall." },
    description: { pt: "Pressione o pé perpendicular à parede. Baixe o calcanhar.", en: "Press foot perpendicular to wall. Drop heel." },
    safety: { pt: "Escorregões são repentinos. Esteja pronto.", en: "Slips are sudden. Be ready." }
  },
  // 9. Chimney
  {
    id: 'chimney',
    names: { pt: 'Chaminé', en: 'Chimney' },
    level: 'Iniciante',
    tags: ['Corpo Inteiro', 'Tradicional'],
    intro: { pt: "Escalar dentro de uma fenda larga.", en: "Climbing inside a wide crack." },
    description: { pt: "Costas em uma parede, pés na outra.", en: "Back on one wall, feet on other." },
    safety: { pt: "Sensação de claustrofobia. Aprenda a expirar para passar.", en: "Claustrophobia feeling. Learn to exhale to fit." }
  },
  // 10. Layback
  {
    id: 'layback',
    names: { pt: 'Dulfer (Layback)', en: 'Layback' },
    level: 'Iniciante',
    tags: ['Oposição', 'Força'],
    intro: { pt: "Puxar e empurrar em oposição lateral.", en: "Pull and push in lateral opposition." },
    description: { pt: "Mãos puxam a borda, pés empurram a parede oposta.", en: "Hands pull edge, feet push opposite wall." },
    safety: { pt: "Risco de 'barndoor' (girar) se perder o pé.", en: "Barndoor risk if foot slips." }
  },
  // 11. Jam
  {
    id: 'jam',
    names: { pt: 'Entalamento (Jam)', en: 'Jam' },
    level: 'Intermediário',
    tags: ['Fenda', 'Técnica'],
    intro: { pt: "Técnica geral de travar partes do corpo em fendas.", en: "General technique of locking body parts in cracks." },
    description: { pt: "Usar a expansão ou torção para criar fixação mecânica.", en: "Using expansion or torque to create mechanical lock." },
    safety: { pt: "Pode causar abrasão severa na pele.", en: "Can cause severe skin abrasion." }
  },
  // 12. Off-width
  {
    id: 'off_width',
    names: { pt: 'Off-width', en: 'Off-width' },
    level: 'Avançado',
    tags: ['Fenda', 'Força'],
    intro: { pt: "Fenda larga demais para mão, estreita demais para corpo.", en: "Crack too wide for hand, too narrow for body." },
    description: { pt: "Uso de 'Chicken Wing' e empilhamentos.", en: "Use of Chicken Wing and stacking." },
    safety: { pt: "Extremamente exaustivo e abrasivo.", en: "Extremely exhausting and abrasive." }
  },
  // 13. Stem - Stem rest
  {
    id: 'stem_rest',
    names: { pt: 'Descanso em Ramone', en: 'Stem Rest' },
    level: 'Intermediário',
    tags: ['Descanso', 'Estratégia'],
    intro: { pt: "Encontrar uma posição estável em diedro para soltar as mãos.", en: "Finding stable dihedral position to release hands." },
    description: { pt: "Travar as pernas esticadas para relaxar o tronco.", en: "Lock straight legs to relax torso." },
    safety: { pt: "Garanta que os pés não vão escorregar antes de soltar.", en: "Ensure feet won't slip before letting go." }
  },
  // 14. Heel hook
  {
    id: 'heel_hook',
    names: { pt: 'Gancho de Calcanhar', en: 'Heel Hook' },
    level: 'Intermediário',
    tags: ['Pés', 'Puxada'],
    intro: { pt: "Usar o calcanhar para puxar ou estabilizar.", en: "Using heel to pull or stabilize." },
    description: { pt: "Ativação forte do posterior da coxa (Isquiotibiais).", en: "Strong hamstring activation." },
    safety: { pt: "Risco para o joelho (LCL) e distensão de posterior.", en: "Risk to knee (LCL) and hamstring strain." }
  },
  // 15. Toe hook
  {
    id: 'toe_hook',
    names: { pt: 'Gancho de Dedos', en: 'Toe Hook' },
    level: 'Avançado',
    tags: ['Pés', 'Teto'],
    intro: { pt: "Usar o peito do pé para puxar (fazer gancho).", en: "Using top of foot to pull (hook)." },
    description: { pt: "Dorsiflexão ativa (puxar ponta do pé para canela).", en: "Active dorsiflexion (pull toe to shin)." },
    safety: { pt: "Pode causar canelite (tibial anterior).", en: "Can cause shin splints." }
  },
  // 16. Knee bar
  {
    id: 'knee_bar',
    names: { pt: 'Knee Bar', en: 'Knee Bar' },
    level: 'Avançado',
    tags: ['Descanso', 'Travamento'],
    intro: { pt: "Travar a perna entre o pé e o joelho.", en: "Camming leg between foot and knee." },
    description: { pt: "Pressione o pé e puxe o joelho contra a rocha.", en: "Press foot and pull knee against rock." },
    safety: { pt: "Doloroso para a coxa. Use joelheira.", en: "Painful on thigh. Use kneepad." }
  },
  // 17. Drop knee
  {
    id: 'drop_knee',
    names: { pt: 'Drop Knee (Egípcio)', en: 'Drop Knee' },
    level: 'Intermediário',
    tags: ['Pés', 'Técnica'],
    intro: { pt: "Girar o joelho para dentro e para baixo.", en: "Rotating knee inwards and down." },
    description: { pt: "Aproxima o quadril da parede e estende o alcance.", en: "Brings hip close to wall, extends reach." },
    safety: { pt: "Cuidado com o ligamento colateral medial do joelho.", en: "Watch medial collateral knee ligament." }
  },
  // 18. Dyno
  {
    id: 'dyno',
    names: { pt: 'Dyno (Dinâmico)', en: 'Dyno' },
    level: 'Avançado',
    tags: ['Potência', 'Salto'],
    intro: { pt: "Salto explosivo perdendo contato com agarras.", en: "Explosive jump losing contact with holds." },
    description: { pt: "Geração de momento a partir do quadril e pernas.", en: "Momentum generation from hips/legs." },
    safety: { pt: "Alto impacto nos ombros na aterrissagem.", en: "High shoulder impact on latching." }
  },
  // 19. Deadpoint
  {
    id: 'deadpoint',
    names: { pt: 'Deadpoint', en: 'Deadpoint' },
    level: 'Avançado',
    tags: ['Precisão', 'Dinâmico'],
    intro: { pt: "Pegar a agarra no momento zero da gravidade.", en: "Catching hold at zero gravity moment." },
    description: { pt: "Movimento dinâmico controlado, sem perder os pés.", en: "Controlled dynamic move, feet stay on." },
    safety: { pt: "Menor risco que o Dyno, mas exige precisão.", en: "Lower risk than Dyno, but needs precision." }
  },
  // 20. Campus
  {
    id: 'campus',
    names: { pt: 'Campus', en: 'Campus' },
    level: 'Elite',
    tags: ['Força', 'Treino'],
    intro: { pt: "Escalar usando apenas os braços.", en: "Climbing using only arms." },
    description: { pt: "Puxada pura e força de contato.", en: "Pure pull and contact strength." },
    safety: { pt: "Alto risco de lesão. Não para iniciantes.", en: "High injury risk. Not for beginners." }
  },
  // 21. Flagging
  {
    id: 'flagging',
    names: { pt: 'Bandeira (Flagging)', en: 'Flagging' },
    level: 'Intermediário',
    tags: ['Equilíbrio', 'Core'],
    intro: { pt: "Usar a perna livre como contrapeso.", en: "Using free leg as counterweight." },
    description: { pt: "Estique a perna para anular a rotação (barndoor).", en: "Extend leg to negate rotation." },
    safety: { pt: "Evita gastar força excessiva de braço.", en: "Avoids wasting arm strength." }
  },
  // 22. Bat hang
  {
    id: 'bat_hang',
    names: { pt: 'Morcego (Bat Hang)', en: 'Bat Hang' },
    level: 'Avançado',
    tags: ['Teto', 'Diversão'],
    intro: { pt: "Pendurar-se pelos pés de cabeça para baixo.", en: "Hanging by feet upside down." },
    description: { pt: "Gancho duplo de dedos em borda grande.", en: "Double toe hook on large lip." },
    safety: { pt: "Risco de queda de cabeça. Spotter obrigatório.", en: "Head fall risk. Spotter mandatory." }
  },
  // 23. Hand jam
  {
    id: 'hand_jam',
    names: { pt: 'Fenda de Mão', en: 'Hand Jam' },
    level: 'Intermediário',
    tags: ['Fenda', 'Mão'],
    intro: { pt: "Entalar a mão na fenda.", en: "Jamming hand in crack." },
    description: { pt: "Polegar para dentro (comum) ou para fora.", en: "Thumb in (common) or out." },
    safety: { pt: "Proteja o dorso da mão com esparadrapo.", en: "Tape back of hand." }
  },
  // 24. Fist jam
  {
    id: 'fist_jam',
    names: { pt: 'Fenda de Punho', en: 'Fist Jam' },
    level: 'Intermediário',
    tags: ['Fenda', 'Punho'],
    intro: { pt: "Entalar a mão fechada (punho).", en: "Jamming closed hand (fist)." },
    description: { pt: "Para fendas mais largas que a mão plana.", en: "For cracks wider than flat hand." },
    safety: { pt: "Cuidado com as articulações dos dedos (nós).", en: "Watch finger knuckles." }
  },
  // 25. Finger jam
  {
    id: 'finger_jam',
    names: { pt: 'Fenda de Dedo', en: 'Finger Jam' },
    level: 'Avançado',
    tags: ['Fenda', 'Dedos'],
    intro: { pt: "Travar os dedos em fendas estreitas e girar.", en: "Locking fingers in tight cracks and twisting." },
    description: { pt: "Geralmente com a palma voltada para fora (Thumb down).", en: "Usually palm out (Thumb down)." },
    safety: { pt: "Alto torque nas articulações dos dedos.", en: "High torque on finger joints." }
  },
  // 26. Thumb catch
  {
    id: 'thumb_catch',
    names: { pt: 'Trava de Polegar', en: 'Thumb Catch' },
    level: 'Avançado',
    tags: ['Mãos', 'Sutil'],
    intro: { pt: "Usar o polegar ativamente para parar um balanço.", en: "Using thumb actively to stop a swing." },
    description: { pt: "Encaixar o polegar em uma quina ou lateral.", en: "Hooking thumb on a corner or side." },
    safety: { pt: "Risco de torção se o corpo girar forte.", en: "Sprain risk if body spins hard." }
  },
  // 27. Toe catch
  {
    id: 'toe_catch',
    names: { pt: 'Captura de Pé', en: 'Toe Catch' },
    level: 'Avançado',
    tags: ['Dinâmico', 'Pés'],
    intro: { pt: "Parar um balanço dinâmico enganchando o pé.", en: "Stopping dynamic swing by hooking foot." },
    description: { pt: "Requer coordenação olho-pé rápida.", en: "Requires fast eye-foot coordination." },
    safety: { pt: "Impacto forte nos isquiotibiais.", en: "Strong impact on hamstrings." }
  },
  // 28. Thumb press
  {
    id: 'thumb_press',
    names: { pt: 'Pressão de Polegar', en: 'Thumb Press' },
    level: 'Avançado',
    tags: ['Mãos', 'Técnica'],
    intro: { pt: "Empurrar o polegar para baixo (como um botão).", en: "Pushing thumb down (like a button)." },
    description: { pt: "Estabiliza pinças gaston ou agarras pequenas.", en: "Stabilizes gaston pinches or small holds." },
    safety: { pt: "Evita que a mão escorregue.", en: "Prevents hand slipping." }
  },
  // 29. Hip twist
  {
    id: 'hip_twist',
    names: { pt: 'Torção de Quadril', en: 'Hip Twist' },
    level: 'Intermediário',
    tags: ['Core', 'Fluxo'],
    intro: { pt: "Iniciar o movimento girando o quadril na parede.", en: "Initiating move by twisting hip into wall." },
    description: { pt: "Gera alcance sem puxar com o braço.", en: "Generates reach without arm pull." },
    safety: { pt: "Poupa energia dos braços.", en: "Saves arm energy." }
  },
  // 30. Rock over
  {
    id: 'rock_over',
    names: { pt: 'Rock Over', en: 'Rock Over' },
    level: 'Intermediário',
    tags: ['Equilíbrio', 'Pernas'],
    intro: { pt: "Transferir todo o peso para um pé alto.", en: "Transferring all weight onto a high foot." },
    description: { pt: "Mover o centro de massa sobre o joelho.", en: "Moving center of mass over the knee." },
    safety: { pt: "Cuidado com a virilha/adutores.", en: "Watch groin/adductors." }
  },
  // 31. High step
  {
    id: 'high_step',
    names: { pt: 'Pé Alto', en: 'High Step' },
    level: 'Iniciante',
    tags: ['Flexibilidade'],
    intro: { pt: "Colocar o pé em agarra na altura do quadril ou acima.", en: "Placing foot at hip height or above." },
    description: { pt: "Requer flexibilidade e força de quadríceps.", en: "Requires flexibility and quad strength." },
    safety: { pt: "Aqueça bem o quadril.", en: "Warm up hips well." }
  },
  // 32. Toe scum
  {
    id: 'toe_scum',
    names: { pt: 'Arrasto de Ponta', en: 'Toe Scum' },
    level: 'Intermediário',
    tags: ['Atrito', 'Equilíbrio'],
    intro: { pt: "Arrastar o peito do pé na parede para equilíbrio.", en: "Dragging top of foot on wall for balance." },
    description: { pt: "Não segura peso, apenas evita giro.", en: "Doesn't hold weight, just stops spin." },
    safety: { pt: "Desgasta muito a sapatilha.", en: "Wears shoe rubber fast." }
  },
  // 33. Hand-foot match
  {
    id: 'hand_foot_match',
    names: { pt: 'Mão no Pé', en: 'Hand-Foot Match' },
    level: 'Avançado',
    tags: ['Flexibilidade'],
    intro: { pt: "Colocar o pé na mesma agarra da mão.", en: "Placing foot on same hold as hand." },
    description: { pt: "Troca tração por pressão. Essencial em mantles.", en: "Swaps traction for pressure. Essential in mantles." },
    safety: { pt: "Risco de pé escorregar e bater no rosto.", en: "Risk of foot slip hitting face." }
  },
  // 34. Bicycle
  {
    id: 'bicycle',
    names: { pt: 'Bicicleta', en: 'Bicycle' },
    level: 'Avançado',
    tags: ['Teto', 'Compressão'],
    intro: { pt: "Um pé empurra, o outro puxa (sanduíche).", en: "One foot pushes, other pulls (sandwich)." },
    description: { pt: "Cria compressão para ficar no teto.", en: "Creates compression to stay on roof." },
    safety: { pt: "Cãibras na panturrilha são comuns.", en: "Calf cramps common." }
  },
  // 35. Stem corner
  {
    id: 'stem_corner',
    names: { pt: 'Canto em Oposição', en: 'Stem Corner' },
    level: 'Intermediário',
    tags: ['Diedro'],
    intro: { pt: "Stemming específico em canto de 90 graus.", en: "Specific stemming in 90-degree corner." },
    description: { pt: "Pés em paredes adjacentes.", en: "Feet on adjacent walls." },
    safety: { pt: "Estabilidade depende de pressão constante.", en: "Stability relies on constant pressure." }
  },
  // 36. Toe point
  {
    id: 'toe_point',
    names: { pt: 'Ponta de Pé', en: 'Toe Point' },
    level: 'Iniciante',
    tags: ['Pés', 'Básico'],
    intro: { pt: "Pisar com a ponta da sapatilha (frontal).", en: "Stepping with shoe tip (frontal)." },
    description: { pt: "Posição padrão para buracos e agarras pequenas.", en: "Standard for pockets and small holds." },
    safety: { pt: "Fortaleça a panturrilha.", en: "Strengthen calf." }
  },
  // 37. Toe turn-in
  {
    id: 'toe_turn_in',
    names: { pt: 'Ponta para Dentro', en: 'Toe Turn-in' },
    level: 'Intermediário',
    tags: ['Pés', 'Alcance'],
    intro: { pt: "Girar o pé para usar a borda externa.", en: "Turning foot to use outside edge." },
    description: { pt: "Prepara para Backstep ou Drop Knee.", en: "Prepares for Backstep or Drop Knee." },
    safety: { pt: "Requer mobilidade de tornozelo.", en: "Requires ankle mobility." }
  },
  // 38. Toe turn-out
  {
    id: 'toe_turn_out',
    names: { pt: 'Ponta para Fora', en: 'Toe Turn-out' },
    level: 'Iniciante',
    tags: ['Pés', 'Sapo'],
    intro: { pt: "Girar o pé para usar a borda interna.", en: "Turning foot to use inside edge." },
    description: { pt: "Posição clássica de 'sapo' (Frog).", en: "Classic Frog position." },
    safety: { pt: "Cuidado com joelhos valgos.", en: "Watch for valgus knees." }
  },
  // 39. Toe smear
  {
    id: 'toe_smear',
    names: { pt: 'Aderência de Ponta', en: 'Toe Smear' },
    level: 'Intermediário',
    tags: ['Pés', 'Atrito'],
    intro: { pt: "Pressionar a ponta do pé contra a parede (sem borda).", en: "Pressing toe tip against wall (no edge)." },
    description: { pt: "Diferente do Smear clássico (que usa a sola).", en: "Unlike classic Smear (uses sole)." },
    safety: { pt: "Exige sapatilha macia.", en: "Requires soft shoe." }
  },
  // 40. Knee scum
  {
    id: 'knee_scum',
    names: { pt: 'Apoio de Joelho', en: 'Knee Scum' },
    level: 'Intermediário',
    tags: ['Equilíbrio'],
    intro: { pt: "Apoiar o joelho levemente para equilíbrio.", en: "Resting knee lightly for balance." },
    description: { pt: "Não é um travamento (Knee Bar), é um apoio.", en: "Not a lock (Knee Bar), just a prop." },
    safety: { pt: "Sem joelheira, machuca a pele.", en: "Without pad, hurts skin." }
  },
  // 41. Chicken wing
  {
    id: 'chicken_wing',
    names: { pt: 'Asa de Frango', en: 'Chicken Wing' },
    level: 'Avançado',
    tags: ['Fenda', 'Off-width'],
    intro: { pt: "Cotovelo para cima, mão para baixo.", en: "Elbow up, hand down." },
    description: { pt: "Alavanca de bloqueio em fendas largas.", en: "Locking lever in wide cracks." },
    safety: { pt: "Estresse no ombro.", en: "Shoulder stress." }
  },
  // 42. Finger lock
  {
    id: 'finger_lock',
    names: { pt: 'Trava de Dedo', en: 'Finger Lock' },
    level: 'Avançado',
    tags: ['Fenda'],
    intro: { pt: "Travar a articulação do dedo em constrição.", en: "Locking finger joint in constriction." },
    description: { pt: "Técnica chave para fendas finas.", en: "Key tech for thin cracks." },
    safety: { pt: "Risco de lesão ligamentar.", en: "Ligament injury risk." }
  },
  // 43. Finger Stack
  {
    id: 'finger_stack',
    names: { pt: 'Empilhamento', en: 'Finger Stack' },
    level: 'Avançado',
    tags: ['Fenda'],
    intro: { pt: "Cruzar dedos para preencher espaço.", en: "Crossing fingers to fill space." },
    description: { pt: "Dedos se apoiam mutuamente.", en: "Fingers support each other." },
    safety: { pt: "Se escorregar, machuca muito.", en: "If slips, hurts bad." }
  },
  // 44. Shoulder stand
  {
    id: 'shoulder_stand',
    names: { pt: 'Parada de Ombro', en: 'Shoulder Stand' },
    level: 'Elite',
    tags: ['Invertido', 'Mantle'],
    intro: { pt: "Pressionar o ombro contra a rocha (invertido).", en: "Pressing shoulder against rock (inverted)." },
    description: { pt: "Muitas vezes usado em chaminés ou tetos.", en: "Often used in chimneys or roofs." },
    safety: { pt: "Compressão espinhal.", en: "Spinal compression." }
  },
  // 45. Back step
  {
    id: 'back_step',
    names: { pt: 'Pé de Trás (Back Step)', en: 'Back Step' },
    level: 'Iniciante',
    tags: ['Pés'],
    intro: { pt: "Pisar com a borda externa do pé de trás.", en: "Stepping with outside edge of back foot." },
    description: { pt: "Gira o quadril para a parede.", en: "Turns hip to wall." },
    safety: { pt: "Estabilidade lateral.", en: "Lateral stability." }
  },
  // 46. Knee jam
  {
    id: 'knee_jam',
    names: { pt: 'Entalamento de Joelho', en: 'Knee Jam' },
    level: 'Avançado',
    tags: ['Fenda', 'Off-width'],
    intro: { pt: "Entalar o joelho dentro da fenda.", en: "Jamming knee inside crack." },
    description: { pt: "Torcer o joelho para travar.", en: "Twisting knee to lock." },
    safety: { pt: "Perigo de lesão meniscal.", en: "Meniscus injury danger." }
  },
  // 47. Crimp-lock-off
  {
    id: 'crimp_lock_off',
    names: { pt: 'Bloqueio em Reglete', en: 'Crimp Lock-off' },
    level: 'Avançado',
    tags: ['Força'],
    intro: { pt: "Puxar e travar em uma agarra crimp.", en: "Pull and lock on a crimp hold." },
    description: { pt: "Combina força de dedo e braço.", en: "Combines finger and arm strength." },
    safety: { pt: "Máximo estresse.", en: "Max stress." }
  },
  // 48. Mono
  {
    id: 'mono',
    names: { pt: 'Monodedo', en: 'Mono' },
    level: 'Elite',
    tags: ['Dedos', 'Bolso'],
    intro: { pt: "Segurar com apenas um dedo.", en: "Holding with just one finger." },
    description: { pt: "Geralmente dedo médio.", en: "Usually middle finger." },
    safety: { pt: "Risco de ruptura de tendão instantânea.", en: "Instant tendon rupture risk." }
  },
  // 49. Toe drag
  {
    id: 'toe_drag',
    names: { pt: 'Arrasto de Pé', en: 'Toe Drag' },
    level: 'Intermediário',
    tags: ['Equilíbrio'],
    intro: { pt: "Deixar o pé arrastar para estabilidade.", en: "Letting foot drag for stability." },
    description: { pt: "Comum em movimentos dinâmicos.", en: "Common in dynamic moves." },
    safety: { pt: "Destrói a sapatilha.", en: "Destroys shoes." }
  },
  // 50. Layaway
  {
    id: 'layaway',
    names: { pt: 'Saída Lateral', en: 'Layaway' },
    level: 'Intermediário',
    tags: ['Mãos'],
    intro: { pt: "Puxar lateralmente enquanto inclina o corpo.", en: "Pulling laterally while leaning body." },
    description: { pt: "Similar ao layback, mas com uma mão.", en: "Similar to layback, but one hand." },
    safety: { pt: "Requer core forte.", en: "Requires strong core." }
  },
  // 51. Flag-pole
  {
    id: 'flag_pole',
    names: { pt: 'Bandeira Mastro', en: 'Flag-pole' },
    level: 'Avançado',
    tags: ['Core'],
    intro: { pt: "Bandeira extrema com corpo esticado.", en: "Extreme flag with straight body." },
    description: { pt: "Corpo forma uma linha longa.", en: "Body forms a long line." },
    safety: { pt: "Tensão lombar.", en: "Lumbar tension." }
  },
  // 52. Shoulder press
  {
    id: 'shoulder_press',
    names: { pt: 'Pressão de Ombro', en: 'Shoulder Press' },
    level: 'Intermediário',
    tags: ['Gaston', 'Mantle'],
    intro: { pt: "Empurrar para baixo com o ombro ativado.", en: "Pushing down with activated shoulder." },
    description: { pt: "Usado em mantles e diedros apertados.", en: "Used in mantles and tight corners." },
    safety: { pt: "Evite encolher o pescoço.", en: "Avoid shrugging neck." }
  },
  // 53. Toe Cam
  {
    id: 'toe_cam',
    names: { pt: 'Came de Pé', en: 'Toe Cam' },
    level: 'Avançado',
    tags: ['Fenda'],
    intro: { pt: "Torcer o pé em fenda (ação de cam).", en: "Twisting foot in crack (cam action)." },
    description: { pt: "O pé atua como uma peça móvel.", en: "Foot acts like a camming device." },
    safety: { pt: "Dor intensa no pé.", en: "Intense foot pain." }
  },
  // 54. Figure Four
  {
    id: 'figure_four',
    names: { pt: 'Figura 4', en: 'Figure Four' },
    level: 'Elite',
    tags: ['Gelo', 'Dry', 'Técnica'],
    intro: { pt: "Perna sobre o braço oposto.", en: "Leg over opposite arm." },
    description: { pt: "Cria alcance quando não há pés.", en: "Creates reach when no feet." },
    safety: { pt: "Ombro de aço necessário.", en: "Steel shoulder needed." }
  },
  // 55. Drop-knee twist
  {
    id: 'drop_knee_twist',
    names: { pt: 'Torção em Drop', en: 'Drop-knee Twist' },
    level: 'Avançado',
    tags: ['Pés'],
    intro: { pt: "Drop knee profundo com torção de coluna.", en: "Deep drop knee with spine twist." },
    description: { pt: "Maximiza alcance vertical.", en: "Maximizes vertical reach." },
    safety: { pt: "Cuidado com o joelho.", en: "Watch the knee." }
  },
  // 56. Arm Bar
  {
    id: 'arm_bar',
    names: { pt: 'Barra de Braço', en: 'Arm Bar' },
    level: 'Avançado',
    tags: ['Fenda', 'Off-width'],
    intro: { pt: "Braço inteiro dentro da fenda.", en: "Whole arm inside crack." },
    description: { pt: "Pressione palma e cotovelo contra paredes.", en: "Press palm and elbow against walls." },
    safety: { pt: "Ombro vulnerável.", en: "Shoulder vulnerable." }
  },
  // 57. Crossover
  {
    id: 'crossover',
    names: { pt: 'Cruzada (Crossover)', en: 'Crossover' },
    level: 'Intermediário',
    tags: ['Mãos'],
    intro: { pt: "Cruzar um braço sobre o outro.", en: "Crossing one arm over other." },
    description: { pt: "Mantém o quadril na parede.", en: "Keeps hip to wall." },
    safety: { pt: "Evite girar para fora (barndoor).", en: "Avoid spinning out (barndoor)." }
  },
  // 58. Rose Move
  {
    id: 'rose_move',
    names: { pt: 'Rose Move', en: 'Rose Move' },
    level: 'Elite',
    tags: ['Cruzada', 'Histórico'],
    intro: { pt: "Cruzada extrema com cabeça baixa.", en: "Extreme cross with head low." },
    description: { pt: "Torção máxima de tronco.", en: "Max trunk twist." },
    safety: { pt: "Mobilidade torácica.", en: "Thoracic mobility." }
  },
  // 59. Calf Lock
  {
    id: 'calf_lock',
    names: { pt: 'Trava de Panturrilha', en: 'Calf Lock' },
    level: 'Avançado',
    tags: ['Fenda', 'Pernas'],
    intro: { pt: "Travar a panturrilha em fenda ou aresta.", en: "Locking calf in crack or arete." },
    description: { pt: "Similar ao Knee Bar, mas mais baixo.", en: "Like Knee Bar but lower." },
    safety: { pt: "Compressão muscular.", en: "Muscle compression." }
  },
  // 60. Straight Arms
  {
    id: 'straight_arms',
    names: { pt: 'Braços Esticados', en: 'Straight Arms' },
    level: 'Iniciante',
    tags: ['Fundamento'],
    intro: { pt: "Escalar com cotovelos estendidos.", en: "Climbing with extended elbows." },
    description: { pt: "Pendure-se no esqueleto, não no músculo.", en: "Hang on skeleton, not muscle." },
    safety: { pt: "Economia vital de energia.", en: "Vital energy saving." }
  },
  // 61. Bridge
  {
    id: 'bridge',
    names: { pt: 'Ponte', en: 'Bridge' },
    level: 'Intermediário',
    tags: ['Stemming', 'Descanso'],
    intro: { pt: "Posição aberta entre duas paredes.", en: "Open position between two walls." },
    description: { pt: "Pés distantes, corpo no meio.", en: "Feet wide, body in middle." },
    safety: { pt: "Flexibilidade de adutores.", en: "Adductor flexibility." }
  },
  // 62. Climb Down
  {
    id: 'climb_down',
    names: { pt: 'Desescalada', en: 'Climb Down' },
    level: 'Iniciante',
    tags: ['Segurança'],
    intro: { pt: "Descer escalando.", en: "Climbing down." },
    description: { pt: "Treina footwork e previne lesão.", en: "Trains footwork and prevents injury." },
    safety: { pt: "Salve seus joelhos.", en: "Save your knees." }
  },
  // 63. Jug
  {
    id: 'jug',
    names: { pt: 'Agarrão (Jug)', en: 'Jug' },
    level: 'Iniciante',
    tags: ['Mãos', 'Descanso'],
    intro: { pt: "Agarra grande e positiva.", en: "Large positive hold." },
    description: { pt: "Fácil de segurar, ótimo para descanso.", en: "Easy to hold, great for rest." },
    safety: { pt: "Aproveite para relaxar.", en: "Use to relax." }
  }
];

