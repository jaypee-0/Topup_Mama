import React from "react";
import "../styles/User.scss";

export function Users () {
  interface users {
    id: number
    first_name: string
    email: string
    avatar: string
  }
  const [users, setUsers] = React.useState<[]>([]);
  const fetchUsers = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };
  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Hello ReqRes users!</h1>
      <div className="flex">
        {users.length &&
          users.map(({id, first_name, email, avatar}:users) => {
            return (
              <div key={id}>
                <p>
                  <strong>{first_name}</strong>
                </p>
                <p>{email}</p>
                <img key={avatar} src={avatar} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
