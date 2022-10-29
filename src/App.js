import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  function getJsonres() {
    fetch("https://dummyjson.com/products").then((result) => {
      result.json().then((res) => {
        setData(res.products);
        setTitle(res.products[0].title);
        setBrand(res.products[0].brand);
        setPrice(res.products[0].price);
      });
    });
  }
  useEffect(() => {
    getJsonres();
  }, []);

  function deletUser(id) {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getJsonres(id);
      });
    });

    // alert(id);
  }
  function updateUser(id) {
    console.log(data[id - 1]);

    let item = data[id - 1];

    setTitle(item.title);
    setBrand(item.brand);
    setPrice(item.price);
  }

  return (
    <>
      <div className="App">
        <h1>Pre Filled Form</h1>
        <div className="inline">
          <table border="1">
            <tbody>
              <tr>
                <th>id</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>

              {data.map((item, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.brand}</td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => deletUser(item.id)}>
                          Delete
                        </button>
                      </td>
                      <td>
                        <button onClick={() => updateUser(item.id)}>
                          Update
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <div>
            <input type="text" value={title} /> <br /> <br />
            <input type="text" value={brand} /> <br /> <br />
            <input type="text" value={price} /> <br /> <br />
            <button>Update</button>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}
