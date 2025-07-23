const baseUrl = "http://localhost:3000/events";

export const getAllPosts = async () => {
  const response = await fetch(baseUrl);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("Did not work to fetch data");
  }
}

export const getComments = async () => {
  const response = await fetch(baseUrl);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("Did not work to fetch data");
  }
}

// export const postEvent = async (title, date, venue) => {
//   const response = await fetch(baseUrl, {
//     method: "POST",
//     body: JSON.stringify({title, date, venue}),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })

//   if (response.ok) {
//     const data = await response.json();
//     return data;
//   } else {
//     console.log("Did not work to post data");
//   }
// }

