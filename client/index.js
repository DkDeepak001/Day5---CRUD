import Web3 from "web3";
import Crud from "../build/contracts/CRUD.json";

let web3;
let crud;

const initWeb3 = () =>{
    return new Promise((resolve, reject) => {
        //case1: new meta mask
        if( typeof window.ethereum !== 'undefined'){
            window.ethereum.enable()
            .then( () => {
                resolve(new Web3(window.ethereum));
                
            }).catch(e => {
                reject(e);
            });
        }

        //case2 : old metamask
        if(typeof window.web3 !== 'undefined'){
            return resolve(new Web3(window.web3.currentProvider));
        }

        //case 3 : no metamask
        resolve(new Web3('HTTP://127.0.0.1:7545'))
    });

}

const initContract = () => {
    const deploymentKey = Object.keys(Crud.networks);
    return new web3.eth.Contract(Crud.abi,Crud.networks[deploymentKey].address)
}

const initApp = () =>{
    console.clear();
    console.log("init app");

    const $fromCreate = document.getElementById('create');
    const $fromRead = document.getElementById('read');
    const $fromEdit = document.getElementById('edit');
    const $fromDelete = document.getElementById('delete');

    //init accounts
    let accounts = [];
    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
        
    })
    //create
    $fromCreate.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(" create form submited");
        const value = document.getElementById('name').value;
        const result = document.getElementById('create-result');
        crud.methods
        .create(value)
        .send({from : accounts[0]})
        .then( () => {
            result.innerHTML = "New user " + value + " was created";
        })
        
    })
    $fromRead.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(" Rea$fromRead form submited");
        const value = document.getElementById('read-id').value;
        const result = document.getElementById('read-result');
        crud.methods
        .read(value)
        .call()
        .then( (res) => {
            result.innerHTML = (res[1]);
        })
    })
    $fromEdit.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(" Edit form submited");
        const EditIdValue = document.getElementById("edit-id").value;
        const EditNameValue = document.getElementById("edit-name").value;
        const EditResult = document.getElementById("edit-result");

        crud.methods
        .update(EditIdValue,EditNameValue)
        .send({from:accounts[0]})
        .then( () => {
            EditResult.innerHTML = "User Id: "+ EditIdValue +"Update to "+ EditNameValue + " update ";
        })
    })
    $fromDelete.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(" Delete form submited");
        const Id = document.getElementById("delete-id").value;
        const result = document.getElementById("delete-result");

        crud.methods
        .deleteId(Id)
        .send({from : accounts[0]})
        .then( () => {
            result.innerHTML = "deleted" + Id + "sucessfully";
        })
    })


}

document.addEventListener("DOMContentLoaded",() => {
    initWeb3()
    .then(_web3 => {
        web3 = _web3;
        crud = initContract();
        initApp();
    }).catch(e => {
        console.log(e.message);
    })
})

