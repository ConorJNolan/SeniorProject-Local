import React, { useState } from 'react';
import Swal from 'sweetalert2';

//Sends data to server
async function createUser(userInfo) {
    return fetch('/api/newUser', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userInfo) })
    .then(data => data.json())
  }

/**
 * Create New User Page 
 * @returns {React.Component} 
 */
function NewUser() {
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();

        //This statement needs further testing
        let response = await createUser({name, email, password, role});

        if(response.success) { 
            Swal.fire({title: "User Created Successfully!", icon: 'success'})
            console.log(response);
        } else {
            Swal.fire({title: "Could Not Create User", icon: 'error'})
        }
    }

    return (
        <div className="card m-2 mt-5 border-none">
        <div className="text-center">
        <h1>Create New User Account</h1>
        <hr style={{ width: '15rem', margin: "auto" }}/>
        </div>

        <div className="card-body text-center">
        <form onSubmit={handleSubmit}>
            <div className="mb-3 col-4 mx-auto mt-1">
                <label for="emplName" className="form-label">Employee Name:</label>
                <input type="text" id="emplName" name="emplName" placeholder="John Doe" className="form-control" required onChange={e => setName(e.target.value)}></input>
            </div>
            <div className="mb-3 col-4 mx-auto mt-1">
                <label for="emplEmail" className="form-label">Employee Email:</label>
                <input type="email" id="emplEmail" name="emplEmail" placeholder="123@email.com" className="form-control" required onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className="mb-3 col-4 mx-auto mt-1">
                <label for="accType" className="form-label">Account Type:</label>
                <select name="accType" className="form-control" onClick={e => setRole(e.target.value)}>
                    <option value="0" required>Select Account Type</option>
                    <option value="staff">Staff User</option>
                    <option value="admin">Administrator</option>
                </select>
            </div>
            <div className="mb-3 col-4 mx-auto mt-1">
                <label for="emplPass" className="form-label">Account Password:</label>
                <input type="text" id="emplPass" name="emplPass" placeholder="DoeJohn" className="form-control" required onChange={e => setPassword(e.target.value)}></input>
            </div>

            <button className="btn btn-outline-primary col-3 mt-5" type="submit">Create</button>
            <button className="btn btn-outline-primary col-3 mt-5" type="reset">Clear</button>
        </form>
        </div>

        </div>
    )
}

export default NewUser