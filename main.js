const modalOn = () => {
    containerModal.classList.add('active');
    modal.classList.add('active');
    document.querySelector('#modal .header h2').textContent = 'Novo cliente'
    formName.focus()
    setTimeout(() => {
        document.addEventListener('click', modalHandle)
    })
}

const modalHandle = (event) => {
    if(!modal.contains(event.target)){
        containerModal.classList.remove('active');
        modal.classList.remove('active');
        document.removeEventListener('click', modalHandle)
        clearFields()
    }
}

const modalOff = () => {
    containerModal.classList.remove('active');
    modal.classList.remove('active');
    document.removeEventListener('click', modalHandle)
    clearFields()
}

const getClientsLocalStorage = () => JSON.parse(localStorage.getItem("db_cliente")) ?? []

const setClientsLocalStorage = (listClients) => {
    localStorage.setItem("db_cliente", JSON.stringify(listClients));
    modalOff();
    updateClientsTable();
}

const cadNewClient = (client) => {
    const listClients = getClientsLocalStorage()
    listClients.push(client)
    setClientsLocalStorage(listClients)
}

const updateClient = (index, client) => {
    const clients = getClientsLocalStorage()
    clients[index] = client
    setClientsLocalStorage(clients)
}

const deleteClient = (index) => {
    const client = getClientsLocalStorage()[index]
    const confirm = window.confirm(`Deseja remover ${client.name}`)
    if(confirm){
        const listClients = getClientsLocalStorage()
        listClients.splice(index, 1)
        setClientsLocalStorage(listClients)
    }
}

const clearFields = () => {
    const fields = document.querySelectorAll('#formClient input')
    fields.forEach(field => field.value = '')
}

const updateClientsTable = () => {
   const rows = document.querySelectorAll('#tbClient tbody tr')
   rows.forEach(row => row.parentNode.removeChild(row))

    const listClients = getClientsLocalStorage()
    listClients.forEach((client, index) => {
        const row = document.createElement('tr')
        row.innerHTML =
                `<td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.celular}</td>
                <td>${client.cidade}</td>
                <td>
                    <button onclick="editClient(${index})" class="btnGreen">Editar</button>
                    <button onclick="deleteClient(${index})" class="btnRed">Excluir</button>
                </td>`

        document.querySelector('#tbClient>tbody').appendChild(row)
    });
}

const isValidFields = () => {
    return formClient.reportValidity()
}

const editClient = (index) => {
    const client = getClientsLocalStorage()[index]

    formName.value = client.name
    formEmail.value = client.email
    formCelular.value = client.celular
    formCidade.value = client.cidade

    modalOn()
    document.querySelector('#modal .header h2').textContent = 'Editar cliente'
    document.querySelector('#modal>footer .btnGreen').setAttribute('id', index)
}

const saveClient = (index = '') => {
    if(isValidFields()){
        const client = {
            name: formName.value,
            email: formEmail.value,
            celular: formCelular.value,
            cidade: formCidade.value
        }

        if(index == ''){
            cadNewClient(client)
        }
        else{
            updateClient(index, client)
        }
    }
}

updateClientsTable()
