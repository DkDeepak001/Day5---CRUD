const crud = artifacts.require('./CRUD.sol');

contract('CRUD',() => {
    //deploy contract
    let Crud = null;
    before (async () => {
        Crud = await crud.deployed();
    }) 

    //test create function
    it('It should create element', async () => {
        await Crud.create("deepak");
        await Crud.create("Sri kanth");
        const result = await Crud.read(1);
        assert(result[0].toNumber() === 1);
        assert(result[1] === "deepak");
    })

    //test read function
    it('It should read element', async () => {
        const result = await Crud.read(1);
        assert(result[1] === 'deepak');
    })

    //test update function 
    it("It should update Name",async () => {
        const oldValue = await Crud.read(2);
        await Crud.update(2,'Sanju');
        const result = await Crud.read(2);
        assert(result[1] === 'Sanju');
    })

    it("It Should not update not Existing user", async () => {
        try{
            await Crud.update(3,"Subu");
        }catch(e){
            assert(e.message.includes("User does not exits"));
            return;
        }
        assert(false)
    })
    it("It Should delete a user", async () =>{
        await Crud.deleteId(2);
        try{
            await Crud.read(2);
        }catch(e){
            assert(e.message.includes("User does not exits"));
            return;
        }
        assert(false);
    })
    it("It should not delete an non-existing user", async () => {
        try{
            await Crud.deleteId(10);
        }catch(e){
            assert(e.message.includes("User does not exits"));
            return;
        }
        assert(false);
    })
})