//const jsonArray = JSON.parse(jsonString);
let people;


//3- Generar una lista en memoria de la jerarquía de clases implementada en el punto 1
function getDatos() {
  try {
    let xhr = new XMLHttpRequest();

    // Configurar la solicitud con el método GET y la URL del endpoint
    xhr.open("GET", "http://localhost/2parcial/personasFutbolitasProfesionales.php", false); // El tercer parámetro es `false` para realizar la solicitud de forma síncrona

    // Enviar la solicitud
    xhr.send();

    // Verificar el código de respuesta
    if (xhr.status === 200) {
      // La solicitud fue exitosa
      let jsonString = xhr.responseText;

      // Convertir la cadena JSON en un objeto
      let jsonArray = JSON.parse(jsonString);

      // Generar la lista en memoria basada en la jerarquía de clases
      people = construirJerarquiaClases(jsonArray);
      // Mostrar el formulario de lista
      uploadDataTable(people);
    } else {
      // Mostrar una advertencia en caso de código de respuesta no exitoso
      alert("Error al obtener los datos desde la API.");
    }
  } catch (error) {
    // Capturar y mostrar la advertencia en caso de error
    //alert("Error al conectar con la base de datos: " + error.message);
     alert("Error al conectar con la base de datos, llame al servicio tecnico");
  }
};

function construirJerarquiaClases(data) {
  // Lógica para procesar la cadena JSON y construir la jerarquía de clases
  let persona = data.map((item) => {
    return "equipo" in item && "posicion" in item && "cantidadGoles" in item
      ? new Futbolista(
          item.id,
          item.nombre,
          item.apellido,
          item.edad,
          item.equipo,
          item.posicion,
          item.cantidadGoles
        )
      : new Profesional(
          item.id,
          item.nombre,
          item.apellido,
          item.edad,
          item.titulo,
          item.facultad,
          item.añoGraduacion
        );
  });
      // Devolver la lista construida
      return persona;
  }


//





const $ = (id) => document.getElementById(id);

const getAgeAverage = () => {
  const btnCalculateAgeAverage = $("btn-calculate-age-average");

  btnCalculateAgeAverage.addEventListener("click", (e) => {
    e.preventDefault();
    const inputCalculateAgeAverage = $("num-calculate-age-average");
    const typeFilter = $("ddl-type-filter");
    inputCalculateAgeAverage.value = calculateKeyAverage(
      typeFilter.value.toString(),
      "edad"
    );
  });
};

const createInputField = (name, type) => {
  const inputField = document.createElement("div");
  inputField.id = "input-field";

  const label = document.createElement("label");
  label.textContent = `${name}:`;
  label.setAttribute("for", `input-${name}`);

  const input = document.createElement("input");
  input.placeholder = `Ingrese ${name}`;
  input.type = type;
  input.id = `input-${name}`;
  input.required = true;

  inputField.appendChild(label);
  inputField.appendChild(input);

  return inputField;
};

const createCheckboxField = (input) => {
  const checkboxContainer = createInputField(input.name, "checkbox");
  checkboxContainer.id = `chk-container-${input.id}`;
  checkboxContainer.className = "chk-container";

  const inputElement = checkboxContainer.querySelector("input");
  const labelElement = checkboxContainer.querySelector("label");

  inputElement.removeAttribute("required");
  inputElement.setAttribute("checked", "true");
  inputElement.id = `chk-${input.id}`;
  labelElement.setAttribute("for", inputElement.id);

  return checkboxContainer;
};

const addCheckboxs = () => {
  const checkboxFields = $("ckl-colums-to-show");
  checkboxFields.innerHTML = "";

  const typeField = $("ddl-type-filter");
  const selectedValue = typeField.value;

  const selectedInputs =
    selectedValue === "persona"
      ? [...inputsDefault, ...inputsFutbolista, ...inputsProfesional]
      : selectedValue === "futbolista"
      ? [...inputsDefault, ...inputsFutbolista]
      : [...inputsDefault, ...inputsProfesional];

  selectedInputs.forEach((input) => {
    const checkboxContainer = createCheckboxField(input);
    checkboxFields.appendChild(checkboxContainer);
  });
};

const onChangeCheckbox = () => {
  const checkboxesContainer = $("ckl-colums-to-show");

  const checkboxDivs = checkboxesContainer.querySelectorAll(
    "div[id^='chk-container']"
  );

  checkboxDivs.forEach((checkboxDiv) => {
    const inputElement = checkboxDiv.querySelector("input");
    const id = inputElement.id;
    const cellClass = `cell-${id.replace("chk-", "")}`;
    const headerId = `header-${id.replace("chk-", "")}`;

    const checkbox = $(id);

    checkbox.addEventListener("change", () => {
      const cellElements = document.querySelectorAll(`#${cellClass}`);
      cellElements.forEach((element) => {
        element.style.display = checkbox.checked ? "table-cell" : "none";
      });

      const header = document.getElementById(headerId);
      header.style.display = checkbox.checked ? "table-cell" : "none";
    });
  });
};

const hideCheckboxsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToHide =
    value === "futbolista"
      ? [...inputsProfesional]
      : value === "profesional"
      ? [...inputsFutbolista]
      : [];

  const idsToHide = columnsToHide.map((column) => `chk-container-${column.id}`);
  changeDisplayElements(idsToHide, "none");
};

const changeDisplayElements = (element, display) => {
  element.forEach((id) => {
    const elements = document.querySelectorAll(`#${id}`);
    elements.forEach((element) => {
      element.style.display = display;
    });
  });
};

const showCheckboxsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToShow =
    value === "profesional"
      ? inputsProfesional
      : value === "futbolista"
      ? inputsFutbolista
      : [...inputsProfesional, ...inputsFutbolista];

  const idsToShow = columnsToShow.map((column) => `chk-container-${column.id}`);
  changeDisplayElements(idsToShow, "flex");
};

const hideColumnsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;

  const columnsToHide =
    value === "profesional"
      ? [...inputsFutbolista]
      : value === "futbolista"
      ? [...inputsProfesional]
      : [];

  const idsToHide = [
    ...columnsToHide.map((column) => `cell-${column.id}`),
    ...columnsToHide.map((column) => `header-${column.id}`),
  ];
  changeDisplayElements(idsToHide, "none");
};

const showColumnsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToShow =
    value === "futbolista"
      ? [...inputsFutbolista]
      : value === "profesional"
      ? [...inputsProfesional]
      : [...inputsFutbolista, ...inputsProfesional];

  const idsToHide = [
    ...columnsToShow.map((column) => `cell-${column.id}`),
    ...columnsToShow.map((column) => `header-${column.id}`),
  ];
  changeDisplayElements(idsToHide, "table-cell");
};

const onChangeFilterType = (value) => {
  hideCheckboxsByType();
  showCheckboxsByType();

  hideColumnsByType();
  showColumnsByType();

  const inputCalculateAgeAverage = $("num-calculate-age-average");
  inputCalculateAgeAverage.value = "";

  uploadDataTable(filterByTypePerson(value));
  onClickHeader();
};

const heardersToShow = () => {
  const checkboxesContainer = $("ckl-colums-to-show");
  const checkboxInfoArray = [];

  const checkboxDivs = checkboxesContainer.querySelectorAll(
    "div[id^='chk-container']"
  );

  checkboxDivs.forEach((checkboxDiv) => {
    const inputElement = checkboxDiv.querySelector("input");
    const labelElement = checkboxDiv.querySelector("label");

    const id = inputElement.id.replace("chk-", "");
    const name = labelElement.textContent.replace(":", "");
    checkboxInfoArray.push({ id, name });
  });

  return checkboxInfoArray;
};

const addTable = () => {
  const headers = $("header");
  headers.innerHTML = "";

  const selectedInputs = heardersToShow();

  selectedInputs.forEach((hearder) => {
    const th = document.createElement("th");
    th.id = `header-${hearder.id}`;
    th.textContent = hearder.name;
    headers.appendChild(th);
  });
};

const createRow = (item) => {
  const tr = document.createElement("tr");
  const selectedInputs = [...inputsDefault, ...inputsFutbolista, ...inputsProfesional];

  selectedInputs.forEach((header) => {
    const td = document.createElement("td");
    td.id = `cell-${header.id}`;
    td.textContent = item[header.id];
    tr.appendChild(td);
  });
  return tr;
};

const uploadDataTable = (data) => {
  const tbody = $("table-body");
  tbody.innerHTML = "";
  data.forEach((item) => {
    tbody.appendChild(createRow(item));
  });
  hideColumnsByType();
  showColumnsByType();
};

const onClickHeader = () => {
  const hearders = document.querySelectorAll("th");

  hearders.forEach((header) => {
    header.addEventListener("click", (e) => {
      e.preventDefault();
      const orderKey = e.target.id.replace("header-", "");
      const rows = filterByTypePerson($("ddl-type-filter").value)

      uploadDataTable(orderByKey(orderKey, rows));
      const checkboxDivs = document.querySelectorAll("input[type='checkbox']");

      const filter = Array.from(checkboxDivs)
        .flatMap((value) => {
          return (
            !value.checked && [
              value.id.replace("chk-", "header-"),
              value.id.replace("chk-", "cell-"),
            ]
          );
        })
        .filter((value) => value);

      changeDisplayElements(filter, "none");
    });
  });
};

