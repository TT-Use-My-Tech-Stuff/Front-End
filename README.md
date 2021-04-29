## Front-End

Endpoint Documentation:


axios.get("/")
returns json object {api: "up"}



axios.post("/api/users/register")
requires a user object = {
    username: "must be unique",
    password: "must be a string",
    user_type: "must be renter, owner, or both. defaults to renter if not specified"
}
returns the newly created user



axios.post("/api/users/login")
requires a user object = {
    username: "username here",
    password: "password here"
}
returns user and token.  You will want to save user_id to state.



axios.get("/api/equipment/")
returns array filled with all equipment on site.



axios.get("/api/equipment/owner/:id")
returns all equipment attached to a specific owner's ID



axios.get("/api/equipment/renter/:id")
returns all equipment attached to a specific renter's ID



// URL ID WILL BE OWNERS_ID
axios.post("/api/equipment/createEquipment/:id")
requires an equipment object = {
    equipment_name: "equipment name required",
    equipment_description: "description not required"
}
url id will be passed in as owner_id
renter_id will be set to null
returns string: 'successfully created new equipment'



//MAKE SURE URL ID IS EQUIPMENT ID, NOT USER ID
axios.delete("/api/equipment/deleteEquipment/:id")
url id will be passed in as equipment id
will delete said equipment
returns "equipment deleted successfully"




// URL ID WILL BE RENTERS_ID
axios.put("/api/equipment/rentEquipment/:id")
    requires an equipment object = {
        equipment_id = "equipment id here",
        equipment_name = "equipment name here",
        equipment_description = "equipment description here",
        owner_id = "owner id here",
        renter_id = "renter id here"
    }
if renter_id IS NOT null, put request will be rejected
if renter_id IS null,  url id will be passed in as new renter's id
if update is successful, will return string "update successful"



// URL ID WILL BE EQUIPMENT ID
axios.put("/api/equipment/returnEquipment/:id")
    requires an equipment object = {
        equipment_id = "equipment id here",
        equipment_name = "equipment name here",
        equipment_description = "equipment description here",
        owner_id = "owner id here",
        renter_id = "renter id here"
    }
renter_id will be turned to null and will return string "equipment returned"