import {Alert} from 'react-native';

const onSend = async (tasksList, syringe, config) => {
  console.log(tasksList);
  let currentPosition = 0;

  for (let idx = 0, len = tasksList.length; idx < len; idx++) {
    console.log(`Iterando para tarea ${idx}`);
    let res, xSteps, zSteps;
    let task = tasksList[idx];

    xSteps = (task.from - 1) * config.xSteps - currentPosition;
    zSteps = task.quantity * config.stepsPerMl;

    // IR A FROM
    res = await fetch(`${config.webserverUrl}/x/${xSteps}/${config.xDelay}`);
    currentPosition = currentPosition + xSteps;

    // BAJAR LA JERGINGA
    res = await fetch(
      `${config.webserverUrl}/y/${config.yOffset}}/${config.yDelay}`,
    );

    // LLENAR EL ÉMBOLO
    res = await fetch(`${config.webserverUrl}/z/${zSteps}/${config.zDelay}`);

    // SUBIR LA JERINGA
    res = await fetch(
      `${config.webserverUrl}/y/${-config.yOffset}}/${config.yDelay}`,
    );

    // IR A TO
    xSteps = (task.to - 1) * config.xSteps - currentPosition;
    res = await fetch(`${config.webserverUrl}/x/${xSteps}/${config.xDelay}`);
    currentPosition = currentPosition + xSteps;

    // BAJAR LA JERGINGA
    res = await fetch(
      `${config.webserverUrl}/y/${config.yOffset}}/${config.yDelay}`,
    );

    // VACIAR EL ÉMBOLO
    res = await fetch(`${config.webserverUrl}/z/${-zSteps}/${config.zDelay}`);
    console.log(res);

    // SUBIR LA JERINGA
    res = await fetch(
      `${config.webserverUrl}/y/${-config.yOffset}}/${config.yDelay}`,
    );
  }
  // IR A INICIAL
  let res = await fetch(
    `${config.webserverUrl}/x/${-currentPosition}/${config.xDelay}`,
  );

  Alert.alert(
    'Procesos completados',
    `Todas las actividades se ejecutaron exitosamente.\n\nTemperatura actual: ${config.temperature}°C`,
    [
      {
        text: 'Aceptar',
        onPress: () => {
          console.log('Aceptado');
        },
      },
    ],
  );

  console.log(res);
};

export default onSend;