const activateAbmForm = (editMode) => {
  const dataForm = $("form-data-container");
  const ambForm = $("form-amb-container");
  dataForm.style.display = "none";
  ambForm.style.display = "flex";

  const editButtons = $("btns-container-edit-delete");
  const addButtons = $("btns-container-add");

  if (editMode) {
    editButtons.style.display = "flex";
    addButtons.style.display = "none";
  } else {
    addButtons.style.display = "flex";
    editButtons.style.display = "none";
  }
};

const onDoubleClickOnTable = () => {
  const table = $("data-table");

  table.addEventListener("dblclick", (e) => {
    const row = e.target.closest("tr");
    if (row) {
      e.preventDefault();
      const cellIdElement = row.querySelector("td[id='cell-id']");

      if (cellIdElement) {
        const id = cellIdElement.textContent;
        const personToEdit = people.find(
          (person) => person.id.toString() === id
        );
        activateAbmForm(true);
        createFormAbm(personToEdit);
      }
    }
  });
};

const generateIdAndDisableField = () => {
  const idField = document.querySelector("#input-id");
  idField.value = new Date().getTime();
  idField.disabled = true;
};

const addInputByDefault = (initialValues) => {
  const inputsContainer = $("default-inputs-container");
  inputsContainer.innerHTML = "";

  inputsDefault.forEach((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    inputElement.value = initialValues ? initialValues[input.id] : "";
    
    if (input.id === "id") {
      inputElement.disabled = true;
    }

    if (input.type === "number") {
      inputElement.setAttribute("min", input.min);
    }

    inputsContainer.appendChild(inputContainer);
  });
  
  if (initialValues !== undefined) {
    const selectTypeOfPerson = $("dll-type-person");
    selectTypeOfPerson.value = initialValues instanceof Futbolista ? "futbolista" : "profesional";
    //selectTypeOfPerson.disabled = true;
  } else {
    generateIdAndDisableField();
  }
};

const addInputByTypePerson = (initialValues) => {
  const inputsContainer = $("dynamic-inputs-container");
  inputsContainer.innerHTML = "";

  const typeField = $("dll-type-person");
  const selectedInputs = typeField.value === "profesional" ? inputsProfesional : inputsFutbolista;

  selectedInputs.map((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    inputElement.value = initialValues ? initialValues[input.id] : "";
    if (input.type === "number") {
      inputElement.setAttribute("min", input.min);
    }
    inputsContainer.appendChild(inputContainer);
    
  });
};

const createFormAbm = (initialValues) => {
  addInputByDefault(initialValues);
  const selectTypeOfPerson = document.getElementById("dll-type-person");

  //Agrega un evento para detectar el cambio en el tipo de persona seleccionado
  selectTypeOfPerson.addEventListener("change", () => {
    const selectedType = selectTypeOfPerson.value;

    if (selectedType === "profesional") {
      addInputByTypePerson(initialValues);
    } else if (selectedType === "futbolista") {
      addInputByTypePerson(initialValues);
    } 
  });
};

const getFormDataAsObject = (formData) => {
  const data = formData.querySelectorAll("input");
  const dataArray = Array.from(data).map((value) => ({
    [value.id.replace("input-", "")]: value.value,
  }));

  return dataArray.reduce((acc, value) => ({ ...acc, ...value }), {});
};


//5- Implementar Funcionalidad de "Modificación".
function realizarSolicitudPutDelete(url, metodo, cuerpo) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo),
    })
      .then(response => {
        if (!response.ok) {
          reject(new Error('Error al realizar la operación.'));
        }
        return response.text();
      })
      .then(data => resolve(data))
      .catch(error => reject(new Error('Error en la conexión con el API: ' + error.message)));
  });
}


const editPerson = (formData) => {
  mostrarSpinner();
  const personEdited = getFormDataAsObject(formData);
   // Realizar la solicitud al API para modificar el elemento
   realizarSolicitudPutDelete('http://localhost/2parcial/personasFutbolitasProfesionales.php', 'POST', personEdited)
    .then(respuesta => {
      // Actualizar el ID y la lista con la respuesta del API
      if (respuesta === 'Exito') {
        const personId = parseInt(personEdited.id);
        const personToUpdate = people.find(
          (person) => person.id.toString() === personId.toString()
        );
  
        if (personToUpdate) {
          personToUpdate.update(personEdited);
          uploadDataTable(people);
        }
        
        // Ocultar el contenedor "Spinner", el formulario ABM y mostrar el formulario Lista
        ocultarSpinner();
      } else {
        // 4. Mostrar advertencia en caso de error
        throw new Error('Error en la solicitud a la API');
      }
     
    })
    .catch(error => {
      // En caso de error, ocultar el contenedor "Spinner", el formulario ABM, mostrar el formulario Lista y mostrar una advertencia
      ocultarSpinner();
      hideAbmForm();
      alert("error al modificar: " + error.message);
    });


  
};


