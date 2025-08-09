const BASE_URL = "http://localhost:3001";

export function getItems() {
  return fetch(`${BASE_URL}/items`).then((res) => res.json());
}

export function addItem(data, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function deleteItems(id, token) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function updateUser({ name, avatar }, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => (res.ok ? res.json() : Promise.reject("Update failed")));
}

export function addCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.ok ? res.json() : Promise.reject("Like failed"));
}

export function removeCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.ok ? res.json() : Promise.reject("Dislike failed"));
}
