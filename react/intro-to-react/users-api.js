const UsersApiRoot = `http://localhost:3000`;

export const loadUsers = () =>
  fetch(`${UsersApiRoot}/users`).then((x) =>
    x.json(),
  );

export const loadUserById = (userId) =>
  fetch(`${UsersApiRoot}/users/${userId}`).then(
    (x) => x.json(),
  );

export const createUser = (user) =>
  fetch(`${UsersApiRoot}/users`, {
    method: "POST",
    body: JSON.stringify(user),
  }).then((x) => x.json());