const deletePerson = (formData) => {
  const personEdited = getFormDataAsObject(formData);
  const personId = parseInt(personEdited.id);

    // Bloquear la pantalla con el contenedor "Spinner"
    mostrarSpinner();
    // Realizar la solicitud al API para eliminar el elemento
    realizarSolicitudPutDelete('http://localhost/2parcial/personasFutbolitasProfesionales.php', 'DELETE', personId)
    .then(respuesta => {
      // Actualizar el ID y la lista con la respuesta del API
      if (respuesta === 'Exito') {
      people = people.filter((person) => person.id.toString() !== personId.toString());

      if (people) {
        uploadDataTable(people);
      }
      }
    })
    .catch(error => {
      // En caso de error, ocultar el contenedor "Spinner", el formulario ABM, mostrar el formulario Lista y mostrar una advertencia
      ocultarSpinner();
      hideAbmForm();
      alert("error al modificar: " + error.message);
    });
};

// Función para realizar la solicitud al API y devolver una promesa
async function realizarSolicitud(url, metodo, cuerpo) {
  try {
    const response = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo),
    });

    if (!response.ok) {
      throw new Error('Error al realizar la operación.');
    }

    return response.json();
  } catch (error) {
    throw new Error('Error en la conexión con el API: ' + error.message);
  }
}

async function addPerson (formData) {
  mostrarSpinner();
  try{
    const item = getFormDataAsObject(formData);

    const personObject =
      "equipo" in item && "posicion" in item && "cantidadGoles" in item
        ?  new Futbolista(
          item.id,
          item.nombre,
          item.apellido,
          item.edad,
          item.equipo,
          item.posicion,
          item.cantidadGoles
        )
        : new Profesional(
            item.id,
            item.nombre,
            item.apellido,
            item.edad,
            item.titulo,
            item.facultad,
            item.añoGraduacion
          );

    people.push(personObject);
    // Realizar la solicitud al API para agregar el elemento
    const respuesta = await realizarSolicitud('http://localhost/2parcial/personasFutbolitasProfesionales.php', 'PUT', personObject);

     // Insertar el nuevo elemento en la lista 
    uploadDataTable(people);
     // Ocultar el contenedor "Spinner", el formulario ABM y mostrar el formulario Lista
    ocultarSpinner();
    
  }
  catch (error) {
    // En caso de error, ocultar el contenedor "Spinner", el formulario ABM, mostrar el formulario Lista y mostrar una advertencia
    ocultarSpinner();
    hideAbmForm();
    
    alert("error al dar el alta: " + error.message);
  }
};

const handleAbmFormSubmit = (e) => {
  e.preventDefault();
  const clickedButton = document.querySelector('button[type="submit"]:focus');
  const buttonId = clickedButton.id;

  switch (buttonId) {
    case "btn-add":
      addPerson(e.target);
      break;
    case "btn-edit":
      editPerson(e.target);
      break;
    case "btn-delete":
      deletePerson(e.target);
      break;
  }

  hideAbmForm();
  e.stopPropagation();
};

const hideAbmForm = () => {
  const abmForm = $("form-amb-container");
  const dataForm = $("form-data-container");

  abmForm.style.display = "none";
  dataForm.style.display = "flex";
};

const handleDataFormSubmit = (e) => {
  e.preventDefault();

  activateAbmForm(false);
  createFormAbm();

};

const initializeDocument = () => {
  getDatos();
  getAgeAverage();
  addCheckboxs();
  addTable();
  onClickHeader();
  onDoubleClickOnTable();

  const typeField = $("ddl-type-filter");
  typeField.addEventListener("click", (e) =>
    onChangeFilterType(e.target.value)
  );

  const abmForm = $("form-amb-container");
  abmForm.addEventListener("submit", (e) => handleAbmFormSubmit(e));

  const formData = $("form-data-container");
  formData.addEventListener("submit", (e) => handleDataFormSubmit(e));

  const btnCancel = $("btn-cancel");
  btnCancel.addEventListener("click", () => hideAbmForm());

  onChangeCheckbox();
};

document.addEventListener("DOMContentLoaded", initializeDocument);
