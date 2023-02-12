import React from "react";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// NEED THIS:
import storage from "../../firebaseConfig";

export default function AddItem() {
  const [itemId, setItemId] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [costToBake, setCostToBake] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [batchQuantity, setBatchQuantity] = useState("");
  const [file, setFile] = useState("");

  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const resetFields = () => {
    setItem("");
    setPrice("");
    setCostToBake("");
    setIngredients("");
    setBatchQuantity("");
    setFile("");
  };

  useEffect(() => {
    fetch("/items", {})
      .then((response) => response.json())
      .then(async (data) => {
        setItems(data.items);
      });
  }, []);

  const uploadTaskPromise = async () => {
    return new Promise(function (resolve, reject) {
      const storage = getStorage();
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setImageUrl(downloadURL)
            resolve(downloadURL);
          });
        }
      );
    });
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const addItem = async (url) => {
    const itemObj = {
      itemName: item,
      price,
      image: url,
      costToBake,
      ingredients,
      batchQuantity,
    };

    const response = await fetch("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemObj),
    });
    const data = await response.json();

    setItems(data.items);
  };

  const addItemWrapper = async () => {
    const storageUrl = await uploadTaskPromise();

    await addItem(storageUrl);

    resetFields();
  };

  const deleteItem = async (id) => {
    const response = await fetch("/items/deleteItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();

    setItems(data.items);
  };

  const selectedItem = (itemObj) => {
    setIsEditing(true);

    setItemId(itemObj._id);
    setItem(itemObj.itemName);
    setPrice(itemObj.price);
    setCostToBake(itemObj.costToBake);
    setIngredients(itemObj.ingredients);
    setBatchQuantity(itemObj.batchQuantity);
    setFile("");
  };

  const editItem = async (url = null) => {
    const updatedItem = {
      itemName: item,
      price,
      costToBake,
      ingredients,
      batchQuantity,
    };

    if (url !== null) {
      updatedItem.image = url;
    }

    const response = await fetch("/items/editItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: itemId, updatedItem }),
    });
    const data = await response.json();

    setItems(data.items);
  };

  const editItemWrapper = async () => {
    if (file) {
      const storageUrl = await uploadTaskPromise();
      editItem(storageUrl);
    } else editItem();
    setIsEditing(false);
  };

  const itemDisplay = items?.map((item) => {
    return (
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.itemName}</div>
            </div>
          </div>
        </td>
        <td>
          {item.price}
          <br />
        </td>
        <td>{item.costToBake}</td>
        <td>{item.ingredients}</td>
        <td>{item.batchQuantity}</td>
        <th className="flex justify-around">
          <label
            htmlFor="my-modal-5"
            className="btn"
            onClick={() => {
              selectedItem(item);
            }}
          >
            edit
          </label>

          <button
            className="btn"
            onClick={() => {
              deleteItem(item._id);
            }}
          >
            delete
          </button>
        </th>
      </tr>
    );
  });

  return (
    <div>
      <div class="grid place-self-center">
        <div class="card card-compact w-full h-full mt-10 border-8 border-bone bg-bone shadow-xl">
          <div class="dropdown">
            <label
              tabindex="0"
              class="btn btn-ghost btn-circle avatar w-20 h-20"
            >
              <div class="w-13 rounded-full ">
                <img src="https://img.icons8.com/bubbles/200/home-page.png" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a href="/" class="justify-between">
                  Store front
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <table className="table w-full text-black">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Cost to Bake</th>
                  <th>ingredients</th>
                  <th>Batch Quantity</th>
                  <th>
                    <label
                      htmlFor="my-modal-5"
                      className="btn ml-10"
                      onClick={resetFields}
                    >
                      add item
                    </label>
                  </th>
                </tr>
              </thead>
              <tbody>{itemDisplay}</tbody>
            </table>
          </div>
          <input type="checkbox" id="my-modal-5" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Add new item</h3>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Item</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Item"
                    className="input input-bordered"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="price"
                    className="input input-bordered"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cost to bake</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Cost to bake"
                    className="input input-bordered"
                    value={costToBake}
                    onChange={(e) => setCostToBake(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Ingredients</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ingredients"
                    className="input input-bordered"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Batch Quantity</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Batch Quantity"
                    className="input input-bordered"
                    value={batchQuantity}
                    onChange={(e) => setBatchQuantity(e.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  {isEditing ? (
                    <label
                      className="btn btn-primary"
                      htmlFor="my-modal-5"
                      onClick={() => {
                        editItemWrapper();
                      }}
                    >
                      Edit
                    </label>
                  ) : (
                    <label
                      className="btn btn-primary"
                      htmlFor="my-modal-5"
                      onClick={addItemWrapper}
                    >
                      Add
                    </label>
                  )}
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                  onChange={handleChange}
                  accept="/image/*"
                />
              </div>
              <div className="modal-action">
                {isEditing ? (
                  <label
                    htmlFor="my-modal-5"
                    className="btn"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Close
                  </label>
                ) : (
                  <label htmlFor="my-modal-5" className="btn">
                    Close
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
