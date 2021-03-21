const onSend = (tasks, syringe, config) => {
  console.log(tasks);
  tasks.forEach((task) => {
    if (task.from > config.containersNum || task.to > config.containersNum) {
      throw new Error('La tarea excede el número de recipientes');
    }
    if (task.quantity > syringe) {
      throw new Error(
        'La tarea excede la capacidad de la jeringa seleccionada',
      );
    }
    console.log(`Consulta iniciada ${task}`);

    fetch(
      `${config.webserverUrl}/do_task?from=${task.from}&to=${task.to}&quantity=${task.quantity}`,
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
};

export default onSend;
