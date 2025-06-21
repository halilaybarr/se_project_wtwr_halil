const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject("Failed to fetch items");
  });
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject("Failed to delete item");
  });
}

function addItem(name, link, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weather }),
  }).then((response) => {
    return response.ok ? response.json() : Promise.reject("Failed to add item");
  });
}

export { getItems, deleteItems, addItem };
